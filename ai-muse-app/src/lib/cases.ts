export type CasePermission = "camera";

export type CaseSourceFile = {
  label: string;
  path: string;
};

export type ShowcaseCase = {
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  htmlUrl: string;
  externalUrl?: string;
  sourceFiles?: CaseSourceFile[];
  prompt: string;
  category: string;
  tags: string[];
  authorName?: string;
  permissions?: CasePermission[];
};

export const showcaseCases: ShowcaseCase[] = [
  {
    slug: "christmas-tree",
    title: "Grand Luxury Interactive Christmas Tree",
    description:
      "A high-fidelity, interactive 3D Christmas tree experience featuring a dynamic chaos-to-order assembly system, cinema-quality bloom, and a luxurious emerald and gold aesthetic.",
    thumbnailUrl: "/demos/christmas-tree/thumbnail.png",
    htmlUrl: "/demos/christmas-tree/index.html",
    sourceFiles: [
      {
        label: "Demo HTML (public)",
        path: "public/demos/christmas-tree/index.html",
      },
      {
        label: "Vite entry HTML (source)",
        path: "../christmas-tree/index.html",
      },
    ],
    prompt: `角色设定：你是一位精通 React 19、TypeScript 和 Three.js (R3F) 的 3D 创意开发专家。
任务目标：构建一个名为"豪华互动圣诞树 (Grand Luxury Interactive Christmas Tree)"的高保真 3D Web 应用。视觉风格需呈现"特朗普式"的奢华感，主色调为深祖母绿和高光金色，并伴有电影级的辉光效果。

技术栈：React 19, TypeScript, React Three Fiber, Drei, Postprocessing, Tailwind CSS

核心逻辑与架构：
1) 状态机：包含 CHAOS（混沌散落）与 FORMED（聚合成树）两种状态，并在二者间动态变形。
2) 双坐标系统 (Dual-Position System)：所有元素（针叶、装饰物）初始化时分配两套坐标：
   - ChaosPosition：球形空间内的随机坐标
   - TargetPosition：构成树木圆锥形状的目标坐标
   在 useFrame 中根据进度在两者间进行插值 (Lerp)。
3) 具体实现细节：
   - 针叶系统 (Foliage)：使用 THREE.Points 和自定义 ShaderMaterial 渲染大量粒子。
   - 装饰物 (Ornaments)：使用 InstancedMesh 优化渲染，分为礼物盒（重）、彩球（轻）、点缀灯光（极轻），赋予不同的物理推力权重，并使用 Lerp 实现丝滑归位动画。
   - 后期处理：启用 Bloom（阈值 0.8，强度 1.2），营造"金色光晕"。
4) 场景配置：摄像机位置 [0, 4, 20]，使用 Lobby HDRI 环境光。
5) 交互：使用摄像头图像检测手势：
   - 手势张开：unleash（切换到 CHAOS）
   - 握拳：restore（切换到 FORMED）
   - 手的移动可调整视角（相机旋转/俯仰）。
6) 额外：加入很多拍立得样式的照片装饰。`,
    category: "3d",
    tags: ["r3f", "three.js", "gesture", "mediapipe", "bloom"],
    authorName: "Gemini 3 + Claude 4.5 Sonnet",
    permissions: ["camera"],
  },
  {
    slug: "soul-nebula",
    title: "Soul Nebula: 情绪卡片星云",
    description:
      "一个沉浸式的3D情绪卡片星云体验。数百张漂浮的情绪卡片在星云中旋转，通过手势交互可以拉近阅读、触发粒子爆炸效果，支持自定义文案和背景音乐。",
    thumbnailUrl: "/demos/soul-nebula/thumbnail.png",
    htmlUrl: "/demos/soul-nebula/index.html",
    sourceFiles: [
      {
        label: "Demo HTML",
        path: "public/demos/soul-nebula/index.html",
      },
      {
        label: "Original HTML (source)",
        path: "../情绪卡片星云.html",
      },
    ],
    prompt: `创建一个名为 "Soul Nebula" 的3D情绪卡片星云交互页面。

技术栈：Three.js, MediaPipe Hands, Web Audio API, lil-gui

核心功能：
1) 星云系统：使用黄金螺旋分布350+张情绪卡片，形成球形星云。每张卡片显示励志文案，配有渐变背景和装饰圆点。
2) 粒子背景：3500个彩色粒子构成星云背景，使用 AdditiveBlending 混合模式。
3) 手势交互 (MediaPipe Hands)：
   - 手掌前后移动：控制镜头远近
   - 捏合手势：聚焦阅读卡片，长按触发"能量过载"爆炸效果
   - 食指位置：控制光标
4) 卡片系统：
   - 普通状态：显示主文案
   - 阅读模式：放大并显示详细副标题
   - 爆炸效果：卡片分解为800个粒子，配合音效
5) 音效系统：Web Audio API 合成悬停音和爆炸音
6) UI：支持编辑文案、上传背景音乐、B键沉浸模式
7) 后期处理：UnrealBloomPass 辉光效果

视觉风格：深色太空背景 (#02020a)，多套渐变配色方案，电影级辉光。`,
    category: "3d",
    tags: ["three.js", "mediapipe", "particles", "interactive", "audio"],
    authorName: "AI Creative",
    permissions: ["camera"],
  },
  {
    slug: "earth-saturn",
    title: "星际穿越：地球与土星",
    description:
      "一个粒子渲染的星际控制台，展示地球和土星两颗星球。通过手势挥动切换星球，捏合触发粒子爆发效果。土星带有完整的光环系统，地球使用真实纹理映射。",
    thumbnailUrl: "/demos/earth-saturn/thumbnail.png",
    htmlUrl: "/demos/earth-saturn/index.html",
    sourceFiles: [
      {
        label: "Demo HTML",
        path: "public/demos/earth-saturn/index.html",
      },
      {
        label: "Original HTML (source)",
        path: "../地球&土星.html",
      },
    ],
    prompt: `创建一个名为 "星际穿越：控制台" 的3D粒子星球交互页面。

技术栈：Three.js, MediaPipe Hands, lil-gui

核心功能：
1) 双星球系统：
   - 土星 (Saturn)：10000个金色粒子构成星球本体，20000个粒子构成光环，倾斜27度
   - 地球 (Earth)：50000个粒子，使用真实地球纹理采样颜色，黄金螺旋分布
2) 手势交互 (MediaPipe Hands)：
   - 挥手：切换星球场景，带缩放过渡动画
   - 食指移动：控制相机视角旋转
   - 捏合：触发粒子爆发效果，星球膨胀
3) 粒子动画：
   - 从原点爆发生成到目标位置
   - 自动旋转
   - 捏合时向外扩散
4) GUI控制面板：
   - 全局亮度、光晕强度
   - 地球：粒子大小、数量、海洋对比度
   - 土星：粒子大小、星球密度、光环密度
5) 星空背景：3000个静态星星粒子
6) UI：手势状态指示器、底部手势指南、B键隐藏UI

视觉风格：深空黑色背景，土星金色 (#d4a017)，地球蓝色 (#00aaff)，科幻HUD界面。`,
    category: "3d",
    tags: ["three.js", "mediapipe", "particles", "planets", "gesture"],
    authorName: "AI Creative",
    permissions: ["camera"],
  },
  {
    slug: "star-wars-universe",
    title: "Star Wars Universe",
    description:
      "沉浸式星球大战文字冒险游戏，在AI Dungeon平台上体验星战宇宙的无限可能。",
    thumbnailUrl: "/demos/games/图1.png",
    htmlUrl: "",
    externalUrl: "https://play.aidungeon.com/adventure/99TpYAPwe9a1/star-wars-universe/play",
    prompt: "AI Dungeon Star Wars 场景",
    category: "text-adventure",
    tags: ["ai-dungeon", "star-wars", "text-adventure", "rpg"],
  },
  {
    slug: "satoru-gojo-episode-1",
    title: "Satoru Gojo Episode 1",
    description:
      "基于《咒术回战》五条悟角色的互动游戏体验，在Rosebud平台上与最强咒术师展开对决。",
    thumbnailUrl: "/demos/games/图2.png",
    htmlUrl: "",
    externalUrl: "https://rosebud.ai/p/8ed68386-cbf3-4ebc-a6b3-b8c98b5c6b06",
    prompt: "Rosebud AI 五条悟角色游戏",
    category: "action",
    tags: ["rosebud", "jujutsu-kaisen", "gojo", "anime"],
  },
  {
    slug: "tinder-chat",
    title: "Tinder Chat",
    description:
      "AI驱动的社交模拟游戏，体验虚拟约会聊天的乐趣与挑战。",
    thumbnailUrl: "/demos/games/图3.png",
    htmlUrl: "",
    externalUrl: "https://rosebud.ai/p/d0333381-1c3d-4a25-8f33-d5ec84e8f230",
    prompt: "Rosebud AI 社交模拟游戏",
    category: "simulation",
    tags: ["rosebud", "social", "chat", "simulation"],
  },
  {
    slug: "gojo-boss-fight",
    title: "Gojo Boss Fight",
    description:
      "与五条悟展开史诗级Boss战，挑战最强咒术师的无限虚空。",
    thumbnailUrl: "/demos/games/图4.png",
    htmlUrl: "",
    externalUrl: "https://rosebud.ai/p/16fef9ce-3112-4dcf-8ba8-70d53c11ee6a",
    prompt: "Rosebud AI Boss战斗游戏",
    category: "action",
    tags: ["rosebud", "jujutsu-kaisen", "gojo", "boss-fight"],
  },
  {
    slug: "marker-match",
    title: "Marker Match",
    description:
      "有趣的标记匹配益智游戏，考验你的观察力和反应速度。",
    thumbnailUrl: "/demos/games/图5.gif",
    htmlUrl: "",
    externalUrl: "https://preview--5150-230490ec057fc8468bedb59ad06ee5acb9a303f8.gambo.games/",
    prompt: "Gambo AI 益智匹配游戏",
    category: "puzzle",
    tags: ["gambo", "puzzle", "matching", "casual"],
  },
  {
    slug: "tennis-match",
    title: "Tennis Match",
    description:
      "快节奏的网球对战游戏，体验AI生成的体育竞技乐趣。",
    thumbnailUrl: "/demos/games/图6.gif",
    htmlUrl: "",
    externalUrl: "https://preview--5143-db59364bbf492a89c8f31d4925f4d5c28873a970.gambo.games/",
    prompt: "Gambo AI 网球游戏",
    category: "sports",
    tags: ["gambo", "tennis", "sports", "competitive"],
  },
];

export function getShowcaseCase(slug: string) {
  return showcaseCases.find((c) => c.slug === slug) ?? null;
}
