"use client";

import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Editor } from "@/components/blocks/editor-00/editor";
import { SerializedEditorState, EditorState, LexicalEditor } from "lexical";
import { $getRoot } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

interface RSVP {
  id: string;
  createdAt: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  attending: string;
  events: string[];
  has_plusone: string;
  p1_first: string | null;
  p1_last: string | null;
  p1_rel: string | null;
  p1_phone: string | null;
  p1_diet: string | null;
  dep_city: string | null;
  arr_date: string | null;
  arr_time: string | null;
  accom: string | null;
  visa: string | null;
  nationality: string | null;
  passport_exp: string | null;
  dietary: string[];
  message: string | null;
}

const ATTENDING_COLORS: Record<string, string> = {
  yes: "bg-emerald-100 text-emerald-800",
  no: "bg-red-100 text-red-700",
  maybe: "bg-amber-100 text-amber-800",
};

function val(v: string | null | undefined) {
  return v || "—";
}

const EVENT_LABELS: Record<string, string> = {
  yacht: "Cultural Evening on Yacht",
  church: "Catholic Ceremony",
  reception: "Wedding Reception",
  afterparty: "After Party",
};

const ACCOM_LABELS: Record<string, string> = {
  sunrise: "Sunrise Alex Avenue Hotel",
  other: "Other hotel nearby",
  no: "Own arrangements",
};

const VISA_LABELS: Record<string, string> = {
  yes: "Needs visa assistance",
  evisa: "e-Visa (self, wants guidance)",
  no: "No visa needed",
  unsure: "Unsure — needs info",
};

const DIETARY_LABELS: Record<string, string> = {
  vegan: "Vegan",
  halal: "Halal",
  gluten_free: "Gluten-free",
  none: "No restrictions",
};

