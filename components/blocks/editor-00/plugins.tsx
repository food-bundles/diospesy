"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { $generateHtmlFromNodes } from "@lexical/html"
import { $isHeadingNode, $createHeadingNode, HeadingTagType } from "@lexical/rich-text"
import { $isListNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, ListNode } from "@lexical/list"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $isCodeNode, $createCodeNode } from "@lexical/code"
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getRoot,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  ElementFormatType,
  $isElementNode,
} from "lexical"
import { ContentEditable } from "@/components/editor/editor-ui/content-editable"

// ── Icons (inline SVG to avoid extra deps) ──────────────────────────────────
const Icon = ({ d, size = 14 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const Divider = () => <div className="w-px h-5 bg-gray-200 mx-0.5 flex-shrink-0" />

// ── Toolbar button ────────────────────────────────────────────────────────────
function Btn({
  onClick,
  active,
  title,
  children,
  disabled,
}: {
  onClick: () => void
  active?: boolean
  title?: string
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      className={`flex items-center justify-center w-7 h-7 rounded text-gray-700 transition-colors flex-shrink-0
        ${active ? "bg-gray-200 text-gray-900" : "hover:bg-gray-100"}
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  )
}

// ── Block type label map ──────────────────────────────────────────────────────
const BLOCK_TYPES: Record<string, string> = {
  paragraph: "Paragraph",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  bullet: "Bullet List",
  number: "Numbered List",
  quote: "Quote",
  code: "Code Block",
}

const FONT_FAMILIES = ["Arial", "Georgia", "Times New Roman", "Courier New", "Verdana", "Trebuchet MS"]
const FONT_SIZES = [10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48]

// ── Main Toolbar ──────────────────────────────────────────────────────────────
function Toolbar() {
  const [editor] = useLexicalComposerContext()

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [blockType, setBlockType] = useState("paragraph")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrike, setIsStrike] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isLink, setIsLink] = useState(false)
  const [isCode, setIsCode] = useState(false)
  const [elementFormat, setElementFormat] = useState<ElementFormatType>("left")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const [showInsertMenu, setShowInsertMenu] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const blockMenuRef = useRef<HTMLDivElement>(null)
  const insertMenuRef = useRef<HTMLDivElement>(null)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if (!$isRangeSelection(selection)) return

    setIsBold(selection.hasFormat("bold"))
    setIsItalic(selection.hasFormat("italic"))
    setIsUnderline(selection.hasFormat("underline"))
    setIsStrike(selection.hasFormat("strikethrough"))
    setIsSuperscript(selection.hasFormat("superscript"))
    setIsSubscript(selection.hasFormat("subscript"))
    setIsCode(selection.hasFormat("code"))

    const node = selection.anchor.getNode()
    const parent = node.getParent()

    if ($isLinkNode(parent) || $isLinkNode(node)) setIsLink(true)
    else setIsLink(false)

    const anchorNode = selection.anchor.getNode()
    let element =
      anchorNode.getKey() === "root"
        ? anchorNode
        : anchorNode.getTopLevelElementOrThrow()

    const elementKey = element.getKey()
    const elementDOM = editor.getElementByKey(elementKey)

    if (elementDOM) {
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
        const type = parentList ? parentList.getListType() : element.getListType()
        setBlockType(type === "bullet" ? "bullet" : "number")
      } else {
        const type = $isHeadingNode(element) ? element.getTag() : element.getType()
        setBlockType(type in BLOCK_TYPES ? type : "paragraph")
      }
    }

    if ($isElementNode(element)) {
      setElementFormat(element.getFormatType() || "left")
    }

    // font style from inline styles
    const style = selection.style ?? ""
    const ffMatch = style.match(/font-family:\s*([^;]+)/)
    if (ffMatch) setFontFamily(ffMatch[1].trim().replace(/['"]/g, ""))
    const fsMatch = style.match(/font-size:\s*(\d+)px/)
    if (fsMatch) setFontSize(parseInt(fsMatch[1]))
    const colorMatch = style.match(/color:\s*(#[0-9a-fA-F]{3,6}|rgb[^;]+)/)
    if (colorMatch) setTextColor(colorMatch[1])
    const bgMatch = style.match(/background-color:\s*(#[0-9a-fA-F]{3,6}|rgb[^;]+)/)
    if (bgMatch) setBgColor(bgMatch[1])
  }, [editor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => updateToolbar())
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => { updateToolbar(); return false },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        UNDO_COMMAND,
        () => { setCanUndo(false); return false },
        COMMAND_PRIORITY_CRITICAL
      ),
    )
  }, [editor, updateToolbar])

  // track undo/redo availability via history
  useEffect(() => {
    return editor.registerUpdateListener(() => {
      // simple heuristic — always allow after first edit
      setCanUndo(true)
    })
  }, [editor])

  // close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (blockMenuRef.current && !blockMenuRef.current.contains(e.target as Node)) setShowBlockMenu(false)
      if (insertMenuRef.current && !insertMenuRef.current.contains(e.target as Node)) setShowInsertMenu(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // ── Block type change ────────────────────────────────────────────────────
  const setBlock = (type: string) => {
    setShowBlockMenu(false)
    editor.update(() => {
      const selection = $getSelection()
      if (!$isRangeSelection(selection)) return
      if (type === "paragraph") {
        selection.getNodes().forEach((n) => {
          const top = n.getTopLevelElementOrThrow()
          if ($isHeadingNode(top) || $isCodeNode(top)) {
            top.replace($createParagraphNode())
          }
        })
      } else if (["h1","h2","h3","h4"].includes(type)) {
        selection.getNodes().forEach((n) => {
          const top = n.getTopLevelElementOrThrow()
          top.replace($createHeadingNode(type as HeadingTagType))
        })
      } else if (type === "bullet") {
        editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
      } else if (type === "number") {
        editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
      } else if (type === "code") {
        selection.getNodes().forEach((n) => {
          const top = n.getTopLevelElementOrThrow()
          top.replace($createCodeNode())
        })
      }
    })
  }

  // ── Font family ──────────────────────────────────────────────────────────
  const applyFontFamily = (ff: string) => {
    setFontFamily(ff)
    editor.update(() => {
      const sel = $getSelection()
      if ($isRangeSelection(sel)) sel.setStyle(`font-family: '${ff}', sans-serif;`)
    })
  }

  // ── Font size ────────────────────────────────────────────────────────────
  const applyFontSize = (size: number) => {
    const clamped = Math.max(8, Math.min(96, size))
    setFontSize(clamped)
    editor.update(() => {
      const sel = $getSelection()
      if ($isRangeSelection(sel)) sel.setStyle(`font-size: ${clamped}px;`)
    })
  }

  // ── Text color ───────────────────────────────────────────────────────────
  const applyColor = (color: string) => {
    setTextColor(color)
    editor.update(() => {
      const sel = $getSelection()
      if ($isRangeSelection(sel)) sel.setStyle(`color: ${color};`)
    })
  }

  // ── Highlight color ──────────────────────────────────────────────────────
  const applyBgColor = (color: string) => {
    setBgColor(color)
    editor.update(() => {
      const sel = $getSelection()
      if ($isRangeSelection(sel)) sel.setStyle(`background-color: ${color};`)
    })
  }

  // ── Clear formatting ─────────────────────────────────────────────────────
  const clearFormatting = () => {
    editor.update(() => {
      const sel = $getSelection()
      if (!$isRangeSelection(sel)) return
      sel.getNodes().forEach((n) => {
        if ("setFormat" in n) (n as any).setFormat(0)
        if ("setStyle" in n) (n as any).setStyle("")
      })
    })
  }

  // ── Link ─────────────────────────────────────────────────────────────────
  const insertLink = () => {
    if (!isLink) {
      setShowLinkInput(true)
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }

  const confirmLink = () => {
    if (linkUrl) editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl)
    setShowLinkInput(false)
    setLinkUrl("")
  }

  // ── Insert horizontal rule ───────────────────────────────────────────────
  const insertHR = () => {
    setShowInsertMenu(false)
    editor.update(() => {
      const sel = $getSelection()
      if (!$isRangeSelection(sel)) return
      const p = $createParagraphNode()
      sel.anchor.getNode().getTopLevelElementOrThrow().insertAfter(p)
    })
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-2 py-1.5 flex flex-wrap items-center gap-0.5">

      {/* Undo / Redo */}
      <Btn title="Undo" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} disabled={!canUndo}>
        <Icon d="M3 7v6h6M3.51 15a9 9 0 1 0 .49-4.5" />
      </Btn>
      <Btn title="Redo" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        <Icon d="M21 7v6h-6M20.49 15a9 9 0 1 1-.49-4.5" />
      </Btn>

      <Divider />

      {/* Block type dropdown */}
      <div className="relative" ref={blockMenuRef}>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); setShowBlockMenu(v => !v) }}
          className="flex items-center gap-1 h-7 px-2 rounded text-xs text-gray-700 hover:bg-gray-100 border border-gray-200 bg-white min-w-[110px] justify-between"
        >
          <span>{BLOCK_TYPES[blockType] ?? "Paragraph"}</span>
          <Icon d="M6 9l6 6 6-6" size={12} />
        </button>
        {showBlockMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 min-w-[150px]">
            {Object.entries(BLOCK_TYPES).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); setBlock(k) }}
                className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 ${blockType === k ? "font-semibold text-gray-900" : "text-gray-700"}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <Divider />

      {/* Font family */}
      <select
        value={fontFamily}
        onChange={(e) => applyFontFamily(e.target.value)}
        className="h-7 px-1.5 rounded text-xs text-gray-700 border border-gray-200 bg-white hover:bg-gray-100 focus:outline-none max-w-[110px]"
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>
        ))}
      </select>

      {/* Font size */}
      <div className="flex items-center border border-gray-200 rounded bg-white overflow-hidden h-7">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); applyFontSize(fontSize - 1) }}
          className="px-1.5 text-gray-600 hover:bg-gray-100 h-full text-sm leading-none"
        >−</button>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => applyFontSize(parseInt(e.target.value) || 16)}
          className="w-9 text-center text-xs focus:outline-none border-x border-gray-200"
        />
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); applyFontSize(fontSize + 1) }}
          className="px-1.5 text-gray-600 hover:bg-gray-100 h-full text-sm leading-none"
        >+</button>
      </div>

      <Divider />

      {/* Bold / Italic / Underline / Strike */}
      <Btn title="Bold" active={isBold} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        <span className="font-bold text-xs">B</span>
      </Btn>
      <Btn title="Italic" active={isItalic} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        <span className="italic text-xs font-serif">I</span>
      </Btn>
      <Btn title="Underline" active={isUnderline} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        <span className="underline text-xs">U</span>
      </Btn>
      <Btn title="Strikethrough" active={isStrike} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}>
        <span className="line-through text-xs">S</span>
      </Btn>

      <Divider />

      {/* Superscript / Subscript */}
      <Btn title="Superscript" active={isSuperscript} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")}>
        <span className="text-xs">x<sup>2</sup></span>
      </Btn>
      <Btn title="Subscript" active={isSubscript} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")}>
        <span className="text-xs">x<sub>2</sub></span>
      </Btn>

      <Divider />

      {/* Link */}
      <Btn title="Insert link" active={isLink} onClick={insertLink}>
        <Icon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </Btn>

      {/* Clear formatting */}
      <Btn title="Clear formatting" onClick={clearFormatting}>
        <Icon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5zM15 5l3 3" />
      </Btn>

      <Divider />

      {/* Text color */}
      <label title="Text color" className="relative flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100 cursor-pointer">
        <span className="text-xs font-bold" style={{ color: textColor, textShadow: "0 0 1px #0003" }}>A</span>
        <div className="absolute bottom-0.5 left-1 right-1 h-1 rounded-sm" style={{ backgroundColor: textColor }} />
        <input type="color" value={textColor} onChange={(e) => applyColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
      </label>

      {/* Highlight color */}
      <label title="Highlight color" className="relative flex items-center justify-center w-7 h-7 rounded hover:bg-gray-100 cursor-pointer">
        <Icon d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        <div className="absolute bottom-0.5 left-1 right-1 h-1 rounded-sm" style={{ backgroundColor: bgColor }} />
        <input type="color" value={bgColor} onChange={(e) => applyBgColor(e.target.value)} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
      </label>

      <Divider />

      {/* Alignment */}
      <Btn title="Align left" active={elementFormat === "left"} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}>
        <Icon d="M3 6h18M3 12h12M3 18h15" />
      </Btn>
      <Btn title="Align center" active={elementFormat === "center"} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}>
        <Icon d="M3 6h18M6 12h12M4 18h16" />
      </Btn>
      <Btn title="Align right" active={elementFormat === "right"} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}>
        <Icon d="M3 6h18M9 12h12M6 18h15" />
      </Btn>
      <Btn title="Justify" active={elementFormat === "justify"} onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}>
        <Icon d="M3 6h18M3 12h18M3 18h18" />
      </Btn>

      <Divider />

      {/* Inline code */}
      <Btn title="Inline code" active={isCode} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}>
        <Icon d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </Btn>

      {/* Bullet list */}
      <Btn title="Bullet list" active={blockType === "bullet"} onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}>
        <Icon d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </Btn>

      <Divider />

      {/* Insert menu */}
      <div className="relative" ref={insertMenuRef}>
        <button
          type="button"
          title="Insert"
          onMouseDown={(e) => { e.preventDefault(); setShowInsertMenu(v => !v) }}
          className="flex items-center gap-0.5 h-7 px-2 rounded text-xs text-gray-700 hover:bg-gray-100 border border-gray-200 bg-white"
        >
          <Icon d="M12 5v14M5 12h14" size={13} />
          <Icon d="M6 9l6 6 6-6" size={11} />
        </button>
        {showInsertMenu && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 min-w-[160px]">
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setBlock("bullet") }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700">Bullet list</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setBlock("number") }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700">Numbered list</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setBlock("code") }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700">Code block</button>
            <button type="button" onMouseDown={(e) => { e.preventDefault(); setBlock("quote") }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700">Quote</button>
            <div className="border-t border-gray-100 my-1" />
            <button type="button" onMouseDown={(e) => { e.preventDefault(); insertHR() }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 text-gray-700">Divider line</button>
          </div>
        )}
      </div>

      {/* Link input bar */}
      {showLinkInput && (
        <div className="w-full flex items-center gap-2 pt-1.5 border-t border-gray-200 mt-0.5">
          <input
            autoFocus
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") confirmLink(); if (e.key === "Escape") setShowLinkInput(false) }}
            placeholder="https://…"
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button type="button" onMouseDown={(e) => { e.preventDefault(); confirmLink() }} className="text-xs px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700">Insert</button>
          <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowLinkInput(false) }} className="text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 text-gray-600">Cancel</button>
        </div>
      )}
    </div>
  )
}

// ── Plugins export ────────────────────────────────────────────────────────────
export function Plugins() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

  const onRef = (_el: HTMLDivElement) => {
    if (_el !== null) setFloatingAnchorElem(_el)
  }

  return (
    <div className="relative">
      <Toolbar />
      <HistoryPlugin />
      <ListPlugin />
      <LinkPlugin />
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <div>
              <div ref={onRef}>
                <ContentEditable placeholder="Write your message…" className="min-h-48 px-4 py-3 text-sm focus:outline-none" />
              </div>
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </div>
  )
}
