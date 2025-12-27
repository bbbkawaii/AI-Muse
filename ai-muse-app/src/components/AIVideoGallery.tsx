"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Video, Play, Pause, X } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  orientation: "portrait" | "landscape";
}

const videoItems: VideoItem[] = [
  {
    id: "suxi-fish",
    title: "卧室溯溪抓鱼自由",
    description: "把空调管连上屋顶的太阳能热水器，在卧室里舒舒服服的溯溪",
    coverUrl: "/ai-videos/1.jpg",
    videoUrl: "/ai-videos/1.mp4",
    orientation: "portrait",
  },
  {
    id: "apple-parkour",
    title: "大苹果跑酷",
    description: "海螺AI首尾帧大幅度运镜，大苹果玩出蜘蛛侠穿越的质感",
    coverUrl: "/ai-videos/2.jpg",
    videoUrl: "/ai-videos/2.mp4",
    orientation: "portrait",
  },
  {
    id: "tianjin-chill",
    title: "天津的松弛感",
    description: "天津的松弛感拉满了",
    coverUrl: "/ai-videos/3.jpg",
    videoUrl: "/ai-videos/3.mp4",
    orientation: "portrait",
  },
  {
    id: "tianjin-ad",
    title: "天津老字号沙雕广告",
    description: "海河牛奶豁出去了，天津人的精神状态太猛了",
    coverUrl: "/ai-videos/4.jpg",
    videoUrl: "/ai-videos/4.mp4",
    orientation: "portrait",
  },
  {
    id: "bingmayong",
    title: "兵马俑直播带货",
    description: "AIGC短片《兵马俑的卖货日记》，穿越2000多年的兵马俑卖起了长生不老丹",
    coverUrl: "/ai-videos/5.jpg",
    videoUrl: "/ai-videos/5.mp4",
    orientation: "portrait",
  },
  {
    id: "trump-no-kings",
    title: "Trump mocks 'No Kings' protests",
    description: "Trump mocks 'No Kings' protests with shocking AI videos",
    coverUrl: "/ai-videos/6.jpg",
    videoUrl: "/ai-videos/6.mp4",
    orientation: "landscape",
  },
  {
    id: "time-traveler",
    title: "时间旅行者的 VLOG",
    description: "时间旅行者的 VLOG",
    coverUrl: "/ai-videos/7.jpg",
    videoUrl: "/ai-videos/8.mp4",
    orientation: "landscape",
  },
  {
    id: "lunch-rush",
    title: "距离下课还有10秒",
    description: "距离下课还有10秒，食堂还没做好饭怎么办？",
    coverUrl: "/ai-videos/8.jpg",
    videoUrl: "/ai-videos/9.mp4",
    orientation: "landscape",
  },
];

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: VideoItem;
  index: number;
  onPlay: (video: VideoItem) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group glass-holographic rounded-2xl border border-glass-border overflow-hidden cursor-pointer"
      onClick={() => onPlay(video)}
    >
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

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <div
            className="relative w-16 h-16 rounded-full flex items-center justify-center bg-accent/90 backdrop-blur-sm hover:scale-110 transition-transform"
            style={{
              boxShadow:
                "0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(0, 212, 255, 0.3)",
            }}
          >
            <Play className="w-7 h-7 text-void ml-1" />
          </div>
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-heading text-sm font-semibold text-white truncate">
          {video.title}
        </h3>
        <p className="mt-1 text-xs text-text-muted line-clamp-2">
          {video.description}
        </p>
      </div>
    </motion.div>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: VideoItem;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`relative glass-holographic rounded-2xl border border-glass-border overflow-hidden ${
          video.orientation === "portrait" ? "max-w-md" : "max-w-4xl"
        } w-full`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass border border-glass-border flex items-center justify-center hover:border-accent/50 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls
          autoPlay
          playsInline
          className={`w-full ${
            video.orientation === "portrait"
              ? "max-h-[80vh] object-contain"
              : "aspect-video object-cover"
          }`}
        />

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-semibold text-white">
            {video.title}
          </h3>
          <p className="mt-1 text-sm text-text-muted">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AIVideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Separate portrait and landscape videos
  const portraitVideos = videoItems.filter((v) => v.orientation === "portrait");
  const landscapeVideos = videoItems.filter(
    (v) => v.orientation === "landscape"
  );

  return (
    <>
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
                  onPlay={setSelectedVideo}
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
                  onPlay={setSelectedVideo}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}