function fmtDate(d: string | null) {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtList(arr: string[], map: Record<string, string>) {
  if (!arr.length) return "—";
  return arr.map((v) => map[v] ?? v).join(", ");
}

export default function AdminRSVPs() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // expanded row
  const [expanded, setExpanded] = useState<string | null>(null);

  // selection
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // reply modal
  const [replyTarget, setReplyTarget] = useState<"one" | "selected" | "all" | null>(null);
  const [replyRsvpId, setReplyRsvpId] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState<SerializedEditorState | null>(null);
  const editorHtmlRef = useRef("");
  const editorTextRef = useRef("");
  const lexicalEditorRef = useRef<LexicalEditor | null>(null);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  // filter
  const [filter, setFilter] = useState<"all" | "yes" | "no" | "maybe">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/rsvps")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setRsvps(data);
      })
      .catch(() => setError("Failed to load RSVPs."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = rsvps.filter((r) => {
    const matchFilter = filter === "all" || r.attending === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.first_name.toLowerCase().includes(q) ||
      r.last_name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((r) => r.id)));
  };

  const openReply = (mode: "one" | "selected" | "all", id?: string) => {
    setReplyTarget(mode);
    setReplyRsvpId(id ?? null);
    setSubject("");
    setEditorState(null);
    editorHtmlRef.current = "";
    editorTextRef.current = "";
    lexicalEditorRef.current = null;
    setSendResult(null);
  };

  const closeReply = () => {
    setReplyTarget(null);
    setReplyRsvpId(null);
    setSendResult(null);
  };

  const getRecipients = (): string[] => {
    if (replyTarget === "one" && replyRsvpId) {
      const r = rsvps.find((x) => x.id === replyRsvpId);
      return r ? [r.email] : [];
    }
    if (replyTarget === "selected") {
      return rsvps.filter((r) => selected.has(r.id)).map((r) => r.email);
    }
    return rsvps.map((r) => r.email);
  };

  const sendReply = async () => {
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: getRecipients(),
          subject,
          html: editorHtmlRef.current,
          text: editorTextRef.current,
        }),
      });
      const data = await res.json();
      setSendResult(data.error ? `Error: ${data.error}` : `Sent to ${getRecipients().length} recipient(s).`);
    } catch {
      setSendResult("Network error.");
    } finally {
      setSending(false);
    }
  };

  const counts = {
    all: rsvps.length,
    yes: rsvps.filter((r) => r.attending === "yes").length,
    no: rsvps.filter((r) => r.attending === "no").length,
    maybe: rsvps.filter((r) => r.attending === "maybe").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            RSVP Submissions
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Dioscore &amp; Specy · 14 June 2026
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-xs px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-600"
        >
          Sign out
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {(["all", "yes", "no", "maybe"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-lg border px-4 py-3 text-left transition-all ${
                filter === k
                  ? "border-gray-900 bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-400"
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">
                {counts[k]}
              </div>
              <div className="text-xs text-gray-500 capitalize mt-0.5">
                {k === "all" ? "Total" : k}
              </div>
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <div className="flex-1" />
          {selected.size > 0 && (
            <button
              onClick={() => openReply("selected")}
              className="text-sm px-4 py-2 rounded-md bg-w-accent text-white hover:bg-w-accent/80"
            >
              Reply to selected ({selected.size})
            </button>
          )}
          <button
            onClick={() => openReply("all")}
            className="text-sm px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700"
          >
            Reply to all ({rsvps.length})
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-sm text-gray-500 py-10 text-center">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600 py-10 text-center">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-500 py-10 text-center">
            No submissions found.
          </p>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selected.size === filtered.length && filtered.length > 0
                      }
                      onChange={toggleAll}
                      className="accent-gray-900"
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Attending
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Submitted
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((r) => (
                  <>
                    <tr
                      key={r.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        setExpanded(expanded === r.id ? null : r.id)
                      }
                    >
                      <td
                        className="px-4 py-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(r.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected.has(r.id)}
                          onChange={() => toggleSelect(r.id)}
                          className="accent-gray-900"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {r.first_name} {r.last_name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.email}</td>
                      <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                            ATTENDING_COLORS[r.attending] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {r.attending}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(r.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td
                        className="px-4 py-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => openReply("one", r.id)}
                          className="text-xs px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 text-gray-700"
                        >
                          Reply
                        </button>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expanded === r.id && (
                      <tr key={r.id + "-detail"} className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-5">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-sm">
                            <Detail
                              label="Events"
                              value={fmtList(r.events, EVENT_LABELS)}
                            />
                            <Detail label="Plus one" value={val(r.has_plusone)} />
                            {r.has_plusone === "yes" && (
                              <>
                                <Detail
                                  label="Guest name"
                                  value={`${val(r.p1_first)} ${val(r.p1_last)}`}
                                />
                                <Detail
                                  label="Guest relation"
                                  value={val(r.p1_rel)}
                                />
                                <Detail
                                  label="Guest phone"
                                  value={val(r.p1_phone)}
                                />
                                <Detail
                                  label="Guest dietary"
                                  value={val(r.p1_diet)}
                                />
                              </>
                            )}
                            <Detail label="From" value={val(r.dep_city)} />
                            <Detail
                              label="Arrival date"
                              value={fmtDate(r.arr_date)}
                            />
                            <Detail
                              label="Arrival time"
                              value={val(r.arr_time)}
                            />
                            <Detail
                              label="Accommodation"
                              value={r.accom ? (ACCOM_LABELS[r.accom] ?? r.accom) : "—"}
                            />
                            <Detail label="Visa" value={r.visa ? (VISA_LABELS[r.visa] ?? r.visa) : "—"} />
                            <Detail
                              label="Nationality"
                              value={val(r.nationality)}
                            />
                            <Detail
                              label="Passport expiry"
                              value={fmtDate(r.passport_exp)}
                            />
                            <Detail
                              label="Dietary"
                              value={fmtList(r.dietary, DIETARY_LABELS)}
                            />
                            {r.message && (
                              <div className="col-span-full">
                                <Detail label="Message" value={r.message} />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {replyTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-base">
                {replyTarget === "one"
                  ? `Reply to ${rsvps.find((r) => r.id === replyRsvpId)?.first_name ?? ""}`
                  : replyTarget === "selected"
                    ? `Reply to ${selected.size} selected`
                    : `Reply to all (${rsvps.length})`}
              </h2>
              <button
                onClick={closeReply}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="text-xs text-gray-500 bg-gray-50 rounded-md px-3 py-2 break-all">
              To: {getRecipients().join(", ")}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Subject…"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Message
              </label>
              <Editor
                key={replyTarget + replyRsvpId}
                editorSerializedState={editorState ?? undefined}
                editorRef={lexicalEditorRef}
                onSerializedChange={(state) => {
                  setEditorState(state);
                }}
                onChange={(es: EditorState) => {
                  es.read(() => {
                    editorTextRef.current = $getRoot().getTextContent();
                    if (lexicalEditorRef.current) {
                      editorHtmlRef.current = $generateHtmlFromNodes(
                        lexicalEditorRef.current,
                      );
                    }
                  });
                }}
              />
            </div>

            {sendResult && (
              <p
                className={`text-sm px-3 py-2 rounded-md ${
                  sendResult.startsWith("Error")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                {sendResult}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={closeReply}
                className="text-sm px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                disabled={sending || !subject || !editorTextRef.current}
                className="text-sm px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
      <p className="text-gray-800 mt-0.5">{value}</p>
    </div>
  );
}
