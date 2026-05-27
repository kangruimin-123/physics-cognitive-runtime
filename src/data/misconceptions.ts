export const misconceptions = {
  "buoyancy-depth-confusion": {
    title: "浮力与深度误区",
    diagnosis: "混淆了压强随深度变大和浮力随排开体积变化。",
    repair: "盯住 V排：未浸没时 V排 增大，浸没后 V排 不变。",
  },
  "floating-greater-than-weight": {
    title: "漂浮受力误区",
    diagnosis: "把“上浮过程”误当成“漂浮静止”。",
    repair: "静止意味着合力为零，所以漂浮时 F浮 = G。",
  },
  "scale-reads-object-weight": {
    title: "电子秤读数误区",
    diagnosis: "没有追踪力最终传到哪里。",
    repair: "电子秤测桌面压力，不是直接测物体重力。",
  },
  "pressure-total-water": {
    title: "压强变量误区",
    diagnosis: "把水的总质量当成压强决定因素。",
    repair: "同种液体同一深度，压强相同。",
  },
  "sensor-submerged-tension": {
    title: "传感器图像误区",
    diagnosis: "没有识别完全浸没后 V排 不再变化。",
    repair: "F拉 = G - F浮，完全浸没后 F浮 恒定，所以拉力也恒定。",
  },
};
