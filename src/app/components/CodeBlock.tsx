import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export function CodeBlock({ code, language = "python" }: { code: string; language?: string }) {
  return (
    <div className="rounded-md overflow-hidden border border-gray-800 text-sm">
      <div className="px-4 py-1.5 text-xs text-gray-500 border-b border-gray-800 bg-gray-900 font-mono">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        customStyle={{ margin: 0, padding: "1rem", background: "#0d0d0d", fontSize: "0.8125rem" }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
