export interface ImageItem {
  id: string;
  title: string;
  description: string;
  src: string;
  author: string;
}

export const imageItems: ImageItem[] = [
  {
    id: "1",
    title: "AI 艺术创作 #1",
    description: "由 AI 生成的创意艺术作品",
    src: "/ai-images/1.jpg",
    author: "Chorispora",
  },
  {
    id: "2",
    title: "AI 艺术创作 #2",
    description: "由 AI 生成的创意艺术作品",
    src: "/ai-images/2.jpg",
    author: "Chorispora",
  },
  {
    id: "3",
    title: "AI 艺术创作 #3",
    description: "由 AI 生成的创意艺术作品",
    src: "/ai-images/3.jpg",
    author: "Chorispora",
  },
  {
    id: "4",
    title: "AI 艺术创作 #4",
    description: "由 AI 生成的创意艺术作品",
    src: "/ai-images/4.jpg",
    author: "Chorispora",
  },
  {
    id: "5",
    title: "AI 艺术创作 #5",
    description: "由 AI 生成的创意艺术作品",
    src: "/ai-images/5.jpg",
    author: "Chorispora",
  },
];

export function getImageById(id: string) {
  return imageItems.find((img) => img.id === id) ?? null;
}
