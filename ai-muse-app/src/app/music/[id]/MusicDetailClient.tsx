"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import type { MusicTrack } from "@/lib/music";

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface MusicDetailClientProps {
  track: MusicTrack;
}

export default function MusicDetailClient({ track }: MusicDetailClientProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
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

  const handleSkipBack = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = Math.max(0, media.currentTime - 10);
  };

  const handleSkipForward = () => {
    const media = mediaRef.current;
    if (!media) return;
    media.currentTime = Math.min(media.duration, media.currentTime + 10);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      if (isMuted) {
        mediaRef.current.volume = volume;
      } else {
        mediaRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="h-2 rounded-full bg-white/10 cursor-pointer group overflow-hidden"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                boxShadow: "0 0 8px rgba(0, 212, 255, 0.8)",
              }}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="font-mono text-xs text-text-muted">
            {formatTime(currentTime)}
          </span>
          <span className="font-mono text-xs text-text-muted">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={handleSkipBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <SkipBack className="w-6 h-6 text-white/70 hover:text-white" />
        </button>

        <button
          onClick={handlePlayPause}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-accent hover:scale-105 transition-transform"
          style={{
            boxShadow:
              "0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)",
          }}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7 text-void" />
          ) : (
            <Play className="w-7 h-7 text-void ml-1" />
          )}
        </button>

        <button
          onClick={handleSkipForward}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <SkipForward className="w-6 h-6 text-white/70 hover:text-white" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5 text-white/70" />
          ) : (
            <Volume2 className="w-5 h-5 text-white/70" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 rounded-full bg-white/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
        />
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
    </div>
  );
}
