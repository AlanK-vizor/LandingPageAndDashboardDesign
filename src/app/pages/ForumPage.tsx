import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Plus, Code2 } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import { SupabaseSetupNotice } from "../components/SupabaseSetupNotice";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../context/AuthContext";

interface Thread {
  id: string;
  title: string;
  body: string;
  has_code: boolean;
  created_at: string;
  author_username: string;
  reply_count: number;
}

export function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const { configured, user } = useAuth();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    supabase
      .from("threads_with_meta")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setThreads(data as Thread[]);
        setLoading(false);
      });
  }, [configured]);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">Q&A</h1>
            <p className="text-gray-400">Ask questions, share code, help each other out.</p>
          </div>
          {user && (
            <Link
              to="/forum/new"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Plus size={16} /> New Question
            </Link>
          )}
        </div>

        {!configured ? (
          <SupabaseSetupNotice />
        ) : loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : threads.length === 0 ? (
          <div className="text-center bg-gray-900/50 border border-gray-800/50 rounded-2xl p-12">
            <p className="text-gray-400 mb-4">No questions yet — be the first to post one.</p>
            {user ? (
              <Link
                to="/forum/new"
                className="inline-block bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
              >
                Ask a Question
              </Link>
            ) : (
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 text-sm">
                Log in to ask a question →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                to={`/forum/${thread.id}`}
                className="block bg-gray-900/50 border border-gray-800/50 rounded-xl p-5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-white font-medium mb-1 truncate">{thread.title}</h2>
                    <p className="text-gray-500 text-sm line-clamp-1">{thread.body}</p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                      <span>{thread.author_username}</span>
                      <span>·</span>
                      <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                      {thread.has_code && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-cyan-400">
                            <Code2 size={12} /> code
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm shrink-0">
                    <MessageSquare size={15} />
                    {thread.reply_count}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
