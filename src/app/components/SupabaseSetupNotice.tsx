export function SupabaseSetupNotice() {
  return (
    <div className="max-w-xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
      <h3 className="text-amber-400 font-semibold mb-2">Backend not connected yet</h3>
      <p className="text-gray-400 text-sm">
        This feature needs Supabase credentials. Add{" "}
        <code className="text-amber-300">VITE_SUPABASE_URL</code> and{" "}
        <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code> to a{" "}
        <code className="text-amber-300">.env</code> file in the project root, then restart the dev
        server.
      </p>
    </div>
  );
}
