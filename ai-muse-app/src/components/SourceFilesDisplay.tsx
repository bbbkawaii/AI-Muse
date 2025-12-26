"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

export type SourceFile = {
  label: string;
  path: string;
  content: string;
};

function SourceFileCard({ file }: { file: SourceFile }) {
  const [copied, setCopied] = useState(false);
  const copyLabel = useMemo(() => (copied ? "Copied" : "Copy"), [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(file.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="glass rounded-2xl border border-glass-border overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-glass-border">
        <div className="min-w-0">
          <h2 className="font-heading font-semibold text-white">{file.label}</h2>
          <div className="mt-1 font-mono text-xs text-text-muted truncate">
            {file.path}
          </div>
        </div>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 text-sm font-heading text-text-secondary hover:text-white transition-colors shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copyLabel}
        </button>
      </div>
      <pre className="p-5 text-sm text-text-secondary whitespace-pre-wrap font-mono leading-relaxed">
        {file.content}
      </pre>
    </section>
  );
}

export default function SourceFilesDisplay({ files }: { files: SourceFile[] }) {
  if (!files.length) return null;

  return (
    <section className="mt-10">
      <h2 className="font-heading text-xl font-semibold text-white">
        HTML Files
      </h2>
      <p className="mt-2 text-sm text-text-secondary">
        Raw HTML artifacts included in this case.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {files.map((file) => (
          <SourceFileCard key={file.path} file={file} />
        ))}
      </div>
    </section>
  );
}

