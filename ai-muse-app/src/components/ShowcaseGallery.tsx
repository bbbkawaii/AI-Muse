"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { showcaseCases } from "@/lib/cases";

export default function ShowcaseGallery() {
  return (
    <section id="gallery" className="relative py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-text-secondary">
                  Case Gallery
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                AI Game Lab
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">
                Click a case to preview it in an isolated iframe, and inspect the
                prompt that generated it.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showcaseCases.map((c, index) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden"
              >
                {c.externalUrl ? (
                  <a href={c.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative aspect-[16/9] bg-void/60 overflow-hidden">
                      {c.thumbnailUrl ? (
                        <img
                          src={c.thumbnailUrl}
                          alt={`${c.title} preview`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center font-mono text-sm text-text-muted">
                          No preview
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                    </div>
                  </a>
                ) : (
                  <Link href={`/cases/${c.slug}`} className="block">
                    <div className="relative aspect-[16/9] bg-void/60 overflow-hidden">
                      {c.thumbnailUrl ? (
                        <img
                          src={c.thumbnailUrl}
                          alt={`${c.title} preview`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center font-mono text-sm text-text-muted">
                          No preview
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                    </div>
                  </Link>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-text-muted uppercase tracking-widest">
                        {c.category}
                      </div>
                      <h3 className="mt-2 font-heading text-xl font-semibold text-white truncate">
                        {c.title}
                      </h3>
                    </div>
                    {c.externalUrl ? (
                      <a
                        href={c.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary glow-border rounded-xl shrink-0"
                      >
                        <span className="inline-flex items-center gap-2">
                          Open <ArrowRight className="w-4 h-4" />
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={`/cases/${c.slug}`}
                        className="btn-primary glow-border rounded-xl shrink-0"
                      >
                        <span className="inline-flex items-center gap-2">
                          Open <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    )}
                  </div>

                  <p className="mt-4 text-text-secondary leading-relaxed">
                    {c.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-glass-border bg-white/5 text-xs font-mono text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
