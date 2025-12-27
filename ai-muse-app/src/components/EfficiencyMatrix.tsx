"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Palette,
  Code,
  PenTool,
  MessageSquare,
  Video,
  Music,
  FileText,
  BarChart3,
  Sparkles,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";

// AI Tool types and data
type AITool = {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: string;
  highlight?: boolean;
};

type Industry = {
  name: string;
  icon: React.ReactNode;
  color: string;
  tools: AITool[];
};

const industries: Industry[] = [
  {
    name: "Creative & Design",
    icon: <Palette className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
    tools: [
      {
        name: "Midjourney",
        description: "AI image generation with stunning artistic quality",
        url: "https://midjourney.com",
        icon: <Sparkles className="w-4 h-4" />,
        category: "Image",
        highlight: true,
      },
      {
        name: "DALL-E 3",
        description: "OpenAI's latest text-to-image model",
        url: "https://openai.com/dall-e-3",
        icon: <Palette className="w-4 h-4" />,
        category: "Image",
      },
      {
        name: "Figma AI",
        description: "AI-powered design tools and automation",
        url: "https://figma.com",
        icon: <PenTool className="w-4 h-4" />,
        category: "Design",
      },
    ],
  },
  {
    name: "Development",
    icon: <Code className="w-5 h-5" />,
    color: "from-sky-400 to-cyan-400",
    tools: [
      {
        name: "GitHub Copilot",
        description: "AI pair programmer that helps you write code faster",
        url: "https://github.com/features/copilot",
        icon: <Code className="w-4 h-4" />,
        category: "Code",
        highlight: true,
      },
      {
        name: "Claude",
        description: "Advanced reasoning and code analysis by Anthropic",
        url: "https://claude.ai",
        icon: <Cpu className="w-4 h-4" />,
        category: "Assistant",
        highlight: true,
      },
      {
        name: "Cursor",
        description: "AI-first code editor with native AI integration",
        url: "https://cursor.sh",
        icon: <Code className="w-4 h-4" />,
        category: "IDE",
      },
    ],
  },
  {
    name: "Content & Writing",
    icon: <FileText className="w-5 h-5" />,
    color: "from-violet-400 to-indigo-400",
    tools: [
      {
        name: "ChatGPT",
        description: "Conversational AI for writing, brainstorming, and more",
        url: "https://chat.openai.com",
        icon: <MessageSquare className="w-4 h-4" />,
        category: "Chat",
        highlight: true,
      },
      {
        name: "Jasper",
        description: "AI content platform for marketing teams",
        url: "https://jasper.ai",
        icon: <FileText className="w-4 h-4" />,
        category: "Marketing",
      },
      {
        name: "Copy.ai",
        description: "Generate copy for ads, emails, and social media",
        url: "https://copy.ai",
        icon: <PenTool className="w-4 h-4" />,
        category: "Copy",
      },
    ],
  },
  {
    name: "Video & Audio",
    icon: <Video className="w-5 h-5" />,
    color: "from-orange-500 to-amber-500",
    tools: [
      {
        name: "Runway",
        description: "AI video generation and editing platform",
        url: "https://runwayml.com",
        icon: <Video className="w-4 h-4" />,
        category: "Video",
        highlight: true,
      },
      {
        name: "ElevenLabs",
        description: "AI voice synthesis with stunning realism",
        url: "https://elevenlabs.io",
        icon: <Music className="w-4 h-4" />,
        category: "Audio",
        highlight: true,
      },
      {
        name: "Suno",
        description: "Generate original music with AI",
        url: "https://suno.ai",
        icon: <Music className="w-4 h-4" />,
        category: "Music",
      },
    ],
  },
  {
    name: "Data & Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-500",
    tools: [
      {
        name: "Julius AI",
        description: "Analyze data and create visualizations with AI",
        url: "https://julius.ai",
        icon: <BarChart3 className="w-4 h-4" />,
        category: "Analytics",
        highlight: true,
      },
      {
        name: "Perplexity",
        description: "AI-powered research and knowledge engine",
        url: "https://perplexity.ai",
        icon: <Cpu className="w-4 h-4" />,
        category: "Research",
        highlight: true,
      },
      {
        name: "Obviously AI",
        description: "No-code machine learning predictions",
        url: "https://obviously.ai",
        icon: <BarChart3 className="w-4 h-4" />,
        category: "ML",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function ToolCard({ tool, color }: { tool: AITool; color: string }) {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      whileHover={{
        scale: 1.02,
        rotateX: -2,
        rotateY: 2,
        transition: { duration: 0.2 },
      }}
      className="group relative block p-4 rounded-xl glass border border-glass-border hover:border-white/20 transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect on hover */}
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${color} text-white shadow-lg`}
            >
              {tool.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-semibold text-white group-hover:text-accent transition-colors">
                  {tool.name}
                </h4>
                {tool.highlight && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-neon-acid/20 text-neon-acid">
                    Hot
                  </span>
                )}
              </div>
              <span className="text-xs font-mono text-text-muted">
                {tool.category}
              </span>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
          {tool.description}
        </p>
      </div>
    </motion.a>
  );
}

function IndustrySection({ industry }: { industry: Industry }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${industry.color} text-white`}
        >
          {industry.icon}
        </div>
        <h3 className="font-heading text-lg font-semibold text-white">
          {industry.name}
        </h3>
      </div>

      {/* Tools Grid */}
      <motion.div
        variants={containerVariants}
        className="grid gap-3"
      >
        {industry.tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} color={industry.color} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function EfficiencyMatrix() {
  return (
    <section id="tools" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-accent/6 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-holographic mb-6">
              <Cpu className="w-4 h-4 text-accent" />
              <span className="font-mono text-sm text-text-secondary">
                Efficiency Matrix
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">AI Tools for </span>
              <span className="text-accent">
                Every Industry
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
              Curated collection of the most powerful AI tools, organized by
              industry. Find the perfect tool to supercharge your workflow.
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                variants={itemVariants}
                className={`glass-holographic rounded-2xl border border-glass-border p-6 ${
                  index === 0 || index === 3
                    ? "lg:col-span-1"
                    : ""
                }`}
              >
                <IndustrySection industry={industry} />
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/5 transition-colors font-heading font-medium text-text-secondary hover:text-white"
            >
              <span>View All AI Tools</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
