import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navigation } from "../components/Navigation";
import { SupabaseSetupNotice } from "../components/SupabaseSetupNotice";
import { useAuth } from "../context/AuthContext";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, configured } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result =
      mode === "login" ? await signIn(email, password) : await signUp(email, password, username);

    setSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    navigate("/forum");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8">
            <div className="flex gap-2 mb-8 bg-gray-950 border border-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "login" ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white" : "text-gray-400"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                  mode === "signup" ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white" : "text-gray-400"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                    placeholder="e.g. robo_alan"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  placeholder="At least 6 characters"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-medium py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
              </button>
            </form>
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
