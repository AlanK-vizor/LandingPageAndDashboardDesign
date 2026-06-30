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

      <main className="pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-sm mx-auto">
        {!configured ? (
          <SupabaseSetupNotice />
        ) : (
          <div className="border border-gray-800 rounded-md bg-gray-900/20 overflow-hidden">
            <div className="flex border-b border-gray-800">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  mode === "login"
                    ? "bg-yellow-400 text-gray-950"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-3 text-sm font-semibold transition-colors border-l border-gray-800 ${
                  mode === "signup"
                    ? "bg-yellow-400 text-gray-950"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-400/50 placeholder-gray-700"
                    placeholder="e.g. robo_alan"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-400/50 placeholder-gray-700"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-md px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-400/50 placeholder-gray-700"
                  placeholder="At least 6 characters"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-yellow-400 text-gray-950 font-bold py-2.5 rounded-md hover:bg-yellow-300 transition-colors disabled:opacity-50 text-sm"
              >
                {submitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
              </button>
            </form>
          </div>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}
