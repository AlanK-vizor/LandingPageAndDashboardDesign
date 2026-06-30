export function CodeBlock({ code, language }: { code: string; language?: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-800 bg-black/40">
      {language && (
        <div className="px-4 py-1.5 text-xs text-gray-500 border-b border-gray-800 bg-gray-900/50">
          {language}
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-cyan-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
