"use client";

import { useMemo } from "react";
import type { CasePermission } from "@/lib/cases";
import { ExternalLink, Shield } from "lucide-react";

function permissionsToAllow(perms: CasePermission[] | undefined) {
  const allow = new Set<string>();
  if (perms?.includes("camera")) allow.add("camera");
  // Convenience for demos: allow clipboard writes (e.g. share link copy) without opening the sandbox.
  allow.add("clipboard-write");
  return Array.from(allow).join("; ");
}

export default function ProjectPreview({
  htmlUrl,
  title,
  permissions,
}: {
  htmlUrl: string;
  title: string;
  permissions?: CasePermission[];
}) {
  const allow = useMemo(() => permissionsToAllow(permissions), [permissions]);

  return (
    <section className="glass-holographic rounded-2xl border border-glass-border overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-glass-border bg-void/40">
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <Shield className="w-4 h-4" />
          <span className="font-mono">iframe preview</span>
        </div>
        <a
          href={htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-heading text-white/90 hover:text-white transition-colors"
        >
          Open in new tab <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <iframe
        src={htmlUrl}
        title={title}
        className="w-full h-[70vh] min-h-[560px] border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
        allow={allow}
        allowFullScreen
      />
    </section>
  );
}

