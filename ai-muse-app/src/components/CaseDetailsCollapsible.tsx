"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CaseDetailsCollapsibleProps {
  children: ReactNode;
  title: string;
  defaultCollapsed?: boolean;
}

export default function CaseDetailsCollapsible({
  children,
  title,
  defaultCollapsed = false,
}: CaseDetailsCollapsibleProps) {
  const [expanded, setExpanded] = useState(!defaultCollapsed);

  return (
    <div className="mt-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass-border hover:border-accent/50 transition-colors"
      >
        <span className="text-white font-heading text-sm font-semibold">
          {title}
        </span>
        <span className="text-text-muted text-xs">
          {expanded ? "收起" : "展开"}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-accent transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
