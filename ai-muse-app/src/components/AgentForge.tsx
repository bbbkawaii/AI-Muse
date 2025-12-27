"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Download,
  FileJson,
  Zap,
  MessageSquare,
  Search,
  FileEdit,
  Database,
  Globe,
  Workflow,
  ChevronRight,
  Github,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

type AgentTemplate = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  features: string[];
  configPreview: string;
  downloadUrl: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const agentTemplates: AgentTemplate[] = [
  {
    id: "research-agent",
    name: "Research Agent",
    description: "Autonomous web research and data synthesis",
    longDescription:
      "A powerful agent that can browse the web, extract information from multiple sources, and synthesize findings into comprehensive reports.",
    icon: <Search className="w-6 h-6" />,
    category: "Research",
    color: "from-sky-400 to-cyan-400",
    features: [
      "Multi-source web scraping",
      "Automatic fact verification",
      "Citation generation",
      "Summary synthesis",
    ],
    configPreview: `{
  "name": "research-agent",
  "model": "claude-3-sonnet",
  "tools": ["web_search", "scraper", "summarizer"],
  "memory": "long_term",
  "max_iterations": 10
}`,
    downloadUrl: "/agents/research-agent.json",
    difficulty: "Intermediate",
  },
  {
    id: "code-reviewer",
    name: "Code Review Agent",
    description: "Automated code analysis and suggestions",
    longDescription:
      "An intelligent agent that reviews your code for bugs, security vulnerabilities, performance issues, and suggests improvements based on best practices.",
    icon: <FileEdit className="w-6 h-6" />,
    category: "Development",
    color: "from-violet-400 to-indigo-400",
    features: [
      "Static code analysis",
      "Security vulnerability detection",
      "Performance optimization tips",
      "Style guide enforcement",
    ],
    configPreview: `{
  "name": "code-review-agent",
  "model": "claude-3-opus",
  "tools": ["code_analyzer", "linter", "security_scanner"],
  "languages": ["python", "javascript", "typescript"],
  "strict_mode": true
}`,
    downloadUrl: "/agents/code-reviewer.json",
    difficulty: "Advanced",
  },
  {
    id: "data-pipeline",
    name: "Data Pipeline Agent",
    description: "ETL automation with intelligent data handling",
    longDescription:
      "Automates data extraction, transformation, and loading processes with smart error handling and data quality checks.",
    icon: <Database className="w-6 h-6" />,
    category: "Data",
    color: "from-emerald-500 to-teal-400",
    features: [
      "Auto schema detection",
      "Data validation rules",
      "Error recovery",
      "Incremental updates",
    ],
    configPreview: `{
  "name": "data-pipeline-agent",
  "model": "claude-3-haiku",
  "sources": ["postgres", "s3", "api"],
  "destinations": ["snowflake", "bigquery"],
  "schedule": "0 */6 * * *"
}`,
    downloadUrl: "/agents/data-pipeline.json",
    difficulty: "Intermediate",
  },
  {
    id: "customer-support",
    name: "Support Agent",
    description: "Intelligent customer service automation",
    longDescription:
      "Handle customer inquiries with context-aware responses, escalation logic, and seamless handoff to human agents when needed.",
    icon: <MessageSquare className="w-6 h-6" />,
    category: "Support",
    color: "from-orange-500 to-amber-400",
    features: [
      "Multi-language support",
      "Sentiment analysis",
      "Smart escalation",
      "Knowledge base integration",
    ],
    configPreview: `{
  "name": "support-agent",
  "model": "claude-3-sonnet",
  "persona": "helpful_friendly",
  "escalation_threshold": 0.3,
  "languages": ["en", "zh", "ja", "es"]
}`,
    downloadUrl: "/agents/customer-support.json",
    difficulty: "Beginner",
  },
  {
    id: "workflow-orchestrator",
    name: "n8n Workflow Agent",
    description: "Custom n8n workflow automation",
    longDescription:
      "Build complex automation workflows that connect multiple services, handle conditional logic, and process data with AI-powered decision making.",
    icon: <Workflow className="w-6 h-6" />,
    category: "Automation",
    color: "from-pink-500 to-rose-400",
    features: [
      "Visual workflow builder",
      "500+ integrations",
      "Conditional branching",
      "Error handling",
    ],
    configPreview: `{
  "name": "workflow-orchestrator",
  "platform": "n8n",
  "triggers": ["webhook", "schedule", "event"],
  "nodes": ["ai_processor", "api_call", "data_transform"],
  "retry_policy": "exponential"
}`,
    downloadUrl: "/agents/workflow-orchestrator.json",
    difficulty: "Advanced",
  },
  {
    id: "content-creator",
    name: "Content Creator Agent",
    description: "Multi-format content generation pipeline",
    longDescription:
      "Generate blog posts, social media content, newsletters, and more with consistent brand voice and SEO optimization.",
    icon: <Globe className="w-6 h-6" />,
    category: "Marketing",
    color: "from-indigo-500 to-blue-400",
    features: [
      "SEO optimization",
      "Brand voice consistency",
      "Multi-platform formats",
      "A/B testing variants",
    ],
    configPreview: `{
  "name": "content-creator-agent",
  "model": "claude-3-opus",
  "brand_voice": "professional_friendly",
  "seo_keywords": [],
  "output_formats": ["blog", "twitter", "linkedin"]
}`,
    downloadUrl: "/agents/content-creator.json",
    difficulty: "Beginner",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

function DifficultyBadge({ level }: { level: AgentTemplate["difficulty"] }) {
  const colors = {
    Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-mono border ${colors[level]}`}
    >
      {level}
    </span>
  );
}

function AgentCard({ agent }: { agent: AgentTemplate }) {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyConfig = () => {
    navigator.clipboard.writeText(agent.configPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative glass-holographic rounded-2xl border border-glass-border overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Card content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-lg`}
            >
              {agent.icon}
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white group-hover:text-accent transition-colors">
                {agent.name}
              </h3>
              <p className="text-sm text-text-muted font-mono">{agent.category}</p>
            </div>
          </div>
          <DifficultyBadge level={agent.difficulty} />
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {isExpanded ? agent.longDescription : agent.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          {agent.features.slice(0, isExpanded ? undefined : 2).map((feature) => (
            <span
              key={feature}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-xs text-text-secondary"
            >
              {feature}
            </span>
          ))}
          {!isExpanded && agent.features.length > 2 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-xs text-accent hover:bg-white/10 transition-colors"
            >
              +{agent.features.length - 2} more
            </button>
          )}
        </div>

        {/* Config Preview */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-5"
          >
            <div className="relative rounded-xl bg-void/60 border border-glass-border overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-glass-border">
                <div className="flex items-center gap-2">
                  <FileJson className="w-4 h-4 text-text-muted" />
                  <span className="text-xs font-mono text-text-muted">
                    config.json
                  </span>
                </div>
                <button
                  onClick={copyConfig}
                  className="flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-neon-acid" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-text-secondary overflow-x-auto">
                <code>{agent.configPreview}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-void font-heading font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2.5 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
          >
            <ChevronRight
              className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentForge() {
  return (
    <section id="agents" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/4 blur-[180px] pointer-events-none" />

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
              <Bot className="w-4 h-4 text-accent" />
              <span className="font-mono text-sm text-text-secondary">
                Agent Forge
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Pre-built </span>
              <span className="text-accent">
                Agent Templates
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed mb-8">
              Download ready-to-use AI agent configurations. Each template
              includes documentation, config files, and deployment guides.
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="font-heading font-medium text-sm text-text-secondary">
                  View on GitHub
                </span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
              >
                <Zap className="w-4 h-4 text-neon-acid" />
                <span className="font-heading font-medium text-sm text-text-secondary">
                  Quick Start Guide
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Agent Cards Grid - Bento style */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {agentTemplates.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </motion.div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-text-muted">
              All templates are open-source and MIT licensed.{" "}
              <a
                href="#"
                className="text-accent hover:underline underline-offset-4"
              >
                Contribute your own template
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
