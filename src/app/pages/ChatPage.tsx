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

      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col">
        <h1 className="text-2xl font-semibold text-white mt-4 mb-1">Live Chat</h1>
        <p className="text-gray-500 text-sm mb-6">Ask quick questions, share snippets, get instant help.</p>

        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <>
            <div className="flex-1 bg-gray-900/30 border border-gray-800/50 rounded-2xl p-4 sm:p-6 overflow-y-auto mb-4 min-h-[50vh] max-h-[60vh] space-y-4">
              {messages.length === 0 && (
                <p className="text-gray-500 text-sm text-center mt-10">
                  No messages yet — say hello 👋
                </p>
              )}
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-sm font-medium text-cyan-400">{msg.author_username}</span>
                    <span className="text-xs text-gray-600">
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
                  className={`w-full border border-gray-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 resize-none ${
                    asCode ? "bg-black/40 text-cyan-300 font-mono" : "bg-gray-900/50 text-white"
                  }`}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={asCode}
                      onChange={(e) => setAsCode(e.target.checked)}
                      className="rounded border-gray-700"
                    />
                    Send as code
                  </label>
                  <button
                    type="submit"
                    disabled={sending || !text.trim()}
                    className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-500 text-sm text-center pb-10">
                <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
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
