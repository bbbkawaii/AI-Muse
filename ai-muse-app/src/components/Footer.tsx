"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const footerLinks = {
  product: [
    { label: "Gallery", href: "/#gallery" },
    { label: "AI Tools", href: "/#tools" },
    { label: "Agents", href: "/#agents" },
    { label: "Tutorials", href: "/#learn" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About", href: "/#about" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: <Mail className="w-5 h-5" />, href: "mailto:hello@ai-muse.dev", label: "Email" },
];

// Marquee text
const marqueeText = "LET'S BUILD THE FUTURE TOGETHER";

function InfiniteMarquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-glass-border bg-gradient-to-r from-void via-void-elevated to-void">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-void to-transparent pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-void to-transparent pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {/* Repeat the marquee content multiple times */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 mx-8">
            <span className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">{marqueeText.split(" ").slice(0, 2).join(" ")} </span>
              <span className="bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent">
                {marqueeText.split(" ").slice(2).join(" ")}
              </span>
            </span>
            <Sparkles className="w-10 h-10 text-neon-purple" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      {/* Marquee Section */}
      <InfiniteMarquee />

      {/* Main Footer Content */}
      <div className="relative py-16 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-neon-purple/10 blur-[200px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-6xl mx-auto">
            {/* Top section with logo and newsletter */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
              {/* Logo and description */}
              <div className="max-w-md">
                <motion.a
                  href="/"
                  className="flex items-center gap-3 group mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple to-neon-blue">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="font-heading text-2xl font-bold tracking-tight">
                    <span className="text-white">AI</span>
                    <span className="bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
                      Muse
                    </span>
                  </span>
                </motion.a>

                <p className="text-text-secondary leading-relaxed mb-6">
                  Your gateway to AI creativity. Discover, experience, and
                  share AI-generated interactive experiences. Built for
                  creators, by creators.
                </p>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-10 h-10 rounded-xl glass border border-glass-border hover:border-white/20 text-text-secondary hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="w-full lg:w-auto">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">
                  Stay in the loop
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Get the latest AI tools and tutorials delivered to your inbox.
                </p>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 min-w-0 px-4 py-3 rounded-xl glass border border-glass-border bg-transparent text-white placeholder:text-text-muted focus:outline-none focus:border-neon-purple/50 transition-colors font-mono text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-heading font-semibold text-sm"
                  >
                    Subscribe
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Links grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
              {/* Product links */}
              <div>
                <h4 className="font-heading font-semibold text-white mb-4">
                  Product
                </h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources links */}
              <div>
                <h4 className="font-heading font-semibold text-white mb-4">
                  Resources
                </h4>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company links */}
              <div>
                <h4 className="font-heading font-semibold text-white mb-4">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-text-secondary hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-glass-border">
              <p className="text-sm text-text-muted font-mono">
                &copy; {new Date().getFullYear()} AI-Muse. All rights reserved.
              </p>
              <p className="flex items-center gap-2 text-sm text-text-muted">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>for the AI community</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
