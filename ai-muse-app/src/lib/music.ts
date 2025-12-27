export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  type: "audio" | "video";
  author: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "kill-american",
    title: "斩杀那个美利坚人",
    artist: "AI cover 杀死那个石家庄人",
    coverUrl: "/ai-music/kill-american.jpg",
    audioUrl: "/ai-music/kill-american.mp3",
    type: "audio",
    author: "Chorispora",
  },
  {
    id: "tiaolou-gospel",
    title: "跳楼机 - 黑人福音版",
    artist: "SUNO V5",
    coverUrl: "/ai-music/suno-tiaolou-gospel.jpg",
    audioUrl: "/ai-music/suno-tiaolou-gospel.mp4",
    type: "video",
    author: "Chorispora",
  },
  {
    id: "tiaolou-bieber",
    title: "跳楼机（完整版）",
    artist: "AI Justin Bieber",
    coverUrl: "/ai-music/tiaolou-bieber.jpg",
    audioUrl: "/ai-music/tiaolou-bieber.mp4",
    type: "video",
    author: "Chorispora",
  },
  {
    id: "faruxue",
    title: "发如雪",
    artist: "AI 孙燕姿 cover 周杰伦",
    coverUrl: "/ai-music/ai-sunyanzi-faruxue.jpg",
    audioUrl: "/ai-music/ai-sunyanzi-faruxue.mp4",
    type: "video",
    author: "Chorispora",
  },
  {
    id: "aizaixiyuanqian",
    title: "爱在西元前",
    artist: "AI 孙燕姿",
    coverUrl: "/ai-music/ai-sunyanzi-aizaixiyuanqian.jpg",
    audioUrl: "/ai-music/ai-sunyanzi-aizaixiyuanqian.mp4",
    type: "video",
    author: "Chorispora",
  },
];

export function getMusicById(id: string) {
  return musicTracks.find((track) => track.id === id) ?? null;
}
