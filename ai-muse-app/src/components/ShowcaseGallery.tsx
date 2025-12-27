"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown, Heart, Star } from "lucide-react";
import { showcaseCases } from "@/lib/cases";

// 使用 slug 生成固定的随机数
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generateStats(slug: string) {
  const seed = seededRandom(slug);
  // 爱心数：50 到 2000
  const likes = 50 + (seed % 1950);
  // 星星数：比爱心少，10 到 500
  const stars = 10 + ((seed >> 8) % 490);
  return { likes, stars };
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

// 初始化所有 case 的基础统计数据
const initialStats = showcaseCases.reduce((acc, c) => {
  acc[c.slug] = generateStats(c.slug);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

export default function ShowcaseGallery() {
  const [expanded, setExpanded] = useState(false);
  const visibleCases = expanded ? showcaseCases : showcaseCases.slice(0, 6);
  const hasMore = showcaseCases.length > 6;

  // 跟踪用户的点赞和收藏状态
  const [likedCases, setLikedCases] = useState<Set<string>>(new Set());
  const [starredCases, setStarredCases] = useState<Set<string>>(new Set());

  const handleLike = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedCases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

  const handleStar = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    setStarredCases((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(slug)) {
        newSet.delete(slug);
      } else {
        newSet.add(slug);
      }
      return newSet;
    });
  };

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCases.map((c, index) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden"
              >
                {(() => {
                  const baseStats = initialStats[c.slug];
                  const isLiked = likedCases.has(c.slug);
                  const isStarred = starredCases.has(c.slug);
                  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
                  const displayStars = baseStats.stars + (isStarred ? 1 : 0);

                  const imageContent = (
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
                      {/* 底部显示爱心和星星，悬停时显示 */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => handleLike(e, c.slug)}
                            className="flex items-center gap-1.5 transition-transform hover:scale-110 active:scale-95"
                          >
                            <Heart
                              className={`w-5 h-5 transition-colors duration-200 ${
                                isLiked
                                  ? "text-pink-500 fill-pink-500"
                                  : "text-white/80 hover:text-pink-400"
                              }`}
                            />
                            <span className={`font-mono text-sm font-medium ${isLiked ? "text-pink-400" : "text-white/80"}`}>
                              {formatNumber(displayLikes)}
                            </span>
                          </button>
                          <button
                            onClick={(e) => handleStar(e, c.slug)}
                            className="flex items-center gap-1.5 transition-transform hover:scale-110 active:scale-95"
                          >
                            <Star
                              className={`w-5 h-5 transition-colors duration-200 ${
                                isStarred
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-white/80 hover:text-yellow-300"
                              }`}
                            />
                            <span className={`font-mono text-sm font-medium ${isStarred ? "text-yellow-400" : "text-white/80"}`}>
                              {formatNumber(displayStars)}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );

                  return c.externalUrl ? (
                    <a href={c.externalUrl} target="_blank" rel="noopener noreferrer" className="block">
                      {imageContent}
                    </a>
                  ) : (
                    <Link href={`/cases/${c.slug}`} className="block">
                      {imageContent}
                    </Link>
                  );
                })()}

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

          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-glass-border hover:border-accent/50 transition-colors"
              >
                <span className="text-text-secondary group-hover:text-white transition-colors">
                  {expanded ? "收起" : "展开更多"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-accent transition-transform duration-300 ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
