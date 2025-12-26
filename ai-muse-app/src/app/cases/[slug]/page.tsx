import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import PromptDisplay from "@/components/PromptDisplay";
import ProjectPreview from "@/components/ProjectPreview";
import SourceFilesDisplay, {
  type SourceFile,
} from "@/components/SourceFilesDisplay";
import { getShowcaseCase, type CaseSourceFile } from "@/lib/cases";

type RouteParams = { slug: string };

async function readSourceFiles(sourceFiles: CaseSourceFile[] | undefined) {
  if (!sourceFiles?.length) return [];

  const root = process.cwd();
  const files = await Promise.all(
    sourceFiles.map(async (file) => {
      const absolutePath = path.resolve(root, file.path);
      try {
        const content = await fs.readFile(absolutePath, "utf8");
        return { ...file, content } satisfies SourceFile;
      } catch {
        return {
          ...file,
          content: `Unable to read file: ${file.path}`,
        } satisfies SourceFile;
      }
    })
  );

  return files;
}

export default async function CasePage({
  params,
}: {
  params: RouteParams | Promise<RouteParams>;
}) {
  const { slug } = await params;
  const showcaseCase = getShowcaseCase(slug);

  if (!showcaseCase) notFound();

  const sourceFiles = await readSourceFiles(showcaseCase.sourceFiles);

  return (
    <AppShell>
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link
                href="/#gallery"
                className="font-mono text-sm text-text-secondary hover:text-white transition-colors"
              >
                ← Back to gallery
              </Link>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              {showcaseCase.title}
            </h1>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-3xl">
              {showcaseCase.description}
            </p>

            <div className="mt-10">
              <ProjectPreview
                htmlUrl={showcaseCase.htmlUrl}
                title={showcaseCase.title}
                permissions={showcaseCase.permissions}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PromptDisplay prompt={showcaseCase.prompt} />
              <section className="glass rounded-2xl border border-glass-border p-6">
                <h2 className="font-heading font-semibold text-white">
                  Notes
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-text-secondary leading-relaxed">
                  <li>
                    Camera gesture control requires allowing camera permission in
                    the browser.
                  </li>
                  <li>
                    If camera permission is blocked, the demo still supports
                    mouse interaction.
                  </li>
                </ul>
              </section>
            </div>

            <SourceFilesDisplay files={sourceFiles} />
          </div>
        </div>
      </section>
    </AppShell>
  );
}
