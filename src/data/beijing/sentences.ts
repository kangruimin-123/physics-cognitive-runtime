export type SentenceTemplate =
  | "relative_clause"
  | "past_participle"
  | "object_clause"
  | "non_finite"
  | "passive"
  | "long_subject"
  | "causal"
  | "concessive"
  | "comparative"
  | "emphasis";

export const TEMPLATE_LABELS: Record<SentenceTemplate, string> = {
  relative_clause: "定语从句",
  past_participle: "过去分词插入语",
  object_clause: "宾语从句",
  non_finite: "非谓语动词",
  passive: "被动语态",
  long_subject: "长主语",
  causal: "因果句",
  concessive: "让步句",
  comparative: "比较句",
  emphasis: "强调句",
};

export interface SentenceExercise {
  id: string;
  template: SentenceTemplate;
  sentence: string;
  steps: string[];
  skeleton: string;
  keyWords: string[];
  translation: string;
  tip: string;
}

export const SENTENCES: SentenceExercise[] = [
  {
    id: "se01",
    template: "relative_clause",
    sentence: "A college in Tianjin introduced a robot which provides students with real-time information about campus activities.",
    steps: [
      "1. 找到关系词 which",
      "2. 划掉 which 引导的定语从句：which provides students with real-time information about campus activities",
      "3. 主干剩余：A college in Tianjin introduced a robot.",
      "4. 定语从句补充说明 robot：这个机器人能给学生提供校园活动的实时信息",
    ],
    skeleton: "A college introduced a robot.",
    keyWords: ["which", "introduce", "real-time", "campus"],
    translation: "天津某学院引进了一台机器人，它能为学生提供有关校园活动的实时信息。",
    tip: "定语从句 = 'which/that/who' 引导，修饰前面的名词，可整体删去只看主干。",
  },
  {
    id: "se02",
    template: "past_participle",
    sentence: "ElliQ, developed by Intuition Robotics and approved by healthcare experts, acts as a friendly companion for elderly people living alone.",
    steps: [
      "1. 识别插入语（两个逗号之间）：developed by Intuition Robotics and approved by healthcare experts",
      "2. 这是过去分词短语作插入性定语",
      "3. 删去插入语",
      "4. 主干：ElliQ acts as a friendly companion for elderly people living alone.",
      "5. 'living alone' 是现在分词修饰 people",
    ],
    skeleton: "ElliQ acts as a friendly companion.",
    keyWords: ["developed by", "approved by", "companion", "elderly"],
    translation: "ElliQ 由 Intuition Robotics 公司开发，经过医疗专家认证，作为独居老人的友好伴侣。",
    tip: "两个逗号之间的内容 = 插入语，直接删去读主干。",
  },
  {
    id: "se03",
    template: "object_clause",
    sentence: "Research from Harvard University shows that people who maintain close relationships are more likely to live longer and report higher levels of happiness.",
    steps: [
      "1. 找主谓：Research ... shows",
      "2. 'that' 之后是宾语从句",
      "3. 宾语从句主干：people are more likely to live longer and report higher levels of happiness",
      "4. 'who maintain close relationships' 是修饰 people 的定语从句（可删）",
      "5. 完整意思：研究显示，保持密切关系的人更可能长寿、更快乐",
    ],
    skeleton: "Research shows [that people are more likely to live longer].",
    keyWords: ["shows that", "maintain", "close relationships", "be likely to"],
    translation: "哈佛大学的研究表明，保持密切人际关系的人更有可能长寿，且报告更高水平的幸福感。",
    tip: "宾语从句 = shows/finds/proves/suggests + that…，'that' 前是主谓，后是内容。",
  },
  {
    id: "se04",
    template: "non_finite",
    sentence: "Using advanced tracking devices attached to their bodies, researchers were able to study the migration patterns of blue whales in detail.",
    steps: [
      "1. 找谓语动词：were able to study",
      "2. 'Using advanced tracking devices...' 是现在分词短语作状语",
      "3. 'attached to their bodies' 是过去分词修饰 devices",
      "4. 主干：researchers were able to study the migration patterns of blue whales.",
      "5. 方式状语：借助先进追踪设备",
    ],
    skeleton: "Researchers were able to study the migration patterns of blue whales.",
    keyWords: ["using", "attached to", "migration patterns", "in detail"],
    translation: "借助安装在蓝鲸身上的先进追踪装置，研究人员得以详细研究蓝鲸的迁徙规律。",
    tip: "句首 -ing 短语 = 状语（说明方式/原因/时间），不是主语，直接找后面的主语。",
  },
  {
    id: "se05",
    template: "passive",
    sentence: "Smart technologies, including facial recognition and AI-powered cameras, are increasingly being used in schools across China to improve safety.",
    steps: [
      "1. 找被动结构：are being used（现在进行时被动）",
      "2. 主语：Smart technologies",
      "3. 'including facial recognition and AI-powered cameras' 是插入语，说明包含哪些技术",
      "4. 主干：Smart technologies are increasingly being used in schools to improve safety.",
      "5. 目的状语：to improve safety",
    ],
    skeleton: "Smart technologies are being used in schools.",
    keyWords: ["including", "facial recognition", "increasingly", "to improve"],
    translation: "包括人脸识别和AI摄像头在内的智能技术，正越来越多地被中国各地学校采用，以提升安全性。",
    tip: "被动语态 = be + 过去分词，主语是动作的承受者，不是执行者。",
  },
  {
    id: "se06",
    template: "long_subject",
    sentence: "People who scored higher on tests measuring analytical and logical thinking skills were significantly less likely to share or believe false news stories online.",
    steps: [
      "1. 找谓语：were significantly less likely",
      "2. 主语是：People（后面接了修饰性定语从句）",
      "3. 定语从句：who scored higher on tests measuring analytical and logical thinking skills",
      "4. 'measuring analytical and logical thinking skills' 修饰 tests",
      "5. 主干：People were significantly less likely to share or believe false news stories.",
    ],
    skeleton: "People were less likely to believe false news.",
    keyWords: ["analytical", "logical thinking", "significantly", "false news"],
    translation: "在分析性和逻辑性思维测试中得分更高的人，明显较少在网上传播或相信虚假新闻。",
    tip: "长主语 = 找谓语动词（be/do）就找到句子切割点，主语在谓语之前所有内容。",
  },
  {
    id: "se07",
    template: "causal",
    sentence: "The rapid growth of social media platforms among teenagers has contributed to a significant increase in rates of anxiety and depression over the past decade.",
    steps: [
      "1. 主语：The rapid growth of social media platforms among teenagers",
      "2. 谓语：has contributed to（因果结构）",
      "3. 宾语：a significant increase in rates of anxiety and depression",
      "4. 时间状语：over the past decade",
      "5. 简化：Social media growth → increased anxiety/depression",
    ],
    skeleton: "The growth of social media has contributed to an increase in anxiety.",
    keyWords: ["contribute to", "significant increase", "rates of", "over the past decade"],
    translation: "过去十年来，社交媒体平台在青少年中的迅速普及，导致焦虑和抑郁发生率显著上升。",
    tip: "contribute to = lead to = result in = cause，都表示因果，是命题人最爱用的替换词。",
  },
  {
    id: "se08",
    template: "concessive",
    sentence: "Although technology has brought remarkable benefits to modern education, it has also created serious challenges, particularly for students who struggle with screen addiction.",
    steps: [
      "1. 'Although' 引导让步状语从句",
      "2. 主句（对比）：it has also created serious challenges",
      "3. 让步从句（承认的事）：technology has brought remarkable benefits to modern education",
      "4. 进一步限定：particularly for students who struggle with screen addiction",
      "5. 核心逻辑：科技有好处，但也带来挑战",
    ],
    skeleton: "Although technology has benefits, it has also created challenges.",
    keyWords: ["although", "remarkable", "in particular", "struggle with"],
    translation: "尽管科技给现代教育带来了显著益处，它也产生了严峻挑战，尤其是对那些难以抵抗屏幕成瘾的学生。",
    tip: "Although/though/even though 引导的从句 = 承认对方观点，but 之后才是作者真正的观点。",
  },
  {
    id: "se09",
    template: "comparative",
    sentence: "Compared with students who receive only traditional classroom teaching, those who take part in project-based learning tend to develop stronger problem-solving skills.",
    steps: [
      "1. 'Compared with...' 开头 = 比较状语短语",
      "2. 比较对象1：students who receive only traditional classroom teaching",
      "3. 主句主语：those（代指另一类学生）",
      "4. 谓语：tend to develop",
      "5. 结论：项目式学习 > 传统课堂 → 解决问题能力更强",
    ],
    skeleton: "Compared with traditional students, project-based learners develop stronger skills.",
    keyWords: ["compared with", "take part in", "project-based", "tend to", "problem-solving"],
    translation: "与只接受传统课堂教学的学生相比，参与项目式学习的学生往往能培养出更强的解决问题能力。",
    tip: "Compared with A, B... = B比A（后面说的是优势/劣势）",
  },
  {
    id: "se10",
    template: "emphasis",
    sentence: "It is not intelligence alone but the combination of resilience, effort, and a growth mindset that ultimately determines a person's long-term success.",
    steps: [
      "1. 强调句结构：It is ... that ...",
      "2. 删去 'It is' 和 'that'",
      "3. 剩下的是强调内容：not intelligence alone but the combination of resilience, effort, and a growth mindset",
      "4. 原句还原：The combination of resilience, effort, and a growth mindset determines a person's long-term success.",
      "5. 强调的是：不是智力，而是韧性+努力+成长型思维",
    ],
    skeleton: "The combination of resilience, effort, and mindset determines success.",
    keyWords: ["It is...that", "not...but", "resilience", "growth mindset", "ultimately"],
    translation: "最终决定一个人长远成功的，不是单纯的智力，而是韧性、努力与成长型思维的结合。",
    tip: "It is ... that ... = 强调句，删掉 It is 和 that，剩下的才是核心内容。",
  },
  {
    id: "se11",
    template: "relative_clause",
    sentence: "Post-traumatic growth (PTG) refers to the positive psychological changes that people experience as a result of struggling with highly challenging life crises.",
    steps: [
      "1. 主语：Post-traumatic growth (PTG)",
      "2. 谓语：refers to",
      "3. 宾语：the positive psychological changes",
      "4. 'that people experience...' 是定语从句修饰 changes",
      "5. 主干：PTG refers to positive changes people experience after crises.",
    ],
    skeleton: "PTG refers to positive changes that people experience after crises.",
    keyWords: ["refer to", "that", "as a result of", "struggling with", "challenging"],
    translation: "创伤后成长（PTG）是指人们在经历极具挑战性的人生危机后所产生的积极心理变化。",
    tip: "refer to = mean（表示'指的是'），常见于D篇定义开头。",
  },
  {
    id: "se12",
    template: "object_clause",
    sentence: "A growing body of scientific evidence suggests that spending time in nature, even for as little as 20 minutes a day, can significantly reduce levels of cortisol, a stress hormone.",
    steps: [
      "1. 主句：A growing body of scientific evidence suggests",
      "2. 宾语从句：that spending time in nature...can significantly reduce levels of cortisol",
      "3. 'even for as little as 20 minutes a day' 是插入的让步状语",
      "4. 'a stress hormone' 是对 cortisol 的同位语解释",
      "5. 核心：科学证据表明→自然界中待20分钟→降低皮质醇（压力激素）",
    ],
    skeleton: "Evidence suggests that spending time in nature reduces cortisol.",
    keyWords: ["a growing body of", "suggests that", "even for as little as", "cortisol"],
    translation: "越来越多的科学证据表明，即使每天只在大自然中待20分钟，也能显著降低皮质醇（一种压力激素）的水平。",
    tip: "'a growing body of evidence' = 越来越多的证据，D篇超高频表达。",
  },
];
