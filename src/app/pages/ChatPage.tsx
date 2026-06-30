import { useEffect, useRef, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
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
}

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [asCode, setAsCode] = useState(false);
  const [sending, setSending] = useState(false);
  const { user, profile, configured } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!configured) return;

    supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(100)
      .then(({ data }) => setMessages(data ?? []));

    const channel = supabase
      .channel("chat_messages_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [configured]);

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
    });

    setText("");
    setAsCode(false);
    setSending(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-36 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col">
        <div className="mb-6">
          <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-3">Community</div>
          <h1 className="text-2xl font-bold text-white">Live Chat</h1>
          <p className="text-gray-500 text-sm mt-1">Ask quick questions, share snippets, get instant help.</p>
        </div>

        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <>
            <div className="flex-1 border border-gray-800 rounded-md bg-gray-900/20 overflow-y-auto mb-4 min-h-[50vh] max-h-[55vh]">
              {messages.length === 0 && (
                <p className="text-gray-600 text-sm text-center mt-12">
                  No messages yet — say hello
                </p>
              )}
              <div className="divide-y divide-gray-800/50">
                {messages.map((msg) => (
                  <div key={msg.id} className="px-5 py-3">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-yellow-400">{msg.author_username}</span>
                      <span className="text-xs text-gray-700 font-mono">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {msg.is_code ? (
                      <CodeBlock code={msg.body} />
                    ) : (
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{msg.body}</p>
                    )}
                  </div>
                ))}
              </div>
              <div ref={scrollRef} />
            </div>

            {user ? (
              <form onSubmit={handleSend} className="space-y-2 pb-10">
                <textarea
                  rows={asCode ? 5 : 2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !asCode) {
                      e.preventDefault();
                      handleSend(e as unknown as FormEvent);
                    }
                  }}
                  placeholder={asCode ? "Paste code here..." : "Type a message... (Enter to send)"}
                  className={`w-full border border-gray-800 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-yellow-400/40 resize-none ${
                    asCode
                      ? "bg-gray-900 text-gray-300 font-mono"
                      : "bg-gray-900/50 text-white"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={asCode}
                      onChange={(e) => setAsCode(e.target.checked)}
                      className="rounded border-gray-700 accent-yellow-400"
                    />
                    Send as code
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
              <p className="text-gray-600 text-sm text-center pb-10">
                <Link to="/login" className="text-yellow-400 hover:text-yellow-300">
                  Log in
                </Link>{" "}
                to join the conversation.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
