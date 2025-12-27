"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Download,
  FileJson,
  Zap,
  MessageSquare,
  Search,
  Database,
  Globe,
  Workflow,
  ChevronRight,
  Languages,
  BarChart3,
  Code,
  Plane,
  Sparkles,
  BookOpen,
  PenTool,
  ChevronDown,
  Github,
} from "lucide-react";
import { useState } from "react";

type WorkflowTemplate = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  features: string[];
  dslFile: string;
  source?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

// 精选工作流 - 首页展示
const featuredWorkflows: WorkflowTemplate[] = [
  {
    id: "deep-researcher",
    name: "Deep Researcher",
    description: "深度研究工作流，自动搜索、分析和总结",
    longDescription:
      "Deep Researcher 工作流复现方案，能够自动进行多轮搜索、信息提取和综合分析，生成深度研究报告。",
    icon: <Search className="w-6 h-6" />,
    category: "研究",
    color: "from-sky-400 to-cyan-400",
    features: ["多轮搜索", "信息综合", "自动总结", "深度分析"],
    dslFile: "Deep Researcher On Dify .yml",
    source: "AdamPlatin123",
    difficulty: "Advanced",
  },
  {
    id: "artifact",
    name: "Artifact",
    description: "类似 Claude Artifacts，渲染 HTML 和 Canvas",
    longDescription:
      "借鉴 Anthropic 的 Artifacts 功能，可以渲染 LLM 生成的 HTML 代码和 Canvas，实现可视化交互。需要搭配 dify-plugin-artifacts 插件使用。",
    icon: <Sparkles className="w-6 h-6" />,
    category: "工具",
    color: "from-violet-400 to-indigo-400",
    features: ["HTML 渲染", "Canvas 支持", "可视化交互", "插件扩展"],
    dslFile: "Artifact.yml",
    source: "svcvit",
    difficulty: "Intermediate",
  },
  {
    id: "search-master",
    name: "搜索大师",
    description: "SearXNG + Jina 智能搜索引擎",
    longDescription:
      "通过 SearXNG 进行搜索，再通过 Jina 获取搜索内容，实现智能搜索和内容提取。",
    icon: <Globe className="w-6 h-6" />,
    category: "工具",
    color: "from-emerald-500 to-teal-400",
    features: ["SearXNG 搜索", "Jina 内容提取", "智能问答", "多源整合"],
    dslFile: "搜索大师.yml",
    source: "Winson-030",
    difficulty: "Intermediate",
  },
  {
    id: "baoyu-translation",
    name: "宝玉英译中优化版",
    description: "科技文章翻译优化，直译→反思→意译",
    longDescription:
      "宝玉的科技文章翻译优化版本，主要优化了提示词和 XML 标签，采用直译→反思→意译三步流程。",
    icon: <Languages className="w-6 h-6" />,
    category: "翻译",
    color: "from-orange-500 to-amber-400",
    features: ["三步翻译", "科技文章优化", "XML 标签", "高质量输出"],
    dslFile: "宝玉的英译中优化版.yml",
    source: "baoyu.io",
    difficulty: "Beginner",
  },
  {
    id: "travel-demo",
    name: "旅行 Demo",
    description: "Agent 信息收集与 Tool 调用示例",
    longDescription:
      "使用 Dify 1.0 的 Agent 节点，演示旅行信息收集、Tool 调用、对话历史上下文存储。将对话消息存入对话变量，纳入 Agent 的思考上下文。",
    icon: <Plane className="w-6 h-6" />,
    category: "Agent",
    color: "from-pink-500 to-rose-400",
    features: ["信息收集", "Tool 调用", "对话变量", "上下文存储"],
    dslFile: "旅行Demo.yml",
    source: "svcvit",
    difficulty: "Intermediate",
  },
  {
    id: "agent-tool-call",
    name: "Agent 工具调用",
    description: "使用 FC 调用不同工具进行回复",
    longDescription:
      "使用 Dify 1.0 的 Agent 节点，通过 Function Calling 调用不同的工具，根据用户需求进行智能回复。",
    icon: <Bot className="w-6 h-6" />,
    category: "Agent",
    color: "from-indigo-500 to-blue-400",
    features: ["Function Calling", "多工具调用", "智能路由", "Agent 1.0"],
    dslFile: "Agent工具调用.yml",
    source: "svcvit",
    difficulty: "Intermediate",
  },
];

