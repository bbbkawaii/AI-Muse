import Hero from "@/components/Hero";
import AppShell from "@/components/AppShell";
import ShowcaseGallery from "@/components/ShowcaseGallery";

export default function Home() {
  return (
    <AppShell>
      <Hero />
      <ShowcaseGallery />

      <section id="about" className="relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto glass rounded-2xl border border-glass-border p-8 md:p-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              About
            </h2>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-3xl">
              AI-Muse is a curated space for AI-generated interactive experiences.
              Each case includes an isolated live preview and the original prompt
              for learning and remixing.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
