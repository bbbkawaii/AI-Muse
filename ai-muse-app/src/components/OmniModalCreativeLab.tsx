"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Star, ArrowUpRight, Play, Pause, Sparkles, Zap, Wand2 } from "lucide-react";

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

// 精选内容数据
const featuredItems = [
  {
    id: "soul-nebula",
    type: "case" as const,
    title: "Soul Nebula",
    subtitle: "情绪卡片星云",
    description: "沉浸式3D情绪卡片星云，手势交互触发粒子爆炸",
    thumbnailUrl: "/demos/soul-nebula/thumbnail.png",
    category: "3D",
    href: "/cases/soul-nebula",
    icon: Sparkles,
    glowColor: "rgba(0, 212, 255, 0.5)",
  },
  {
    id: "asmr-glass-fruit",
    type: "video" as const,
    title: "AI软萌ASMR",
    subtitle: "割玻璃水果",
    description: "治愈系AI生成视频，玻璃质感水果切割",
    thumbnailUrl: "/ai-videos/7.jpg",
    category: "Video",
    href: "/videos/asmr-glass-fruit",
    icon: Wand2,
    glowColor: "rgba(236, 72, 153, 0.5)",
  },
  {
    id: "kill-american",
    type: "music" as const,
    title: "斩杀那个美利坚人",
    subtitle: "AI Cover",
    description: "AI翻唱《杀死那个石家庄人》",
    thumbnailUrl: "/ai-music/kill-american.jpg",
    audioUrl: "/ai-music/kill-american.mp3",
    category: "Music",
    href: "/music/kill-american",
    icon: Zap,
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
];

// 初始化统计数据
const initialStats = featuredItems.reduce((acc, item) => {
  acc[item.id] = generateStats(item.id);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

// 3D 倾斜卡片组件
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 统一卡片组件
function FeaturedCard({
  item,
  index,
  isLiked,
  isStarred,
  onLike,
  onStar,
}: {
  item: typeof featuredItems[number];
  index: number;
  isLiked: boolean;
  isStarred: boolean;
  onLike: (e: React.MouseEvent) => void;
  onStar: (e: React.MouseEvent) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const baseStats = initialStats[item.id];
  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
  const displayStars = baseStats.stars + (isStarred ? 1 : 0);
  const IconComponent = item.icon;

  useEffect(() => {
    if (item.type !== "music") return;
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [item.type]);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* 背景 */}
        <div className="absolute inset-0 bg-void-elevated/90 backdrop-blur-xl" />

        {/* 边框 */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />

        {/* 发光效果 */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ boxShadow: `inset 0 0 40px ${item.glowColor}, 0 0 20px ${item.glowColor}` }}
        />

        <Link href={item.href} className="block relative h-full">
          {/* 图片区域 */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-elevated via-void-elevated/30 to-transparent" />

            {/* 类型标签 */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-void/70 backdrop-blur-sm border border-white/10">
              <IconComponent className="w-3 h-3 text-accent" />
              <span className="font-mono text-[10px] text-white/80 uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            {/* 播放按钮（仅音乐） */}
            {item.type === "music" && (
              <button
                onClick={handlePlayPause}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-void/80 border border-accent/50 opacity-100"
                    : "bg-accent opacity-0 group-hover:opacity-100"
                }`}
                style={{ boxShadow: `0 0 25px ${item.glowColor}` }}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-accent" />
                ) : (
                  <Play className="w-4 h-4 text-void ml-0.5" />
                )}
              </button>
            )}

            {/* 进度条 */}
            {item.type === "music" && (isPlaying || progress > 0) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
                <div
                  className="h-full bg-accent transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* 悬浮箭头 */}
            <div
              className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-accent/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
              style={{ boxShadow: `0 0 20px ${item.glowColor}` }}
            >
              <ArrowUpRight className="w-4 h-4 text-void" />
            </div>
          </div>

          {/* 内容区域 */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="min-w-0">
                <h3 className="font-heading text-base font-bold text-white truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-accent truncate">{item.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-text-muted line-clamp-1 mb-3">
              {item.description}
            </p>

            {/* 互动统计 */}
            <div className="flex items-center gap-3">
              <button
                onClick={onLike}
                className="flex items-center gap-1 transition-transform hover:scale-110"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    isLiked ? "text-pink-500 fill-pink-500" : "text-text-muted"
                  }`}
                />
                <span className="font-mono text-xs text-text-muted">
                  {formatNumber(displayLikes)}
                </span>
              </button>
              <button
                onClick={onStar}
                className="flex items-center gap-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-3.5 h-3.5 ${
                    isStarred ? "text-yellow-400 fill-yellow-400" : "text-text-muted"
                  }`}
                />
                <span className="font-mono text-xs text-text-muted">
                  {formatNumber(displayStars)}
                </span>
              </button>
            </div>
          </div>
        </Link>

        {/* 隐藏的音频元素 */}
        {item.type === "music" && "audioUrl" in item && (
          <audio
            ref={audioRef}
            src={item.audioUrl}
            onEnded={() => { setIsPlaying(false); setProgress(0); }}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            preload="metadata"
          />
        )}
      </motion.div>
    </TiltCard>
  );
}

export default function OmniModalCreativeLab() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [starredItems, setStarredItems] = useState<Set<string>>(new Set());

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleStar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setStarredItems((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <section className="relative pt-6 pb-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.2), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* 紧凑标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
          >
            <div className="flex items-center gap-4">
              {/* Live 指示灯 */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-accent/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  Featured
                </span>
              </div>

              {/* 标题 */}
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
                  Omni-modal AI{" "}
                  <span className="text-accent">Creative Lab</span>
                </h2>
              </div>
            </div>

            {/* 副标题 */}
            <p className="text-text-secondary text-sm md:text-base">
              3D互动 <span className="text-accent/60">/</span> 视频生成 <span className="text-accent/60">/</span> 音乐创作
            </p>
          </motion.div>

          {/* 三列网格布局 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredItems.map((item, index) => (
              <FeaturedCard
                key={item.id}
                item={item}
                index={index}
                isLiked={likedItems.has(item.id)}
                isStarred={starredItems.has(item.id)}
                onLike={(e) => handleLike(e, item.id)}
                onStar={(e) => handleStar(e, item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
