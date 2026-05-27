export type ModelId = "float" | "scale" | "level" | "sensor";

export const models = [
  {
    id: "float" as const,
    name: "漂浮 / 悬浮 / 沉底",
    core: "静止漂浮时 F浮 = G，不是 F浮 > G。",
    questions: ["专项训练1", "名校真题1", "中考模拟5"],
  },
  {
    id: "scale" as const,
    name: "电子秤 / 溢水杯 / 力传递",
    core: "电子秤测的是最终传给桌面的压力。",
    questions: ["专项训练2", "专项训练3", "专项训练6", "中考模拟6"],
  },
  {
    id: "level" as const,
    name: "液面变化 / 液体压强",
    core: "p = rho g h，压强只看密度和深度。",
    questions: ["专项训练5", "专项训练8", "中考模拟1", "中考模拟8"],
  },
  {
    id: "sensor" as const,
    name: "传感器 / 自动控制 / F-h 图像",
    core: "水位改变浸入体积，进而改变浮力和传感器读数。",
    questions: ["专项训练9", "名校真题8", "中考模拟2", "北京中考真题1"],
  },
];
