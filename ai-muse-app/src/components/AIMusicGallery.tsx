"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Play, Pause, Heart, Star } from "lucide-react";
import { musicTracks, type MusicTrack } from "@/lib/music";

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

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// 初始化所有 music 的基础统计数据
const initialStats = musicTracks.reduce((acc, track) => {
  acc[track.id] = generateStats(track.id);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

function MusicCard({
  track,
  index,
  isLiked,
  isStarred,
  onLike,
  onStar,
}: {
  track: MusicTrack;
  index: number;
  isLiked: boolean;
  isStarred: boolean;
  onLike: (e: React.MouseEvent) => void;
  onStar: (e: React.MouseEvent) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const baseStats = initialStats[track.id];
  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
  const displayStars = baseStats.stars + (isStarred ? 1 : 0);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateProgress = () => {
      if (media.duration) {
        setProgress((media.currentTime / media.duration) * 100);
        setCurrentTime(media.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(media.duration);
    };

    media.addEventListener("timeupdate", updateProgress);
    media.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      media.removeEventListener("timeupdate", updateProgress);
      media.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const media = mediaRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
    } else {
      media.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const media = mediaRef.current;
    const progressBar = progressRef.current;
    if (!media || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    media.currentTime = percentage * media.duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden cursor-pointer"
    >
      <Link href={`/music/${track.id}`} className="block">
        <div className="relative bg-void/60 overflow-hidden">
          <img
            src={track.coverUrl}
            alt={`${track.title} cover`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.05]"
          />

          
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayPause}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isPlaying
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? "bg-void/80 backdrop-blur-md border border-accent/50"
                  : "bg-accent/90 backdrop-blur-sm"
              } hover:scale-110`}
              style={{
                boxShadow: isPlaying
                  ? "0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)"
                  : "0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)",
              }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-accent" />
              ) : (
                <Play className="w-6 h-6 text-void ml-0.5" />
              )}
            </div>
          </button>

          {/* Progress bar at bottom of cover */}
          {(isPlaying || progress > 0) && (
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-text-secondary w-8">
                  {formatTime(currentTime)}
                </span>
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="flex-1 h-1 rounded-full bg-white/10 backdrop-blur-sm cursor-pointer group/progress overflow-hidden"
                >
                  <div
                    className="h-full rounded-full relative transition-all duration-100"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, rgba(0, 212, 255, 0.6), rgba(0, 212, 255, 1))",
                      boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                    }}
                  >
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-accent opacity-0 group-hover/progress:opacity-100 transition-opacity"
                      style={{
                        boxShadow: "0 0 8px rgba(0, 212, 255, 0.8)",
                      }}
                    />
                  </div>
                </div>
                <span className="font-mono text-[10px] text-text-muted w-8 text-right">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          )}

          {/* 底部显示爱心和星星，悬停时显示 */}
          {!isPlaying && progress === 0 && (
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
          )}
        </div>

        <div className="p-4">
          <h3 className="font-heading text-sm font-semibold text-white truncate">
            {track.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted truncate">{track.artist}</p>
        </div>
      </Link>

      {/* Hidden media element */}
      {track.type === "audio" ? (
        <audio
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          src={track.audioUrl}
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          preload="metadata"
        />
      ) : (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={track.audioUrl}
          onEnded={handleEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          preload="metadata"
          className="hidden"
          playsInline
        />
      )}
    </motion.div>
  );
}

export default function AIMusicGallery() {
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [starredTracks, setStarredTracks] = useState<Set<string>>(new Set());

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedTracks((prev) => {
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
    setStarredTracks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section id="music" className="relative py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Music className="w-4 h-4 text-accent" />
                <span className="font-mono text-sm text-text-secondary">
                  AI Generated
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
                AI Music Lab
              </h2>
              <p className="mt-3 text-text-secondary max-w-2xl">
                Explore AI-generated music and experience the fusion of artificial intelligence and music creation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {musicTracks.map((track, index) => (
              <MusicCard
                key={track.id}
                track={track}
                index={index}
                isLiked={likedTracks.has(track.id)}
                isStarred={starredTracks.has(track.id)}
                onLike={(e) => handleLike(e, track.id)}
                onStar={(e) => handleStar(e, track.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
