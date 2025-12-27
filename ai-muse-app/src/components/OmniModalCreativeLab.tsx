"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, Star, ArrowUpRight, Play, Pause, Sparkles, Zap, Wand2 } from "lucide-react";

// Generate fixed random number using id
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

// Featured content data
const featuredItems = [
  {
    id: "soul-nebula",
    type: "case" as const,
    title: "Soul Nebula",
    subtitle: "Emotion Card Nebula",
    description: "Immersive 3D emotion card nebula experience with hundreds of floating cards, gesture interaction triggers particle explosion effects",
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
    title: "AI Soft ASMR",
    subtitle: "Glass Fruit Cutting",
    description: "Therapeutic AI-generated video, glass texture fruit cutting ASMR experience",
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
    title: "Kill That American",
    subtitle: "AI Cover",
    description: "AI cover of 'Kill That Shijiazhuang Guy', cross-cultural interpretation of rock spirit",
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

// Initialize stats data
const initialStats = featuredItems.reduce((acc, item) => {
  acc[item.id] = generateStats(item.id);
  return acc;
}, {} as Record<string, { likes: number; stars: number }>);

// 3D tilt card component
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

// Main card (large size)
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
        {/* Background gradient glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />

        {/* Glass background */}
        <div className="absolute inset-0 bg-void-elevated/80 backdrop-blur-xl" />

        {/* Grid decoration */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

        {/* Glowing border effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 60px ${item.glowColor}, 0 0 40px ${item.glowColor}`,
          }}
        />

        <Link href={item.href} className="block relative h-full p-6 md:p-8">
          {/* Top label */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <IconComponent className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            {/* Stats */}
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

          {/* Image area */}
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-elevated via-transparent to-transparent" />

            {/* Floating arrow */}
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

          {/* Content */}
          <div style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
              {item.title}
            </h3>
            <p className="font-heading text-lg text-accent mb-3">{item.subtitle}</p>
            <p className="text-text-secondary leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Tags */}
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

// Card component
function FeaturedSideCard({
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative h-full rounded-2xl overflow-hidden"
      >
        {/* Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
        />
        <div className="absolute inset-0 bg-void-elevated/90 backdrop-blur-xl" />

        {/* Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-500" />

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: `inset 0 0 40px ${item.glowColor}, 0 0 30px ${item.glowColor}`,
          }}
        />

        <Link href={item.href} className="block relative h-full p-5">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-elevated/80 via-transparent to-transparent" />

            {/* Play button (music only) */}
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

            {/* Progress bar */}
            {item.type === "music" && (isPlaying || progress > 0) && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <div
                  className="h-full bg-accent transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Type label */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-void/60 backdrop-blur-sm border border-white/10">
              <IconComponent className="w-3 h-3 text-accent" />
              <span className="font-mono text-[10px] text-white/80 uppercase">
                {item.category}
              </span>
            </div>
          </div>

          {/* Content */}
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

            {/* Interaction stats */}
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

        {/* Hidden audio element */}
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
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse, rgba(0, 212, 255, 0.15), transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Decorative line */}
        <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Title area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* Small label */}
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

            {/* Main title */}
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              <span className="block">Omni-modal AI</span>
              <span className="block text-accent">Creative Lab</span>
            </h2>

            {/* Subtitle */}
            <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
              Explore the infinite possibilities of cross-modal AI creation
              <span className="mx-2 text-accent">|</span>
              3D Interactive / Video Generation / Music Creation
            </p>
          </motion.div>

          {/* Three equal-width columns layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {featuredItems.map((item, index) => (
              <FeaturedSideCard
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
