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

      <main className="flex-1 pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="text-xs font-bold tracking-widest text-yellow-400 uppercase mb-3">Community</div>
            <h1 className="text-3xl font-bold text-white">Q&A Forum</h1>
            <p className="text-gray-500 text-sm mt-2">Ask questions, share code, help each other out.</p>
          </div>
          {user && (
            <Link
              to="/forum/new"
              className="flex items-center gap-2 bg-yellow-400 text-gray-950 text-sm font-bold px-4 py-2.5 rounded-md hover:bg-yellow-300 transition-colors whitespace-nowrap"
            >
              <Plus size={15} /> New Question
            </Link>
          )}
        </div>

        {!configured ? (
          <SupabaseSetupNotice />
        ) : loading ? (
          <p className="text-gray-600 text-sm">Loading...</p>
        ) : threads.length === 0 ? (
          <div className="text-center border border-gray-800 rounded-md p-14 bg-gray-900/20">
            <p className="text-gray-500 mb-5">No questions yet — be the first to post one.</p>
            {user ? (
              <Link
                to="/forum/new"
                className="inline-block bg-yellow-400 text-gray-950 text-sm font-bold px-5 py-2.5 rounded-md hover:bg-yellow-300 transition-colors"
              >
                Ask a Question
              </Link>
            ) : (
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300 text-sm">
                Log in to ask a question →
              </Link>
            )}
          </div>
        ) : (
          <div className="border border-gray-800 rounded-md divide-y divide-gray-800 overflow-hidden">
            {threads.map((thread) => (
              <Link
                key={thread.id}
                to={`/forum/${thread.id}`}
                className="flex items-start justify-between gap-4 px-5 py-4 hover:bg-gray-900/40 transition-colors"
              >
                <div className="min-w-0">
                  <h2 className="text-white text-sm font-medium mb-1 truncate">{thread.title}</h2>
                  <p className="text-gray-600 text-xs line-clamp-1 mb-2">{thread.body}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{thread.author_username}</span>
                    <span>·</span>
                    <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    {thread.has_code && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Code2 size={11} /> code
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600 text-xs shrink-0 mt-0.5">
                  <MessageSquare size={13} />
                  {thread.reply_count}
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
