"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function PromptDisplay({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const label = useMemo(() => (copied ? "Copied" : "Copy"), [copied]);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore copy failures (permissions / older browsers).
      setCopied(false);
    }
  };

  return (
    <section className="glass rounded-2xl border border-glass-border overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-glass-border">
        <h2 className="font-heading font-semibold text-white">Prompt</h2>
        <button
          type="button"
          onClick={copyPrompt}
          className="inline-flex items-center gap-2 text-sm font-heading text-text-secondary hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {label}
        </button>
      </div>
      <pre className="p-5 text-sm text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">
        {prompt}
      </pre>
    </section>
  );
}

