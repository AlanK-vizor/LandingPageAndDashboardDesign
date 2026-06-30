import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../context/AuthContext";

export function NewThreadPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [includeCode, setIncludeCode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("threads")
      .insert({
        title,
        body,
        code_snippet: includeCode ? code : null,
        code_language: includeCode ? language || null : null,
        author_id: user.id,
        author_username: profile?.username ?? user.email,
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    navigate(`/forum/${data.id}`);
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-semibold text-white mb-8">Ask a Question</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
              placeholder="e.g. Servo not responding to PWM signal"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Details</label>
            <textarea
              required
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
              placeholder="Describe what you're trying to do and what's going wrong..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCode}
                onChange={(e) => setIncludeCode(e.target.checked)}
                className="rounded border-gray-700"
              />
              Attach a code snippet
            </label>
          </div>

          {includeCode && (
            <div className="space-y-3">
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                placeholder="Language (e.g. python, c++)"
              />
              <textarea
                rows={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black/40 border border-gray-800 rounded-lg px-4 py-2.5 text-cyan-300 text-sm font-mono focus:outline-none focus:border-cyan-500/50 resize-none"
                placeholder="Paste your code here..."
              />
            </div>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Question"}
          </button>
        </form>
      </main>
    </div>
  );
}