// 更多工作流 - 展开后显示
const moreWorkflows: WorkflowTemplate[] = [
  {
    id: "chart-demo",
    name: "Chart 图表渲染",
    description: "通过回复内容渲染 ECharts 图表",
    longDescription:
      "通过回复内容渲染 Charts 的图表内容，可以根据 SQL 查询数据，拼接成需要的图表格式。",
    icon: <BarChart3 className="w-6 h-6" />,
    category: "可视化",
    color: "from-cyan-500 to-blue-400",
    features: ["ECharts 渲染", "数据可视化", "SQL 查询", "动态图表"],
    dslFile: "chart_demo.yml",
    source: "svcvit",
    difficulty: "Intermediate",
  },
  {
    id: "python-coding",
    name: "Python Coding Prompt",
    description: "通过对话生成 Python 代码",
    longDescription:
      "通过聊天对话方式生成 Python 代码，基于 Claude Sonnet 3.5 的 Coding System Prompt。",
    icon: <Code className="w-6 h-6" />,
    category: "代码",
    color: "from-green-500 to-emerald-400",
    features: ["代码生成", "Python 专精", "对话式开发", "最佳实践"],
    dslFile: "Python Coding Prompt.yml",
    source: "Reddit",
    difficulty: "Beginner",
  },
  {
    id: "zh-to-en",
    name: "中译英",
    description: "直译→反思→意译三步翻译",
    longDescription:
      "通过宝玉的 Prompt，直译→反思→意译，将中文翻译成高质量的英文。",
    icon: <Languages className="w-6 h-6" />,
    category: "翻译",
    color: "from-blue-500 to-indigo-400",
    features: ["三步翻译", "高质量输出", "反思优化", "中译英"],
    dslFile: "中译英.yml",
    difficulty: "Beginner",
  },
  {
    id: "full-book-translation",
    name: "全书翻译",
    description: "切分长文本，迭代器内翻译",
    longDescription:
      "DIFY 官方示例，切分长文本，在迭代器内翻译，适合翻译整本书籍或长篇文档。",
    icon: <BookOpen className="w-6 h-6" />,
    category: "翻译",
    color: "from-purple-500 to-violet-400",
    features: ["长文本切分", "迭代翻译", "官方示例", "书籍翻译"],
    dslFile: "全书翻译.yml",
    source: "Dify 官方",
    difficulty: "Intermediate",
  },
  {
    id: "title-creator",
    name: "标题党创作",
    description: "爆款网文标题生成器",
    longDescription:
      "一位爆款网文作家，专门生成吸引眼球的标题，适合自媒体运营。",
    icon: <PenTool className="w-6 h-6" />,
    category: "创作",
    color: "from-red-500 to-orange-400",
    features: ["爆款标题", "自媒体运营", "创意生成", "吸引力优化"],
    dslFile: "标题党创作.yml",
    source: "ghostviper",
    difficulty: "Beginner",
  },
  {
    id: "intent-reply",
    name: "意图识别回复",
    description: "根据用户意图选择不同回复路径",
    longDescription:
      "根据用户的聊天内容进行意图判定，根据意图选择不同的工作流路径进行回复，再风格化聊天机器人话术。",
    icon: <MessageSquare className="w-6 h-6" />,
    category: "聊天机器人",
    color: "from-teal-500 to-cyan-400",
    features: ["意图识别", "路径选择", "风格化回复", "智能路由"],
    dslFile: "根据用户的意图进行回复.yml",
    difficulty: "Intermediate",
  },
  {
    id: "matplotlib",
    name: "Matplotlib 绘图",
    description: "使用 matplotlib 生成图表并渲染",
    longDescription:
      "使用 matplotlib 画图，将图片输出为 base64，再通过回复渲染图片。需要使用 dify-sandbox-py。",
    icon: <BarChart3 className="w-6 h-6" />,
    category: "可视化",
    color: "from-yellow-500 to-orange-400",
    features: ["matplotlib", "base64 输出", "图表渲染", "sandbox"],
    dslFile: "matplotlib.yml",
    source: "svcvit",
    difficulty: "Advanced",
  },
  {
    id: "llm2o1",
    name: "LLM to O1",
    description: "任务拆解→步骤执行→归纳总结",
    longDescription:
      "任务拆解→提取步骤→迭代步骤执行→归纳总结→输出结果，模拟 O1 的思考过程。",
    icon: <Workflow className="w-6 h-6" />,
    category: "工具",
    color: "from-slate-500 to-gray-400",
    features: ["任务拆解", "步骤执行", "迭代处理", "O1 模拟"],
    dslFile: "llm2o1.cn.yml",
    source: "okooo5km",
    difficulty: "Advanced",
  },
  {
    id: "json-repair",
    name: "JSON 修复",
    description: "修复 LLM 输出的不规范 JSON",
    longDescription:
      "大模型输出的 JSON 格式不标准，少个引号，多个括号，通过这个流程修复为可解析的 JSON。",
    icon: <FileJson className="w-6 h-6" />,
    category: "工具",
    color: "from-amber-500 to-yellow-400",
    features: ["JSON 修复", "格式校验", "自动修正", "容错处理"],
    dslFile: "json-repair.yml",
    source: "svcvit",
    difficulty: "Beginner",
  },
  {
    id: "seo-slug",
    name: "SEO Slug Generator",
    description: "为博文生成 URL slug",
    longDescription:
      "给自己的博文生成 URL slug，参考来源于宝玉的分享，适合博客 SEO 优化。",
    icon: <Globe className="w-6 h-6" />,
    category: "工具",
    color: "from-lime-500 to-green-400",
    features: ["SEO 优化", "URL 生成", "博客工具", "自动化"],
    dslFile: "SEO Slug Generator.yml",
    source: "dotey",
    difficulty: "Beginner",
  },
  {
    id: "spring-couplet",
    name: "春联生成器",
    description: "AI 生成春联，支持自定义字体",
    longDescription:
      "春联生成工具，注意字体需要电脑有，可以按需修改字体。适合春节期间使用。",
    icon: <Sparkles className="w-6 h-6" />,
    category: "创意",
    color: "from-red-600 to-red-400",
    features: ["春联生成", "自定义字体", "节日应用", "创意输出"],
    dslFile: "春联生成器.yml",
    source: "Junjie.M",
    difficulty: "Beginner",
  },
  {
    id: "dify-course",
    name: "自动化教程生成",
    description: "自动生成全套教程内容",
    longDescription:
      "自动化生成全套教程，可以根据主题自动生成完整的教程内容和结构。",
    icon: <BookOpen className="w-6 h-6" />,
    category: "创作",
    color: "from-indigo-600 to-purple-400",
    features: ["教程生成", "自动化", "内容创作", "结构化输出"],
    dslFile: "dify_course_demo.yml",
    source: "pekingmuge",
    difficulty: "Intermediate",
  },
  {
    id: "memory-test",
    name: "记忆测试",
    description: "短期记忆 + CoT 思维链示例",
    longDescription:
      "添加短期记忆，CoT 思维链的示例，自动问答机器人也可以主动触达，根据上下文选择最佳回复。",
    icon: <Database className="w-6 h-6" />,
    category: "聊天机器人",
    color: "from-fuchsia-500 to-pink-400",
    features: ["短期记忆", "CoT 思维链", "主动触达", "上下文理解"],
    dslFile: "记忆测试.yml",
    source: "svcvit",
    difficulty: "Advanced",
  },
  {
    id: "thinking-assistant",
    name: "思考助手",
    description: "引导式思考和问题分析",
    longDescription:
      "帮助用户进行深度思考和问题分析的助手工作流。",
    icon: <Sparkles className="w-6 h-6" />,
    category: "工具",
    color: "from-violet-500 to-purple-400",
    features: ["引导思考", "问题分析", "逻辑推理", "决策辅助"],
    dslFile: "思考助手.yml",
    difficulty: "Beginner",
  },
  {
    id: "claude3-code-translation",
    name: "代码翻译",
    description: "不同编程语言之间的代码转换",
    longDescription:
      "不同代码种类之间的翻译工作流，支持多种编程语言互转。",
    icon: <Code className="w-6 h-6" />,
    category: "代码",
    color: "from-emerald-500 to-green-400",
    features: ["语言转换", "多语言支持", "代码重构", "Claude3"],
    dslFile: "Claude3 Code Translation.yml",
    source: "aws-samples",
    difficulty: "Intermediate",
  },
  {
    id: "mcp-amap",
    name: "MCP 高德地图",
    description: "MCP Agent 策略调用高德地图服务",
    longDescription:
      "使用 MCP Agent 策略进行 MCP 工具的调用示例，MCP 使用高德地图提供的在线服务。",
    icon: <Globe className="w-6 h-6" />,
    category: "Agent",
    color: "from-blue-600 to-cyan-400",
    features: ["MCP 协议", "高德地图", "地理服务", "Agent 策略"],
    dslFile: "MCP-amap.yml",
    source: "svcvit",
    difficulty: "Advanced",
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

function DifficultyBadge({ level }: { level: WorkflowTemplate["difficulty"] }) {
  const colors = {
    Beginner: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Intermediate: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Advanced: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  };

  const labels = {
    Beginner: "入门",
    Intermediate: "进阶",
    Advanced: "高级",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-mono border ${colors[level]}`}
    >
      {labels[level]}
    </span>
  );
}

function WorkflowCard({ workflow }: { workflow: WorkflowTemplate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const dslBaseUrl = "https://raw.githubusercontent.com/svcvit/Awesome-Dify-Workflow/main/DSL/";
  const downloadUrl = `${dslBaseUrl}${encodeURIComponent(workflow.dslFile)}`;

  const handleDownload = () => {
    window.open(downloadUrl, "_blank");
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      className="group relative glass-holographic rounded-2xl border border-glass-border overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${workflow.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Card content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${workflow.color} text-white shadow-lg`}
            >
              {workflow.icon}
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white group-hover:text-accent transition-colors">
                {workflow.name}
              </h3>
              <p className="text-sm text-text-muted font-mono">{workflow.category}</p>
            </div>
          </div>
          <DifficultyBadge level={workflow.difficulty} />
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {isExpanded ? workflow.longDescription : workflow.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-5">
          {workflow.features.slice(0, isExpanded ? undefined : 2).map((feature) => (
            <span
              key={feature}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-xs text-text-secondary"
            >
              {feature}
            </span>
          ))}
          {!isExpanded && workflow.features.length > 2 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-xs text-accent hover:bg-white/10 transition-colors"
            >
              +{workflow.features.length - 2}
            </button>
          )}
        </div>

        {/* Source info when expanded */}
        {isExpanded && workflow.source && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 flex items-center gap-2 text-xs text-text-muted"
          >
            <span>来源:</span>
            <span className="text-accent">{workflow.source}</span>
          </motion.div>
        )}

        {/* DSL file info when expanded */}
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
                    {workflow.dslFile}
                  </span>
                </div>
              </div>
              <div className="p-4 text-xs text-text-secondary">
                <p>将此 DSL 文件导入 Dify 即可使用。</p>
                <p className="mt-2 text-text-muted">需要 Dify 0.13.0 及以上版本。</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-void font-heading font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            <span>下载 DSL</span>
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
  const [showAll, setShowAll] = useState(false);
  const allWorkflows = [...featuredWorkflows, ...moreWorkflows];
  const displayedWorkflows = showAll ? allWorkflows : featuredWorkflows;

  return (
    <section id="agents" className="relative py-12 overflow-hidden">
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
                Dify Workflow
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">开箱即用的 </span>
              <span className="text-accent">
                工作流模板
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed mb-8">
              精选 Dify 工作流模板，涵盖翻译、搜索、Agent、代码生成等多种场景。
              下载 DSL 文件导入 Dify 即可使用。
            </p>

            {/* Quick actions */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="https://github.com/svcvit/Awesome-Dify-Workflow"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="font-heading font-medium text-sm text-text-secondary">
                  GitHub 仓库
                </span>
              </motion.a>
              <motion.a
                href="https://dify101.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
              >
                <Zap className="w-4 h-4 text-neon-acid" />
                <span className="font-heading font-medium text-sm text-text-secondary">
                  Dify 学习教程
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Workflow Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </motion.div>

          {/* Show More / Show Less Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-glass-border hover:bg-white/5 transition-colors"
            >
              <span className="font-heading font-medium text-text-secondary">
                {showAll ? "收起" : `查看全部 ${allWorkflows.length} 个工作流`}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-accent transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </motion.div>

          {/* Bottom note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-text-muted">
              所有工作流来自{" "}
              <a
                href="https://github.com/svcvit/Awesome-Dify-Workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                Awesome-Dify-Workflow
              </a>
              {" "}开源项目，需要 Dify 0.13.0+ 版本。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
