"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause } from "lucide-react";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  type: "audio" | "video";
}

const musicTracks: MusicTrack[] = [
  {
    id: "kill-american",
    title: "斩杀那个美利坚人",
    artist: "AI cover 杀死那个石家庄人",
    coverUrl: "/ai-music/kill-american.jpg",
    audioUrl: "/ai-music/kill-american.mp3",
    type: "audio",
  },
  {
    id: "tiaolou-gospel",
    title: "跳楼机 - 黑人福音版",
    artist: "SUNO V5",
    coverUrl: "/ai-music/suno-tiaolou-gospel.jpg",
    audioUrl: "/ai-music/suno-tiaolou-gospel.mp4",
    type: "video",
  },
  {
    id: "tiaolou-bieber",
    title: "跳楼机（完整版）",
    artist: "AI Justin Bieber",
    coverUrl: "/ai-music/tiaolou-bieber.jpg",
    audioUrl: "/ai-music/tiaolou-bieber.mp4",
    type: "video",
  },
  {
    id: "faruxue",
    title: "发如雪",
    artist: "AI 孙燕姿 cover 周杰伦",
    coverUrl: "/ai-music/ai-sunyanzi-faruxue.jpg",
    audioUrl: "/ai-music/ai-sunyanzi-faruxue.mp4",
    type: "video",
  },
  {
    id: "aizaixiyuanqian",
    title: "爱在西元前",
    artist: "AI 孙燕姿",
    coverUrl: "/ai-music/ai-sunyanzi-aizaixiyuanqian.jpg",
    audioUrl: "/ai-music/ai-sunyanzi-aizaixiyuanqian.mp4",
    type: "video",
  },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function MusicCard({ track, index }: { track: MusicTrack; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

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

  const handlePlayPause = () => {
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
      className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden"
    >
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
      </div>

      <div className="p-4">
        <h3 className="font-heading text-sm font-semibold text-white truncate">
          {track.title}
        </h3>
        <p className="mt-1 text-xs text-text-muted truncate">{track.artist}</p>
      </div>

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
  return (
    <section id="music" className="relative py-24">
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
                探索由AI生成的音乐作品，体验人工智能与音乐创作的完美融合。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {musicTracks.map((track, index) => (
              <MusicCard key={track.id} track={track} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
