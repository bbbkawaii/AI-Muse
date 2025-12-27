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

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// 精选内容数据
const featuredItems = [
  {
    id: "soul-nebula",
    type: "case" as const,
    title: "Soul Nebula",
    subtitle: "情绪卡片星云",
    description: "沉浸式3D情绪卡片星云体验，数百张漂浮卡片通过手势交互，触发粒子爆炸效果",
    thumbnailUrl: "/demos/soul-nebula/thumbnail.png",
    category: "3D Interactive",
    href: "/cases/soul-nebula",
    tags: ["Three.js", "MediaPipe", "Particles"],
    icon: Sparkles,
    accentColor: "from-cyan-500/20 via-blue-500/10 to-purple-500/20",
    glowColor: "rgba(0, 212, 255, 0.4)",
  },
  {
    id: "asmr-glass-fruit",
    type: "video" as const,
    title: "AI软萌ASMR",
    subtitle: "割玻璃水果",
    description: "治愈系AI生成视频，玻璃质感水果的切割ASMR体验",
    thumbnailUrl: "/ai-videos/7.jpg",
    category: "AI Video",
    href: "/videos/asmr-glass-fruit",
    tags: ["ASMR", "AI Video", "Relaxing"],
    icon: Wand2,
    accentColor: "from-pink-500/20 via-rose-500/10 to-orange-500/20",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
  {
    id: "kill-american",
    type: "music" as const,
    title: "斩杀那个美利坚人",
    subtitle: "AI Cover",
    description: "AI翻唱《杀死那个石家庄人》，摇滚精神的跨文化演绎",
    thumbnailUrl: "/ai-music/kill-american.jpg",
    audioUrl: "/ai-music/kill-american.mp3",
    category: "AI Music",
    href: "/music/kill-american",
    tags: ["AI Music", "Rock", "Cover"],
    icon: Zap,
    accentColor: "from-amber-500/20 via-yellow-500/10 to-lime-500/20",
    glowColor: "rgba(245, 158, 11, 0.4)",
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

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 主卡片（大尺寸）
function FeaturedMainCard({
  item,
  isLiked,
  isStarred,
  onLike,
  onStar,
}: {
  item: typeof featuredItems[0];
  isLiked: boolean;
  isStarred: boolean;
  onLike: (e: React.MouseEvent) => void;
  onStar: (e: React.MouseEvent) => void;
}) {
  const baseStats = initialStats[item.id];
  const displayLikes = baseStats.likes + (isLiked ? 1 : 0);
  const displayStars = baseStats.stars + (isStarred ? 1 : 0);
  const IconComponent = item.icon;

  return (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full rounded-3xl overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 背景渐变光晕 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* 玻璃背景 */}
        <div className="absolute inset-0 bg-void-elevated/80 backdrop-blur-xl" />

        {/* 网格装饰 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* 边框 */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

        {/* 发光边框效果 */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 60px ${item.glowColor}, 0 0 40px ${item.glowColor}`,
          }}
        />

        <Link href={item.href} className="block relative h-full p-6 md:p-8">
          {/* 顶部标签 */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <IconComponent className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            {/* 统计 */}
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={onLike}
                className="flex items-center gap-1.5 transition-transform hover:scale-110"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isLiked ? "text-pink-500 fill-pink-500" : "text-white/60"
                  }`}
                />
                <span className="font-mono text-xs text-white/60">
                  {formatNumber(displayLikes)}
                </span>
              </button>
              <button
                onClick={onStar}
                className="flex items-center gap-1.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-4 h-4 ${
                    isStarred ? "text-yellow-400 fill-yellow-400" : "text-white/60"
                  }`}
                />
                <span className="font-mono text-xs text-white/60">
                  {formatNumber(displayStars)}
                </span>
              </button>
            </div>
          </div>

          {/* 图片区域 */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-elevated via-transparent to-transparent" />

            {/* 悬浮箭头 */}
            <div
              className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-4"
              style={{
                boxShadow: `0 0 30px ${item.glowColor}`,
                transform: "translateZ(40px)",
              }}
            >
              <ArrowUpRight className="w-5 h-5 text-void" />
            </div>
          </div>

          {/* 内容 */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
              {item.title}
            </h3>
            <p className="font-heading text-lg text-accent mb-3">{item.subtitle}</p>
            <p className="text-text-secondary leading-relaxed mb-4">
              {item.description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </motion.div>
    </TiltCard>
  );
}

// 侧边卡片（小尺寸）
function FeaturedSideCard({
  item,
  index,
  isLiked,
  isStarred,
  onLike,
  onStar,
}: {
  item: typeof featuredItems[1] | typeof featuredItems[2];
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full rounded-2xl overflow-hidden"
      >
        {/* 背景 */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />
        <div className="absolute inset-0 bg-void-elevated/90 backdrop-blur-xl" />

        {/* 边框 */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

        {/* 发光效果 */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 40px ${item.glowColor}, 0 0 30px ${item.glowColor}`,
          }}
        />

        <Link href={item.href} className="block relative h-full p-5">
          {/* 图片 */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-elevated/80 via-transparent to-transparent" />

            {/* 播放按钮（仅音乐） */}
            {item.type === "music" && (
              <button
                onClick={handlePlayPause}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isPlaying
                    ? "bg-void/80 border border-accent/50"
                    : "bg-accent opacity-0 group-hover:opacity-100"
                }`}
                style={{
                  boxShadow: isPlaying
                    ? `0 0 20px ${item.glowColor}`
                    : `0 0 30px ${item.glowColor}`,
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-accent" />
                ) : (
                  <Play className="w-5 h-5 text-void ml-0.5" />
                )}
              </button>
            )}

            {/* 进度条 */}
            {item.type === "music" && (isPlaying || progress > 0) && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                  className="h-full bg-accent transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* 类型标签 */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-void/60 backdrop-blur-sm border border-white/10">
              <IconComponent className="w-3 h-3 text-accent" />
              <span className="font-mono text-[10px] text-white/80 uppercase">
                {item.category}
              </span>
            </div>
          </div>

          {/* 内容 */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-accent">{item.subtitle}</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
            </div>

            <p className="text-xs text-text-muted line-clamp-2 mb-3">
              {item.description}
            </p>

            {/* 互动统计 */}
            <div className="flex items-center gap-4">
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
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
            }}
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
    setStarredItems((prev) => {
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 顶部渐变光晕 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* 装饰线条 */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* 小标签 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent/30 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="font-mono text-sm text-accent uppercase tracking-widest">
                Featured Creations
              </span>
            </motion.div>

            {/* 主标题 */}
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              <span className="block">Omni-modal AI</span>
              <span className="block text-accent">Creative Lab</span>
            </h2>

            {/* 副标题 */}
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              探索跨模态AI创作的无限可能
              <span className="mx-2 text-accent">|</span>
              3D互动 / 视频生成 / 音乐创作
            </p>
          </motion.div>

          {/* Bento Grid 布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6">
            {/* 主卡片 - 占 3 列 */}
            <div className="lg:col-span-3">
              <FeaturedMainCard
                item={featuredItems[0]}
                isLiked={likedItems.has(featuredItems[0].id)}
                isStarred={starredItems.has(featuredItems[0].id)}
                onLike={(e) => handleLike(e, featuredItems[0].id)}
                onStar={(e) => handleStar(e, featuredItems[0].id)}
              />
            </div>

            {/* 侧边卡片 - 占 2 列 */}
            <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
              <FeaturedSideCard
                item={featuredItems[1]}
                index={1}
                isLiked={likedItems.has(featuredItems[1].id)}
                isStarred={starredItems.has(featuredItems[1].id)}
                onLike={(e) => handleLike(e, featuredItems[1].id)}
                onStar={(e) => handleStar(e, featuredItems[1].id)}
              />
              <FeaturedSideCard
                item={featuredItems[2]}
                index={2}
                isLiked={likedItems.has(featuredItems[2].id)}
                isStarred={starredItems.has(featuredItems[2].id)}
                onLike={(e) => handleLike(e, featuredItems[2].id)}
                onStar={(e) => handleStar(e, featuredItems[2].id)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
