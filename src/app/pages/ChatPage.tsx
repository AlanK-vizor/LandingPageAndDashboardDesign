import { useEffect, useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Hash } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { SupabaseSetupNotice } from "../components/SupabaseSetupNotice";
import { CodeBlock } from "../components/CodeBlock";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface ChatMessage {
  id: string;
  body: string;
  is_code: boolean;
  author_username: string;
  author_id: string;
  created_at: string;
  channel: string;
}

const CHANNELS = [
  { id: "general", desc: "General discussion" },
  { id: "python-help", desc: "Python coding help" },
  { id: "hardware-help", desc: "Hardware & wiring" },
  { id: "showcase", desc: "Show your builds" },
];

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeChannel, setActiveChannel] = useState("general");
  const [text, setText] = useState("");
  const [asCode, setAsCode] = useState(false);
  const [sending, setSending] = useState(false);
  const { user, profile, configured } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!configured) return;

    setMessages([]);

    supabase
      .from("chat_messages")
      .select("*")
      .eq("channel", activeChannel)
      .order("created_at", { ascending: true })
      .limit(100)
      .then(({ data }) => setMessages(data ?? []));

    const ch = supabase
      .channel(`chat_${activeChannel}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `channel=eq.${activeChannel}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, [configured, activeChannel]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!user || !text.trim()) return;
    setSending(true);

    await supabase.from("chat_messages").insert({
      body: text,
      is_code: asCode,
      author_id: user.id,
      author_username: profile?.username ?? user.email,
      channel: activeChannel,
    });

    setText("");
    setAsCode(false);
    setSending(false);
  }

  const activeMeta = CHANNELS.find((c) => c.id === activeChannel)!;

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      <Navigation />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Channel sidebar */}
        <aside className="w-48 shrink-0 border-r border-gray-800 bg-gray-900/20 flex flex-col pt-6">
          <p className="px-4 pb-3 text-xs font-bold tracking-widest text-gray-600 uppercase">
            Channels
          </p>
          <nav className="flex-1 overflow-y-auto">
            {CHANNELS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id)}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 text-sm transition-colors ${
                  activeChannel === ch.id
                    ? "bg-gray-800 text-white font-semibold"
                    : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
                }`}
              >
                <Hash size={13} className="shrink-0 opacity-50" />
                {ch.id}
              </button>
            ))}
          </nav>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Channel header */}
          <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-2 shrink-0">
            <Hash size={15} className="text-gray-500" />
            <span className="text-white font-semibold">{activeMeta.id}</span>
            <span className="text-gray-600 text-sm hidden sm:inline">— {activeMeta.desc}</span>
          </div>

          {!configured ? (
            <div className="flex-1 p-6 overflow-y-auto">
              <SupabaseSetupNotice />
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {messages.length === 0 && (
                  <p className="text-gray-600 text-sm text-center mt-16">
                    No messages yet in #{activeMeta.id} — say something
                  </p>
                )}
                <div className="space-y-1">
                  {messages.map((msg) => (
                    <div key={msg.id} className="py-2">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-yellow-400">
                          {msg.author_username}
                        </span>
                        <span className="text-xs text-gray-700 font-mono">
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      {msg.is_code ? (
                        <CodeBlock code={msg.body} language="python" />
                      ) : (
                        <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.body}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div ref={scrollRef} />
              </div>

              {/* Input */}
              {user ? (
                <form
                  onSubmit={handleSend}
                  className="border-t border-gray-800 px-6 py-4 space-y-2 shrink-0"
                >
                  <textarea
                    rows={asCode ? 4 : 2}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey && !asCode) {
                        e.preventDefault();
                        handleSend(e as unknown as FormEvent);
                      }
                    }}
                    placeholder={
                      asCode ? "Paste Python code..." : `Message #${activeMeta.id}`
                    }
                    className={`w-full border border-gray-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/40 resize-none ${
                      asCode
                        ? "bg-gray-900 text-gray-300 font-mono"
                        : "bg-gray-900/50 text-white"
                    }`}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={asCode}
                        onChange={(e) => setAsCode(e.target.checked)}
                        className="rounded border-gray-700 accent-yellow-400"
                      />
                      Send as Python code
                    </label>
                    <button
                      type="submit"
                      disabled={sending || !text.trim()}
                      className="bg-yellow-400 text-gray-950 text-sm font-bold px-5 py-2 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-40"
                    >
                      Send
                    </button>
                  </div>
                </form>
              ) : (
                <div className="border-t border-gray-800 px-6 py-4 text-center shrink-0">
                  <p className="text-gray-600 text-sm">
                    <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
                      Log in
                    </Link>{" "}
                    to join the conversation.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
