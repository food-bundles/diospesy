import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListNode, ListItemNode } from "@lexical/list"
import { LinkNode } from "@lexical/link"
import { CodeNode, CodeHighlightNode } from "@lexical/code"
import {
  Klass,
  LexicalNode,
  LexicalNodeReplacement,
  ParagraphNode,
  TextNode,
} from "lexical"

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> =
  [HeadingNode, QuoteNode, ParagraphNode, TextNode, ListNode, ListItemNode, LinkNode, CodeNode, CodeHighlightNode]
