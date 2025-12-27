"use client";

import { useMemo } from "react";

const defaultAvatar = "/default-avatar.png";

// 生成随机乱码用户名
function generateUserName(seed: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  let s = seed;
  for (let i = 0; i < 8; i++) {
    code += chars[Math.abs(s) % chars.length];
    s = Math.floor(s / 36) + seed * (i + 1);
  }
  return `user_${code}`;
}

// 每个 case 的评论模板
const commentTemplates: Record<string, string[]> = {
  "christmas-tree": [
    "好想请教一下博主这个prompt是怎么写出来的",
    "佬，想问问cursor能做出来吗",
    "大佬这个代码是放在vscode还是有特定的软件要求呀",
    "手机打不开了，是不是只支持电脑端",
    "博主，摄像头也开了，但没有跟着手势去移动，怎么办",
    "太酷了！请问这个是用什么AI生成的",
    "收藏了，回头慢慢研究prompt",
    "这个bloom效果怎么调的，我试了好几次都没这个效果",
  ],
  "soul-nebula": [
    "想问下博主这个用的是什么模型生成的代码",
    "手机端体验不了，有点可惜",
    "佬，摄像头权限开了但是手势没反应是什么情况",
    "这个粒子效果太治愈了，请问prompt可以分享一下吗",
    "大佬能出个教程吗，想学习一下",
    "好厉害！这个是纯AI写的还是有手动调整",
    "为什么我的爆炸效果没有声音",
    "收藏收藏，等有空了研究下源码",
  ],
  "earth-saturn": [
    "请问博主这个prompt写了多久啊",
    "cursor能跑起来吗，想自己试试",
    "手势控制好灵敏，但是我这边有点卡，是电脑配置问题吗",
    "太震撼了，土星那个光环是怎么实现的",
    "佬，能分享一下完整的prompt吗",
    "想问下这个是用Claude还是GPT生成的",
    "手机上看不了，显示需要摄像头权限但是开了也没用",
    "这个粒子数量这么多不卡吗，优化得真好",
  ],
};

// 使用 slug 生成固定的随机数
function seededRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// 生成随机时间（几小时前、几天前等）
function generateTimeAgo(seed: number): string {
  const options = [
    "刚刚",
    "5分钟前",
    "15分钟前",
    "30分钟前",
    "1小时前",
    "2小时前",
    "3小时前",
    "5小时前",
    "昨天",
    "2天前",
    "3天前",
    "1周前",
  ];
  return options[seed % options.length];
}

interface Comment {
  id: number;
  avatar: string;
  userName: string;
  content: string;
  timeAgo: string;
  likes: number;
}

function generateComments(slug: string): Comment[] {
  const templates = commentTemplates[slug] || [];
  if (templates.length === 0) return [];

  const baseSeed = seededRandom(slug);
  // 生成 4-7 条评论
  const commentCount = 4 + (baseSeed % 4);

  const comments: Comment[] = [];
  const usedTemplates = new Set<number>();

  for (let i = 0; i < commentCount && i < templates.length; i++) {
    const seed = seededRandom(slug + i.toString());

    // 选择不重复的评论模板
    let templateIndex = seed % templates.length;
    while (usedTemplates.has(templateIndex) && usedTemplates.size < templates.length) {
      templateIndex = (templateIndex + 1) % templates.length;
    }
    usedTemplates.add(templateIndex);

    comments.push({
      id: i,
      avatar: defaultAvatar,
      userName: generateUserName(seed),
      content: templates[templateIndex],
      timeAgo: generateTimeAgo((seed >> 6) + i * 3),
      likes: 1 + ((seed >> 8) % 50),
    });
  }

  return comments;
}

interface CaseCommentsProps {
  slug: string;
}

export default function CaseComments({ slug }: CaseCommentsProps) {
  const comments = useMemo(() => generateComments(slug), [slug]);

  if (comments.length === 0) return null;

  return (
    <section className="mt-8 glass rounded-2xl border border-glass-border p-6">
      <h2 className="font-heading font-semibold text-white mb-6">
        评论 ({comments.length})
      </h2>

      {/* 评论输入框 */}
      <div className="flex gap-4 mb-8 pb-6 border-b border-glass-border">
        <img
          src={defaultAvatar}
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

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <img
              src={comment.avatar}
              alt={comment.userName}
              className="w-10 h-10 rounded-full object-cover shrink-0 bg-void/50"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-medium text-white text-sm">
                  {comment.userName}
                </span>
                <span className="text-xs text-text-muted">
                  {comment.timeAgo}
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {comment.content}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <button className="text-xs text-text-muted hover:text-white transition-colors">
                  {comment.likes} 赞
                </button>
                <button className="text-xs text-text-muted hover:text-white transition-colors">
                  回复
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
