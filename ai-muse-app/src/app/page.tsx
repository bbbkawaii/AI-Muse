import Hero from "@/components/Hero";
import AppShell from "@/components/AppShell";
import ShowcaseGallery from "@/components/ShowcaseGallery";
import EfficiencyMatrix from "@/components/EfficiencyMatrix";
import AgentForge from "@/components/AgentForge";
import HowToAcademy from "@/components/HowToAcademy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <ShowcaseGallery />
      <EfficiencyMatrix />
      <AgentForge />
      <HowToAcademy />

      <section id="about" className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto glass-holographic rounded-2xl border border-glass-border p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-white">About </span>
                  <span className="text-accent">
                    AI-Muse
                  </span>
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  AI-Muse is a curated space for AI-generated interactive experiences.
                  Each case includes an isolated live preview and the original prompt
                  for learning and remixing.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Our mission is to democratize AI creativity by making powerful tools,
                  templates, and knowledge accessible to everyone - from curious beginners
                  to seasoned developers.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">
                    50+
                  </div>
                  <div className="text-sm text-text-muted mt-1">AI Demos</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">
                    15+
                  </div>
                  <div className="text-sm text-text-muted mt-1">AI Tools</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">
                    6
                  </div>
                  <div className="text-sm text-text-muted mt-1">Agent Templates</div>
                </div>
                <div className="glass rounded-xl p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-accent">
                    Open
                  </div>
                  <div className="text-sm text-text-muted mt-1">Source</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </AppShell>
  );
}
