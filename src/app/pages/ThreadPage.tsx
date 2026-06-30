import { useEffect, useState, FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { CodeBlock } from "../components/CodeBlock";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface ThreadData {
  id: string;
  title: string;
  body: string;
  code_snippet: string | null;
  code_language: string | null;
  author_username: string;
  created_at: string;
}

interface Reply {
  id: string;
  body: string;
  code_snippet: string | null;
  code_language: string | null;
  author_username: string;
  created_at: string;
}

export function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = useState<ThreadData | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, profile } = useAuth();

  async function loadThread() {
    const { data: threadData } = await supabase
      .from("threads")
      .select("*")
      .eq("id", threadId)
      .single();
    setThread(threadData);

    const { data: replyData } = await supabase
      .from("replies")
      .select("*")
      .eq("thread_id", threadId)
      .order("created_at", { ascending: true });
    setReplies(replyData ?? []);
  }

  useEffect(() => {
    loadThread();
  }, [threadId]);

  async function handleReply(e: FormEvent) {
    e.preventDefault();
    if (!user || !replyBody.trim()) return;
    setSubmitting(true);

    await supabase.from("replies").insert({
      thread_id: threadId,
      body: replyBody,
      author_id: user.id,
      author_username: profile?.username ?? user.email,
    });

    setReplyBody("");
    setSubmitting(false);
    loadThread();
  }

  if (!thread) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navigation />
        <div className="pt-32 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <Link to="/forum" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
          ← Back to Q&A
        </Link>

        <div className="mt-6 bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6">
          <h1 className="text-2xl font-semibold text-white mb-3">{thread.title}</h1>
          <p className="text-gray-300 mb-4 whitespace-pre-wrap">{thread.body}</p>
          {thread.code_snippet && (
            <div className="mb-4">
              <CodeBlock code={thread.code_snippet} language={thread.code_language ?? undefined} />
            </div>
          )}
          <div className="text-xs text-gray-500">
            Asked by {thread.author_username} · {new Date(thread.created_at).toLocaleString()}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-white mt-10 mb-4">
          {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
        </h2>

        <div className="space-y-4 mb-8">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-5">
              <p className="text-gray-300 whitespace-pre-wrap mb-2">{reply.body}</p>
              {reply.code_snippet && (
                <div className="mb-2">
                  <CodeBlock code={reply.code_snippet} language={reply.code_language ?? undefined} />
                </div>
              )}
              <div className="text-xs text-gray-500">
                {reply.author_username} · {new Date(reply.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleReply} className="space-y-3">
            <textarea
              rows={4}
              value={replyBody}
              onChange={(e) => setReplyBody(e.target.value)}
              placeholder="Write a reply..."
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
            />
            <button
              type="submit"
              disabled={submitting || !replyBody.trim()}
              className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {submitting ? "Posting..." : "Post Reply"}
            </button>
          </form>
        ) : (
          <p className="text-gray-500 text-sm">
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300">
              Log in
            </Link>{" "}
            to reply.
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
