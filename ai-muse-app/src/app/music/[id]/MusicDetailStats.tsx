"use client";

import { useState } from "react";
import { Heart, Star } from "lucide-react";

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
  const seed = seededRandom("music-" + id);
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

interface MusicDetailStatsProps {
  id: string;
}

export default function MusicDetailStats({ id }: MusicDetailStatsProps) {
  const baseStats = generateStats(id);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
  const displayStars = baseStats.stars + (isStarred ? 1 : 0);

  return (
    <div className="flex items-center justify-between">
      {/* 作者信息 */}
      <div className="flex items-center gap-3">
        <img
          src="/avatar.jpg"
          alt="Chorispora"
          className="w-10 h-10 rounded-full object-cover border-2 border-glass-border"
        />
        <span className="font-medium text-white">Chorispora</span>
      </div>

      {/* 爱心和星星 */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-glass-border hover:border-pink-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isLiked
                ? "text-pink-500 fill-pink-500"
                : "text-white/70 hover:text-pink-400"
            }`}
          />
          <span
            className={`font-mono text-sm font-medium transition-colors duration-200 ${
              isLiked ? "text-pink-400" : "text-white/70"
            }`}
          >
            {formatNumber(displayLikes)}
          </span>
        </button>
        <button
          onClick={() => setIsStarred(!isStarred)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-glass-border hover:border-yellow-500/50 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Star
            className={`w-5 h-5 transition-colors duration-200 ${
              isStarred
                ? "text-yellow-400 fill-yellow-400"
                : "text-white/70 hover:text-yellow-300"
            }`}
          />
          <span
            className={`font-mono text-sm font-medium transition-colors duration-200 ${
              isStarred ? "text-yellow-400" : "text-white/70"
            }`}
          >
            {formatNumber(displayStars)}
          </span>
        </button>
      </div>
    </div>
  );
}
