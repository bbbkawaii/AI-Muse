"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Video, Heart, Star } from "lucide-react";
import { videoItems, type VideoItem } from "@/lib/videos";

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
  const seed = seededRandom(id);
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

// 初始化所有 video 的基础统计数据
const initialStats = videoItems.reduce((acc, v) => {
  acc[v.id] = generateStats(v.id);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

function VideoCard({
  video,
  index,
  isLiked,
  isStarred,
  onLike,
  onStar,
}: {
  video: VideoItem;
  index: number;
  isLiked: boolean;
  isStarred: boolean;
  onLike: (e: React.MouseEvent) => void;
  onStar: (e: React.MouseEvent) => void;
}) {
  const baseStats = initialStats[video.id];
  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
  const displayStars = baseStats.stars + (isStarred ? 1 : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden cursor-pointer"
    >
      <Link href={`/videos/${video.id}`} className="block">
        <div className="relative bg-void/60 overflow-hidden">
          <img
            src={video.coverUrl}
            alt={`${video.title} cover`}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.05] ${
              video.orientation === "portrait" ? "aspect-[3/4]" : "aspect-video"
            }`}
          />


          {/* 底部显示爱心和星星，悬停时显示 */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4">
              <button
                onClick={onLike}
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
                onClick={onStar}
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

        <div className="p-4">
          <h3 className="font-heading text-sm font-semibold text-white truncate">
            {video.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted line-clamp-2">
            {video.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AIVideoGallery() {
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [starredVideos, setStarredVideos] = useState<Set<string>>(new Set());

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedVideos((prev) => {
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
    setStarredVideos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Separate portrait and landscape videos
  const portraitVideos = videoItems.filter((v) => v.orientation === "portrait");
  const landscapeVideos = videoItems.filter(
    (v) => v.orientation === "landscape"
  );

  return (
    <section id="video" className="relative py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Video className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-text-secondary">
                  AI Generated
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                AI Video Lab
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">
                探索由AI生成的视频作品，见证人工智能在视频创作领域的无限可能。
              </p>
            </div>
          </div>

          {/* Portrait Videos - 5 columns grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {portraitVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                isLiked={likedVideos.has(video.id)}
                isStarred={starredVideos.has(video.id)}
                onLike={(e) => handleLike(e, video.id)}
                onStar={(e) => handleStar(e, video.id)}
              />
            ))}
          </div>

          {/* Landscape Videos - 3 columns grid to align with 5 portrait videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {landscapeVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={portraitVideos.length + index}
                isLiked={likedVideos.has(video.id)}
                isStarred={starredVideos.has(video.id)}
                onLike={(e) => handleLike(e, video.id)}
                onStar={(e) => handleStar(e, video.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
