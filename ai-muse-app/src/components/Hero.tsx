"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Zap } from "lucide-react";

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="explore"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Floating orbs decoration */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px] pointer-events-none"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "2s" }}
        className="absolute bottom-1/4 right-[15%] w-80 h-80 rounded-full bg-neon-blue/15 blur-[120px] pointer-events-none"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "4s" }}
        className="absolute top-1/2 right-[5%] w-48 h-48 rounded-full bg-neon-cyan/10 blur-[80px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-holographic mb-8"
          >
            <Zap className="w-4 h-4 text-neon-acid" />
            <span className="font-mono text-sm text-text-secondary">
              AI Inspiration Space
            </span>
            <div className="w-2 h-2 rounded-full bg-neon-acid animate-pulse" />
          </motion.div>

          {/* Main Heading - Massive typography */}
          <motion.h1 variants={itemVariants} className="mb-6">
            <span className="block text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white">
              Where AI
            </span>
            <span className="block text-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent animate-gradient">
                Creativity
              </span>
            </span>
            <span className="block text-display-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text-secondary mt-2">
              Becomes Accessible
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-text-secondary font-body leading-relaxed mb-10"
          >
            Discover, experience, and share AI-generated creative works.
            <span className="text-white"> Explore interactive demos</span>,
            learn from the prompts, and unlock your creative potential.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA with glowing border */}
            <motion.a
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#gallery"
              className="group relative px-8 py-4 rounded-2xl font-heading font-semibold text-lg overflow-hidden"
            >
              {/* Glow effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan opacity-100 group-hover:opacity-90 transition-opacity" />

              {/* Animated border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity animate-pulse-glow" />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 text-white">
                Explore Gallery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 px-6 py-4 rounded-2xl glass hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/15 transition-colors">
                <Play className="w-4 h-4 text-white ml-0.5" />
              </div>
              <span className="font-heading font-medium text-text-secondary group-hover:text-white transition-colors">
                Watch Demo
              </span>
            </motion.button>
          </motion.div>

          {/* Stats or social proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            {[
              { value: "50+", label: "Creative Demos" },
              { value: "100+", label: "AI Prompts" },
              { value: "Open", label: "Source" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-heading font-bold text-3xl md:text-4xl bg-gradient-to-r from-white to-text-secondary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="font-mono text-sm text-text-muted mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-text-muted">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-text-muted/30 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 rounded-full bg-text-muted/50"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </section>
  );
}
