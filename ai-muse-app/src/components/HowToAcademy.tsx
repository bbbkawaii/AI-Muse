"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Code,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type Tutorial = {
  id: string;
  title: string;
  description: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  steps: TutorialStep[];
  color: string;
};

type TutorialStep = {
  title: string;
  content: string;
  code?: {
    language: string;
    snippet: string;
  };
  tip?: string;
};

const tutorials: Tutorial[] = [
  {
    id: "build-rag-pipeline",
    title: "Build a RAG Pipeline with LangChain",
    description:
      "Learn how to create a Retrieval-Augmented Generation pipeline that combines the power of large language models with your own data sources.",
    readTime: "15 min",
    difficulty: "Intermediate",
    tags: ["LangChain", "RAG", "Python", "Vector DB"],
    color: "from-neon-blue to-cyan-400",
    steps: [
      {
        title: "Set up your environment",
        content:
          "First, we'll install the necessary dependencies. LangChain provides a unified interface for working with various LLMs and vector stores.",
        code: {
          language: "bash",
          snippet: `# Install dependencies
pip install langchain langchain-openai chromadb

# Set your API key
export OPENAI_API_KEY="your-api-key-here"`,
        },
        tip: "Using a virtual environment is recommended to avoid dependency conflicts.",
      },
      {
        title: "Load and split documents",
        content:
          "Load your documents and split them into chunks. Proper chunking is crucial for effective retrieval.",
        code: {
          language: "python",
          snippet: `from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load documents
loader = TextLoader("your_document.txt")
documents = loader.load()

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
splits = text_splitter.split_documents(documents)`,
        },
      },
      {
        title: "Create vector store and retriever",
        content:
          "Embed the chunks and store them in a vector database for semantic search.",
        code: {
          language: "python",
          snippet: `from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(
    documents=splits,
    embedding=embeddings
)

# Create retriever
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 4}
)`,
        },
        tip: "Adjust 'k' value based on your context window size and desired coverage.",
      },
    ],
  },
  {
    id: "deploy-ai-agent",
    title: "Deploy an AI Agent to Production",
    description:
      "Step-by-step guide to deploying your AI agent with proper error handling, monitoring, and scaling considerations.",
    readTime: "20 min",
    difficulty: "Advanced",
    tags: ["Deployment", "Docker", "FastAPI", "Production"],
    color: "from-neon-purple to-violet-400",
    steps: [
      {
        title: "Structure your agent code",
        content:
          "Organize your agent code with proper separation of concerns. Use dependency injection for easy testing.",
        code: {
          language: "python",
          snippet: `# agent/core.py
from abc import ABC, abstractmethod
from typing import Any

class BaseAgent(ABC):
    def __init__(self, model: str, tools: list):
        self.model = model
        self.tools = tools

    @abstractmethod
    async def process(self, input: str) -> str:
        pass

    async def run(self, query: str) -> dict[str, Any]:
        try:
            result = await self.process(query)
            return {"status": "success", "result": result}
        except Exception as e:
            return {"status": "error", "error": str(e)}`,
        },
      },
      {
        title: "Create FastAPI wrapper",
        content: "Wrap your agent with a FastAPI application for HTTP access.",
        code: {
          language: "python",
          snippet: `# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="AI Agent API")

class QueryRequest(BaseModel):
    query: str
    context: dict = {}

@app.post("/agent/query")
async def query_agent(request: QueryRequest):
    agent = get_agent()  # Singleton or pool
    result = await agent.run(request.query)

    if result["status"] == "error":
        raise HTTPException(500, result["error"])

    return result`,
        },
        tip: "Use connection pooling and caching for better performance at scale.",
      },
      {
        title: "Dockerize and deploy",
        content: "Package your application in a container for consistent deployments.",
        code: {
          language: "dockerfile",
          snippet: `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        },
      },
    ],
  },
  {
    id: "prompt-engineering-101",
    title: "Prompt Engineering Fundamentals",
    description:
      "Master the art of crafting effective prompts. Learn techniques that make AI models produce better, more consistent outputs.",
    readTime: "10 min",
    difficulty: "Beginner",
    tags: ["Prompting", "ChatGPT", "Claude", "Best Practices"],
    color: "from-amber-500 to-orange-400",
    steps: [
      {
        title: "Use clear, specific instructions",
        content:
          "Be explicit about what you want. Vague prompts lead to vague outputs.",
        code: {
          language: "markdown",
          snippet: `# Bad prompt:
"Write about dogs"

# Good prompt:
"Write a 200-word informative paragraph about
Golden Retrievers, covering their temperament,
exercise needs, and suitability as family pets.
Use a friendly, accessible tone."`,
        },
        tip: "Think of prompting like giving instructions to a new employee - be clear and specific.",
      },
      {
        title: "Provide examples (Few-shot learning)",
        content:
          "Show the model what you want by providing examples of the expected input and output format.",
        code: {
          language: "markdown",
          snippet: `Classify the sentiment of these reviews:

Review: "This product exceeded all expectations!"
Sentiment: Positive

Review: "Terrible quality, broke after one day"
Sentiment: Negative

Review: "It works, nothing special though"
Sentiment: Neutral

Review: "Best purchase I've made this year!"
Sentiment:`,
        },
      },
      {
        title: "Use structured output formats",
        content:
          "Request specific output formats like JSON or markdown for consistent, parseable responses.",
        code: {
          language: "markdown",
          snippet: `Analyze this customer feedback and respond in JSON:

Feedback: "Love the app but crashes sometimes"

Respond with this exact structure:
{
  "sentiment": "positive|negative|mixed",
  "main_topic": "string",
  "issues": ["array of issues"],
  "priority": "low|medium|high"
}`,
        },
        tip: "Structured outputs are essential when chaining AI calls or integrating with other systems.",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

function DifficultyBadge({ level }: { level: Tutorial["difficulty"] }) {
  const colors = {
    Beginner: "bg-emerald-500/20 text-emerald-400",
    Intermediate: "bg-amber-500/20 text-amber-400",
    Advanced: "bg-rose-500/20 text-rose-400",
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-mono ${colors[level]}`}>
      {level}
    </span>
  );
}

function CodeBlock({
  code,
}: {
  code: { language: string; snippet: string };
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl bg-void/80 border border-glass-border overflow-hidden mt-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-glass-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-xs font-mono text-text-muted">{code.language}</span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-white transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-neon-acid" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono text-text-secondary overflow-x-auto leading-relaxed">
        <code>{code.snippet}</code>
      </pre>
    </div>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <motion.div
      variants={cardVariants}
      layout
      className="glass-holographic rounded-2xl border border-glass-border overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tutorial.color} text-white shadow-lg`}
            >
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {tutorial.title}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-text-muted">
                  <Clock className="w-3.5 h-3.5" />
                  {tutorial.readTime}
                </span>
                <DifficultyBadge level={tutorial.difficulty} />
              </div>
            </div>
          </div>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {tutorial.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-glass-border text-xs font-mono text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-glass-border hover:border-white/20 transition-colors"
        >
          <span className="font-heading font-medium text-sm text-white">
            {isExpanded ? "Collapse Tutorial" : "Start Learning"}
          </span>
          <ChevronRight
            className={`w-4 h-4 text-neon-cyan transition-transform duration-300 ${
              isExpanded ? "rotate-90" : ""
            }`}
          />
        </motion.button>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-glass-border"
          >
            {/* Step navigation */}
            <div className="px-6 py-4 bg-white/3 border-b border-glass-border">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {tutorial.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      currentStep === index
                        ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white"
                        : "bg-white/5 text-text-secondary hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20 text-xs font-mono">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{step.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-heading text-lg font-semibold text-white mb-3">
                    {tutorial.steps[currentStep].title}
                  </h4>
                  <p className="text-text-secondary leading-relaxed">
                    {tutorial.steps[currentStep].content}
                  </p>

                  {tutorial.steps[currentStep].code && (
                    <CodeBlock code={tutorial.steps[currentStep].code} />
                  )}

                  {tutorial.steps[currentStep].tip && (
                    <div className="flex items-start gap-3 mt-4 p-4 rounded-xl bg-neon-acid/10 border border-neon-acid/20">
                      <Lightbulb className="w-5 h-5 text-neon-acid flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neon-acid/90">
                        {tutorial.steps[currentStep].tip}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-glass-border">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Previous</span>
                </button>
                <span className="text-xs font-mono text-text-muted">
                  {currentStep + 1} / {tutorial.steps.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentStep(
                      Math.min(tutorial.steps.length - 1, currentStep + 1)
                    )
                  }
                  disabled={currentStep === tutorial.steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HowToAcademy() {
  return (
    <section id="learn" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[200px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] rounded-full bg-neon-purple/5 blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-holographic mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-sm text-text-secondary">
                How-To Academy
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="text-white">Learn </span>
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent animate-gradient">
                AI Development
              </span>
            </h2>

            <p className="max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed">
              Curated tutorials and guides to help you build with AI. From
              beginner basics to advanced techniques.
            </p>
          </motion.div>

          {/* Tutorials Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {tutorials.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
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
              <Code className="w-4 h-4" />
              <span>Browse All Tutorials</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
