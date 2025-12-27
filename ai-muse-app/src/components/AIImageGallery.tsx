"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ImageIcon, Heart, Star } from "lucide-react";
import { imageItems } from "@/lib/images";

// 使用 id 生成固定的随机数
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function generateStats(id: string) {
  const seed = seededRandom("image-" + id);
  const likes = 50 + (seed % 1950);
  const stars = 10 + ((seed >> 8) % 490);
  return { likes, stars };
}

function formatNumber(num: number) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

// 初始化所有 image 的基础统计数据
const initialStats = imageItems.reduce((acc, img) => {
  acc[img.id] = generateStats(img.id);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

export default function AIImageGallery() {
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [starredImages, setStarredImages] = useState<Set<string>>(new Set());

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleStar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setStarredImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Duplicate images for seamless infinite scroll
  const duplicatedImages = [...imageItems, ...imageItems];

  return (
    <section id="image" className="relative py-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <ImageIcon className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-text-secondary">
                  AI Generated
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                AI Image Lab
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">
                探索由AI生成的图像作品，感受人工智能在视觉艺术领域的创造力。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full">
        <div className="flex animate-scroll">
          {duplicatedImages.map((image, index) => {
            const isLiked = likedImages.has(image.id);
            const isStarred = starredImages.has(image.id);
            const baseStats = initialStats[image.id];
            const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
            const displayStars = baseStats.stars + (isStarred ? 1 : 0);

            return (
              <motion.div
                key={`${image.id}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 px-3 group"
              >
                <Link href={`/images/${image.id}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl border border-glass-border glass-holographic cursor-pointer">
                    <img
                      src={image.src}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                      className="h-[400px] w-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* 底部显示爱心和星星，悬停时显示 */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleLike(e, image.id)}
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
                          onClick={(e) => handleStar(e, image.id)}
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
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
