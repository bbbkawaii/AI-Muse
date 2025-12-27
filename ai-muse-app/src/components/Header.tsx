"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Gallery", href: "/#gallery" },
  { label: "Tools", href: "/#tools" },
  { label: "Agents", href: "/#agents" },
  { label: "Learn", href: "/#learn" },
  { label: "About", href: "/#about" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav
            className={cn(
              "relative flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-500",
              isScrolled
                ? "bg-[rgba(0,212,255,0.03)] backdrop-blur-[30px] border border-white/10 shadow-[0_0_40px_rgba(0,212,255,0.06),inset_0_0_60px_rgba(255,255,255,0.02)]"
                : "bg-transparent"
            )}
            style={
              isScrolled
                ? {
                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",
                  }
                : undefined
            }
          >
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent rounded-lg blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
                  <Sparkles className="w-5 h-5 text-void" />
                </div>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight">
                <span className="text-white">AI</span>
                <span className="text-accent">
                  Muse
                </span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative px-5 py-2.5 font-heading font-medium text-sm text-text-secondary hover:text-white transition-colors group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    layoutId="nav-hover"
                  />
                </motion.a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="btn-ghost text-sm"
              >
                Sign In
              </motion.button>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="btn-primary text-sm glow-border rounded-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Creating</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-50 p-2 rounded-xl bg-white/[0.03] backdrop-blur-[20px] border border-white/[0.08]"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-void/90 backdrop-blur-xl"
              style={{
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[rgba(0,212,255,0.03)] backdrop-blur-[30px] border-l border-white/10 shadow-[0_0_40px_rgba(0,212,255,0.06),inset_0_0_60px_rgba(255,255,255,0.02)] p-8 pt-24"
              style={{
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
              }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-heading text-2xl font-semibold text-text-secondary hover:text-white transition-colors py-3 border-b border-glass-border"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button className="btn-ghost w-full justify-center">
                  Sign In
                </button>
                <button className="btn-primary w-full justify-center glow-border rounded-xl">
                  <span>Start Creating</span>
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
