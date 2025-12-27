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
    id: "suxi-fish",
    title: "卧室溯溪抓鱼自由",
    description: "把空调管连上屋顶的太阳能热水器，在卧室里舒舒服服的溯溪",
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
    id: "tianjin-chill",
    title: "天津的松弛感",
    description: "天津的松弛感拉满了",
    coverUrl: "/ai-videos/3.jpg",
    videoUrl: "/ai-videos/3.mp4",
    orientation: "portrait",
    author: "Chorispora",
  },
  {
    id: "tianjin-ad",
    title: "天津老字号沙雕广告",
    description: "海河牛奶豁出去了，天津人的精神状态太猛了",
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
    id: "time-traveler",
    title: "时间旅行者的 VLOG",
    description: "时间旅行者的 VLOG",
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
