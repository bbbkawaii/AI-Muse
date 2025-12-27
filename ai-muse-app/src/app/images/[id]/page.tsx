import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import CaseDetailsCollapsible from "@/components/CaseDetailsCollapsible";
import { imageItems } from "@/lib/images";
import ImageDetailClient from "./ImageDetailClient";

type RouteParams = Promise<{ id: string }>;

export default async function ImagePage({
  params,
}: {
  params: RouteParams;
}) {
  const { id } = await params;
  const image = imageItems.find((img) => img.id === id);

  if (!image) notFound();

  return (
    <AppShell>
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 flex items-center justify-between gap-4">
              <Link
                href="/#image"
                className="font-mono text-sm text-text-secondary hover:text-white transition-colors"
              >
                ← Back to Image Lab
              </Link>
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight">
              {image.title}
            </h1>
            <p className="mt-4 text-text-secondary leading-relaxed max-w-3xl">
              {image.description}
            </p>

            {/* Image Display */}
            <div className="mt-10">
              <div className="glass-holographic rounded-2xl border border-glass-border overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            </div>

            {/* 作者信息和互动 */}
            <div className="mt-4">
              <ImageDetailClient id={id} />
            </div>

            {/* Prompt - 默认折叠，内容为空 */}
            <CaseDetailsCollapsible title="Prompt" defaultCollapsed={true}>
              <div className="glass rounded-2xl border border-glass-border p-6">
                <p className="text-text-muted text-sm italic">
                  暂无 Prompt 信息
                </p>
              </div>
            </CaseDetailsCollapsible>

            {/* 评论区 - 空的 */}
            <section className="mt-8 glass rounded-2xl border border-glass-border p-6">
              <h2 className="font-heading font-semibold text-white mb-6">
                评论 (0)
              </h2>

              {/* 评论输入框 */}
              <div className="flex gap-4 mb-8 pb-6 border-b border-glass-border">
                <img
                  src="/default-avatar.png"
                  alt="Your avatar"
                  className="w-10 h-10 rounded-full object-cover shrink-0 bg-void/50"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="发表你的评论..."
                    className="w-full bg-void/50 border border-glass-border rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted resize-none focus:outline-none focus:border-accent/50 transition-colors"
                    rows={3}
                    readOnly
                  />
                  <div className="mt-3 flex justify-end">
                    <button className="px-5 py-2 rounded-xl bg-accent/20 border border-accent/50 text-accent text-sm font-medium hover:bg-accent/30 transition-colors cursor-default">
                      发布评论
                    </button>
                  </div>
                </div>
              </div>

              {/* 空评论提示 */}
              <div className="text-center py-8">
                <p className="text-text-muted text-sm">暂无评论，快来抢沙发吧！</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
