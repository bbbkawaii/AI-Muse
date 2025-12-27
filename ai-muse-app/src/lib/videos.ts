export interface VideoItem {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  videoUrl: string;
  orientation: "portrait" | "landscape";
  author: string;
}

export const videoItems: VideoItem[] = [
  {
    id: "movie-scene-journey",
    title: "当梦想照进现实",
    description: "赢了多少影迷的梦，AI一镜到底带我走进经典电影片场",
    coverUrl: "/ai-videos/1.jpg",
    videoUrl: "/ai-videos/1.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "apple-parkour",
    title: "大苹果跑酷",
    description: "海螺AI首尾帧大幅度运镜，大苹果玩出蜘蛛侠穿越的质感",
    coverUrl: "/ai-videos/2.jpg",
    videoUrl: "/ai-videos/2.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "one-bite-bankrupt",
    title: "一口倾家荡产",
    description: "这就是传说中的「一口倾家荡产」吗？",
    coverUrl: "/ai-videos/3.jpg",
    videoUrl: "/ai-videos/3.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "rose-thief-gift",
    title: "玫瑰大盗的礼物",
    description: "收到了来自玫瑰大盗的礼物",
    coverUrl: "/ai-videos/4.jpg",
    videoUrl: "/ai-videos/4.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "bingmayong",
    title: "兵马俑直播带货",
    description: "AIGC短片《兵马俑的卖货日记》，穿越2000多年的兵马俑卖起了长生不老丹",
    coverUrl: "/ai-videos/5.jpg",
    videoUrl: "/ai-videos/5.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "trump-no-kings",
    title: "Trump mocks 'No Kings' protests",
    description: "Trump mocks 'No Kings' protests with shocking AI videos",
    coverUrl: "/ai-videos/6.jpg",
    videoUrl: "/ai-videos/6.mp4",
    orientation: "landscape",
    author: "Chorispora",
  },
  {
    id: "asmr-glass-fruit",
    title: "AI软萌ASMR",
    description: "割玻璃水果",
    coverUrl: "/ai-videos/7.jpg",
    videoUrl: "/ai-videos/8.mp4",
    orientation: "landscape",
    author: "Chorispora",
  },
  {
    id: "lunch-rush",
    title: "距离下课还有10秒",
    description: "距离下课还有10秒，食堂还没做好饭怎么办？",
    coverUrl: "/ai-videos/8.jpg",
    videoUrl: "/ai-videos/9.mp4",
    orientation: "landscape",
    author: "Chorispora",
  },
];

export function getVideoById(id: string) {
  return videoItems.find((v) => v.id === id) ?? null;
}
