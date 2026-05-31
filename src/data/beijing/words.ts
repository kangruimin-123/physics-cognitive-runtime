export type WordCategory =
  | "science"
  | "tech"
  | "psychology"
  | "education"
  | "environment"
  | "ai_extended"
  | "medical"
  | "psych_extended"
  | "social"
  | "learning_extended";

export interface Word {
  id: string;
  word: string;
  translation: string;
  category: WordCategory;
  example?: string;
  testHint?: string; // 熟词僻义 or special usage
}

export const CATEGORY_LABELS: Record<WordCategory, string> = {
  science: "科学研究",
  tech: "科技AI",
  psychology: "心理成长",
  education: "教育成长",
  environment: "环保生态",
  ai_extended: "AI与科技（扩展）",
  medical: "医疗与机器人",
  psych_extended: "心理学（扩展）",
  social: "社会关系",
  learning_extended: "学习成长（扩展）",
};

export const CORE_WORDS: Word[] = [
  // 科学研究
  { id: "s01", word: "research", translation: "研究；调查", category: "science", example: "Scientists conduct research on climate change.", testHint: "名词/动词两用" },
  { id: "s02", word: "study", translation: "研究；学习；研究报告", category: "science", example: "A new study shows that exercise improves memory." },
  { id: "s03", word: "scientist", translation: "科学家", category: "science", example: "Scientists discovered a new species of fish." },
  { id: "s04", word: "discover", translation: "发现；揭示", category: "science", example: "Researchers discovered that sleep affects learning." },
  { id: "s05", word: "evidence", translation: "证据；依据", category: "science", example: "There is strong evidence that exercise reduces stress." },
  { id: "s06", word: "data", translation: "数据；资料", category: "science", example: "The data collected shows a clear trend." },
  { id: "s07", word: "theory", translation: "理论；学说", category: "science", example: "Einstein's theory changed our understanding of physics." },
  { id: "s08", word: "result", translation: "结果；结论", category: "science", example: "The results of the experiment were surprising." },
  { id: "s09", word: "experiment", translation: "实验；试验", category: "science", example: "They carried out an experiment to test the theory." },
  { id: "s10", word: "observe", translation: "观察；遵守", category: "science", example: "Scientists observed changes in animal behavior." },
  { id: "s11", word: "analyze", translation: "分析；研究", category: "science", example: "Researchers analyzed the data carefully." },
  { id: "s12", word: "factor", translation: "因素；要素", category: "science", example: "Stress is a key factor in heart disease." },
  { id: "s13", word: "influence", translation: "影响；作用", category: "science", example: "Social media has a great influence on teenagers." },
  { id: "s14", word: "affect", translation: "影响；作用于", category: "science", example: "Lack of sleep affects your concentration." },
  { id: "s15", word: "process", translation: "过程；程序；处理", category: "science", example: "Learning is a gradual process.", testHint: "可作动词：处理" },
  { id: "s16", word: "method", translation: "方法；方式", category: "science", example: "Scientists use different methods to test hypotheses." },
  { id: "s17", word: "approach", translation: "方法；途径；靠近", category: "science", example: "A new approach to teaching has been developed.", testHint: "名词：方法；动词：靠近" },
  { id: "s18", word: "solution", translation: "解决方案；解决办法", category: "science", example: "We need a long-term solution to climate change." },
  { id: "s19", word: "challenge", translation: "挑战；难题（阅读：困难）", category: "science", example: "Pollution remains a major challenge.", testHint: "阅读中多指'问题/难题'" },
  { id: "s20", word: "achievement", translation: "成就；成绩", category: "science", example: "Winning the prize was a great achievement." },

  // 科技AI
  { id: "t01", word: "technology", translation: "技术；科技", category: "tech", example: "Technology is changing the way we live." },
  { id: "t02", word: "artificial", translation: "人工的；人造的", category: "tech", example: "Artificial intelligence can now recognize faces." },
  { id: "t03", word: "intelligence", translation: "智能；智慧", category: "tech", example: "Human intelligence is different from machine intelligence." },
  { id: "t04", word: "digital", translation: "数字的；电子的", category: "tech", example: "Digital tools have transformed education." },
  { id: "t05", word: "device", translation: "设备；装置", category: "tech", example: "Smartphones are powerful digital devices." },
  { id: "t06", word: "assistant", translation: "助手；助理", category: "tech", example: "AI assistants can answer questions instantly." },
  { id: "t07", word: "robot", translation: "机器人", category: "tech", example: "Robots are being used in hospitals to help patients." },
  { id: "t08", word: "healthcare", translation: "医疗保健；卫生保健", category: "tech", example: "AI is revolutionizing healthcare." },
  { id: "t09", word: "system", translation: "系统；体系", category: "tech", example: "A smart system can control classroom temperature." },
  { id: "t10", word: "platform", translation: "平台；站台", category: "tech", example: "Social media platforms affect mental health.", testHint: "阅读中常指网络平台" },
  { id: "t11", word: "advanced", translation: "先进的；高级的", category: "tech", example: "Advanced AI can write essays and create art." },
  { id: "t12", word: "automatic", translation: "自动的；自动化的", category: "tech", example: "Automatic systems reduce human error." },
  { id: "t13", word: "recognition", translation: "识别；认可", category: "tech", example: "Facial recognition technology is now widely used." },
  { id: "t14", word: "simulation", translation: "模拟；仿真", category: "tech", example: "Pilots train using flight simulations." },
  { id: "t15", word: "virtual", translation: "虚拟的；实质的", category: "tech", example: "Virtual reality creates immersive experiences." },
  { id: "t16", word: "efficient", translation: "高效的；有效率的", category: "tech", example: "Solar panels are becoming more efficient." },
  { id: "t17", word: "innovation", translation: "创新；革新", category: "tech", example: "Innovation drives economic growth." },
  { id: "t18", word: "smart", translation: "智能的；聪明的", category: "tech", example: "Smart cities use technology to improve life." },
  { id: "t19", word: "visual", translation: "视觉的；视觉效果", category: "tech", example: "Visual analysis software can detect emotions." },
  { id: "t20", word: "analysis", translation: "分析；解析", category: "tech", example: "Data analysis helps businesses make better decisions." },

  // 心理成长
  { id: "p01", word: "happiness", translation: "幸福；快乐", category: "psychology", example: "Research shows that relationships bring happiness." },
  { id: "p02", word: "emotion", translation: "情感；情绪", category: "psychology", example: "Music can affect our emotions deeply." },
  { id: "p03", word: "confidence", translation: "自信；信心", category: "psychology", example: "Praise helps children build confidence." },
  { id: "p04", word: "stress", translation: "压力；紧张", category: "psychology", example: "Too much stress can lead to health problems." },
  { id: "p05", word: "anxiety", translation: "焦虑；不安", category: "psychology", example: "Social media use can increase anxiety in teens." },
  { id: "p06", word: "wellbeing", translation: "健康；幸福感", category: "psychology", example: "Exercise improves both physical and mental wellbeing." },
  { id: "p07", word: "motivation", translation: "动力；动机", category: "psychology", example: "Inner motivation leads to long-term success." },
  { id: "p08", word: "satisfaction", translation: "满足感；满意", category: "psychology", example: "Helping others brings a sense of satisfaction." },
  { id: "p09", word: "attitude", translation: "态度；看法", category: "psychology", example: "A positive attitude helps overcome difficulties." },
  { id: "p10", word: "behavior", translation: "行为；举止", category: "psychology", example: "Online behavior can have real-world consequences." },
  { id: "p11", word: "awareness", translation: "意识；认识", category: "psychology", example: "Raising awareness of mental health is important." },
  { id: "p12", word: "mental", translation: "心理的；精神的", category: "psychology", example: "Mental health is as important as physical health." },
  { id: "p13", word: "positive", translation: "积极的；正面的", category: "psychology", example: "Positive thinking can improve your performance." },
  { id: "p14", word: "negative", translation: "消极的；负面的", category: "psychology", example: "Negative feedback can damage self-esteem." },
  { id: "p15", word: "growth", translation: "成长；增长", category: "psychology", example: "Failure is an important part of personal growth." },
  { id: "p16", word: "courage", translation: "勇气；勇敢", category: "psychology", example: "It takes courage to admit your mistakes." },
  { id: "p17", word: "patience", translation: "耐心；耐性", category: "psychology", example: "Learning a new skill requires patience." },
  { id: "p18", word: "resilience", translation: "韧性；恢复力", category: "psychology", example: "Resilience helps people recover from setbacks.", testHint: "高频词，近年必考" },
  { id: "p19", word: "mindset", translation: "思维方式；心态", category: "psychology", example: "A growth mindset helps you embrace challenges." },
  { id: "p20", word: "strength", translation: "力量；优势", category: "psychology", example: "Knowing your strengths helps you succeed." },

  // 教育成长
  { id: "e01", word: "potential", translation: "潜力；潜能", category: "education", example: "Every student has the potential to succeed." },
  { id: "e02", word: "ability", translation: "能力；才能", category: "education", example: "Reading improves your ability to think critically." },
  { id: "e03", word: "skill", translation: "技能；技巧", category: "education", example: "Communication skills are essential in modern work." },
  { id: "e04", word: "improve", translation: "提高；改善", category: "education", example: "Practice every day to improve your English." },
  { id: "e05", word: "progress", translation: "进步；进展", category: "education", example: "Track your progress to stay motivated." },
  { id: "e06", word: "develop", translation: "发展；培养；开发", category: "education", example: "Schools help students develop social skills.", testHint: "阅读中常指'培养'某种能力" },
  { id: "e07", word: "encourage", translation: "鼓励；激励", category: "education", example: "Teachers who encourage students get better results." },
  { id: "e08", word: "performance", translation: "表现；表演；业绩", category: "education", example: "Sleep affects academic performance." },
  { id: "e09", word: "success", translation: "成功；成就", category: "education", example: "Success requires effort and persistence." },
  { id: "e10", word: "failure", translation: "失败；失败的人", category: "education", example: "Failure teaches us valuable lessons." },
  { id: "e11", word: "effort", translation: "努力；尽力", category: "education", example: "Success is the result of consistent effort." },
  { id: "e12", word: "practice", translation: "练习；实践", category: "education", example: "Regular practice is the key to improvement." },
  { id: "e13", word: "mistake", translation: "错误；失误", category: "education", example: "Making mistakes is part of learning." },
  { id: "e14", word: "experience", translation: "经历；经验", category: "education", example: "Real-life experience teaches more than textbooks." },
  { id: "e15", word: "opportunity", translation: "机会；机遇", category: "education", example: "Education opens opportunities for the future." },
  { id: "e16", word: "goal", translation: "目标；目的", category: "education", example: "Setting clear goals helps you stay focused." },
  { id: "e17", word: "focus", translation: "专注；集中", category: "education", example: "It is hard to focus when you are tired.", testHint: "名词/动词两用" },
  { id: "e18", word: "accept", translation: "接受；承认", category: "education", example: "Accept failure as a stepping stone to success." },
  { id: "e19", word: "manage", translation: "管理；处理；设法做到", category: "education", example: "Learning to manage stress is a life skill.", testHint: "阅读中常指'设法应对'" },
  { id: "e20", word: "control", translation: "控制；管理", category: "education", example: "Self-control is a key quality for success." },

  // 环保生态
  { id: "n01", word: "environment", translation: "环境；自然环境", category: "environment", example: "We must protect the environment for future generations." },
  { id: "n02", word: "climate", translation: "气候；氛围", category: "environment", example: "Climate change is one of the greatest challenges of our time." },
  { id: "n03", word: "pollution", translation: "污染；污染物", category: "environment", example: "Air pollution causes millions of deaths each year." },
  { id: "n04", word: "energy", translation: "能源；精力", category: "environment", example: "Renewable energy can replace fossil fuels." },
  { id: "n05", word: "renewable", translation: "可再生的；可更新的", category: "environment", example: "Solar and wind power are renewable energy sources." },
  { id: "n06", word: "wildlife", translation: "野生动物；野生生物", category: "environment", example: "Deforestation destroys wildlife habitats." },
  { id: "n07", word: "habitat", translation: "栖息地；生境", category: "environment", example: "Many species are losing their natural habitat." },
  { id: "n08", word: "ecosystem", translation: "生态系统", category: "environment", example: "Coral reefs are vital ecosystems." },
  { id: "n09", word: "resource", translation: "资源；财富", category: "environment", example: "Fresh water is a precious natural resource." },
  { id: "n10", word: "protect", translation: "保护；防护", category: "environment", example: "Laws are needed to protect endangered species." },
  { id: "n11", word: "reduce", translation: "减少；降低", category: "environment", example: "We should reduce our use of plastic." },
  { id: "n12", word: "recycle", translation: "回收；循环利用", category: "environment", example: "Recycling paper saves trees." },
  { id: "n13", word: "sustainable", translation: "可持续的；可维持的", category: "environment", example: "Sustainable development meets present needs without harming the future." },
  { id: "n14", word: "forest", translation: "森林；林地", category: "environment", example: "Forests absorb large amounts of carbon dioxide." },
  { id: "n15", word: "nature", translation: "自然；本性", category: "environment", example: "Spending time in nature reduces stress." },
  { id: "n16", word: "species", translation: "物种；种类", category: "environment", example: "Thousands of species are at risk of extinction." },
  { id: "n17", word: "carbon", translation: "碳；碳元素", category: "environment", example: "We need to cut carbon emissions to fight climate change." },
  { id: "n18", word: "biodiversity", translation: "生物多样性", category: "environment", example: "Biodiversity is essential for a healthy planet." },
  { id: "n19", word: "conservation", translation: "保护；保存；节约", category: "environment", example: "Conservation efforts have saved many species." },
  { id: "n20", word: "greenhouse", translation: "温室；温室效应的", category: "environment", example: "Greenhouse gases trap heat in the atmosphere." },
];

export const EXTENDED_WORDS: Word[] = [
  // AI与科技
  { id: "ax01", word: "facial recognition", translation: "人脸识别", category: "ai_extended", example: "Schools use facial recognition to take attendance." },
  { id: "ax02", word: "visual analysis", translation: "视觉分析", category: "ai_extended", example: "Visual analysis software can detect human emotions." },
  { id: "ax03", word: "digital assistant", translation: "数字助手", category: "ai_extended", example: "Digital assistants like Siri answer our questions." },
  { id: "ax04", word: "virtual reality", translation: "虚拟现实", category: "ai_extended", example: "Virtual reality is used to train surgeons." },
  { id: "ax05", word: "automation", translation: "自动化", category: "ai_extended", example: "Automation is changing the job market." },
  { id: "ax06", word: "interactive", translation: "互动的；交互式的", category: "ai_extended", example: "Interactive whiteboards make lessons more engaging." },
  { id: "ax07", word: "algorithm", translation: "算法", category: "ai_extended", example: "Social media algorithms decide what you see." },
  { id: "ax08", word: "deepfake", translation: "深度伪造", category: "ai_extended", example: "Deepfake videos are hard to tell from real ones." },
  { id: "ax09", word: "intelligent", translation: "智能的；聪明的", category: "ai_extended", example: "Intelligent systems can learn from experience." },
  { id: "ax10", word: "autonomous", translation: "自主的；自治的", category: "ai_extended", example: "Autonomous cars can drive without human control." },

  // 医疗与机器人
  { id: "mx01", word: "companion", translation: "伴侣；同伴；陪伴物", category: "medical", example: "The robot serves as a companion for elderly people." },
  { id: "mx02", word: "companionship", translation: "陪伴；友谊", category: "medical", example: "Loneliness can be reduced through companionship." },
  { id: "mx03", word: "caregiver", translation: "护理者；照顾者", category: "medical", example: "Robot caregivers can help elderly patients." },
  { id: "mx04", word: "medication", translation: "药物；药物治疗", category: "medical", example: "The robot reminds patients to take their medication." },
  { id: "mx05", word: "recovery", translation: "康复；恢复", category: "medical", example: "Exercise speeds up recovery after surgery." },
  { id: "mx06", word: "injury", translation: "伤害；损伤", category: "medical", example: "Robots can reduce the risk of workplace injury." },
  { id: "mx07", word: "independent", translation: "独立的；自主的", category: "medical", example: "The technology helps elderly people live independently." },
  { id: "mx08", word: "safety", translation: "安全；安全性", category: "medical", example: "Patient safety is the top priority in hospitals." },
  { id: "mx09", word: "comfort", translation: "舒适；安慰", category: "medical", example: "Therapy robots provide emotional comfort." },
  { id: "mx10", word: "monitor", translation: "监控；监测", category: "medical", example: "Wearable devices monitor your heart rate.", testHint: "名词：监视器；动词：监控" },

  // 心理学（扩展）
  { id: "px01", word: "trauma", translation: "创伤；心理创伤", category: "psych_extended", example: "PTG can occur after experiencing serious trauma." },
  { id: "px02", word: "emotional", translation: "情感的；情绪的", category: "psych_extended", example: "Emotional intelligence helps in social situations." },
  { id: "px03", word: "mindfulness", translation: "正念；专注当下", category: "psych_extended", example: "Mindfulness meditation reduces stress and anxiety." },
  { id: "px04", word: "burnout", translation: "精力耗尽；职业倦怠", category: "psych_extended", example: "Overworking can lead to burnout." },
  { id: "px05", word: "adaptation", translation: "适应；改编", category: "psych_extended", example: "Adaptation to change is a key survival skill." },
  { id: "px06", word: "acceptance", translation: "接受；接纳", category: "psych_extended", example: "Acceptance of failure helps you move forward." },
  { id: "px07", word: "self-awareness", translation: "自我意识；自知", category: "psych_extended", example: "Self-awareness is the first step to self-improvement." },
  { id: "px08", word: "reflection", translation: "反思；思考", category: "psych_extended", example: "Regular reflection helps you learn from mistakes." },
  { id: "px09", word: "PTG", translation: "创伤后成长（Post-Traumatic Growth）", category: "psych_extended", example: "People who experience PTG become stronger after hardship." },
  { id: "px10", word: "cognitive", translation: "认知的；认知方面的", category: "psych_extended", example: "Cognitive skills improve with practice." },

  // 社会关系
  { id: "sx01", word: "community", translation: "社区；群体；共同体", category: "social", example: "Strong communities support mental wellbeing." },
  { id: "sx02", word: "connection", translation: "联系；连接；关系", category: "social", example: "Human connection is essential for happiness." },
  { id: "sx03", word: "interaction", translation: "互动；交流；相互影响", category: "social", example: "Face-to-face interaction is important for development." },
  { id: "sx04", word: "communication", translation: "沟通；交流；通讯", category: "social", example: "Good communication prevents misunderstandings." },
  { id: "sx05", word: "volunteer", translation: "志愿者；自愿做", category: "social", example: "Volunteering benefits both giver and receiver." },
  { id: "sx06", word: "donation", translation: "捐赠；捐款", category: "social", example: "Donations help rebuild disaster-hit communities." },
  { id: "sx07", word: "organization", translation: "组织；机构；团体", category: "social", example: "Non-profit organizations provide social support." },
  { id: "sx08", word: "service", translation: "服务；帮助；公共服务", category: "social", example: "Community service teaches young people responsibility." },
  { id: "sx09", word: "collaboration", translation: "合作；协作", category: "social", example: "Collaboration between schools and companies helps students." },
  { id: "sx10", word: "network", translation: "网络；关系网", category: "social", example: "A strong support network helps people through difficult times." },

  // 学习成长（扩展）
  { id: "lx01", word: "academic", translation: "学业的；学术的", category: "learning_extended", example: "Academic performance is influenced by sleep quality." },
  { id: "lx02", word: "improvement", translation: "提高；改善；进步", category: "learning_extended", example: "Consistent improvement is more important than perfection." },
  { id: "lx03", word: "curiosity", translation: "好奇心；求知欲", category: "learning_extended", example: "Curiosity drives learning and innovation." },
  { id: "lx04", word: "exploration", translation: "探索；探究", category: "learning_extended", example: "Science begins with the exploration of unknown questions." },
  { id: "lx05", word: "creativity", translation: "创造力；创意", category: "learning_extended", example: "Creativity is a skill that can be developed." },
  { id: "lx06", word: "independence", translation: "独立；自主", category: "learning_extended", example: "Schools aim to develop independence in students." },
  { id: "lx07", word: "critical thinking", translation: "批判性思维", category: "learning_extended", example: "Critical thinking helps you avoid fake news." },
  { id: "lx08", word: "engagement", translation: "参与；投入；专注", category: "learning_extended", example: "Student engagement increases learning outcomes." },
  { id: "lx09", word: "initiative", translation: "主动性；倡议；率先", category: "learning_extended", example: "Taking initiative is a valued quality in students." },
  { id: "lx10", word: "persistence", translation: "坚持；毅力", category: "learning_extended", example: "Persistence is more important than talent for success." },
];

export const ALL_WORDS: Word[] = [...CORE_WORDS, ...EXTENDED_WORDS];

// 熟词僻义 special meanings
export interface FamiliarWordTrap {
  id: string;
  word: string;
  textbookMeaning: string;
  readingMeaning: string;
  example: string;
}

export const FAMILIAR_WORD_TRAPS: FamiliarWordTrap[] = [
  { id: "fw01", word: "address", textbookMeaning: "地址", readingMeaning: "处理；解决", example: "We need to address the problem of air pollution." },
  { id: "fw02", word: "challenge", textbookMeaning: "挑战", readingMeaning: "难题；困难；质疑", example: "Climate change is one of the greatest challenges." },
  { id: "fw03", word: "support", textbookMeaning: "支持", readingMeaning: "帮助；支撑；证据", example: "The data provides support for the theory." },
  { id: "fw04", word: "develop", textbookMeaning: "发展", readingMeaning: "培养；形成；开发", example: "Schools should develop students' critical thinking." },
  { id: "fw05", word: "concern", textbookMeaning: "关心", readingMeaning: "担忧；顾虑；涉及", example: "There is growing concern about screen time in children." },
  { id: "fw06", word: "issue", textbookMeaning: "发行", readingMeaning: "问题；议题；争议点", example: "Mental health is an important social issue." },
  { id: "fw07", word: "present", textbookMeaning: "礼物", readingMeaning: "呈现；展示；提出", example: "The report presents new evidence on climate change." },
  { id: "fw08", word: "mean", textbookMeaning: "意思；吝啬", readingMeaning: "意味着；（adj）重要的", example: "A growth mindset means embracing failure." },
  { id: "fw09", word: "value", textbookMeaning: "价值", readingMeaning: "重视；珍视；珍惜（动词）", example: "We should value the time we spend with family." },
  { id: "fw10", word: "matter", textbookMeaning: "事情；物质", readingMeaning: "重要；有关系（动词）", example: "What matters most is not success but happiness." },
  { id: "fw11", word: "figure", textbookMeaning: "数字；图形", readingMeaning: "认为；意识到；重要人物", example: "He figured out a solution to the problem." },
  { id: "fw12", word: "serve", textbookMeaning: "服务", readingMeaning: "起…作用；充当", example: "This technology serves as a bridge between cultures." },
  { id: "fw13", word: "reflect", textbookMeaning: "反射", readingMeaning: "反思；体现；表明", example: "Test scores reflect students' effort, not just intelligence." },
  { id: "fw14", word: "engage", textbookMeaning: "订婚", readingMeaning: "参与；投入；吸引注意", example: "Interactive lessons engage students more effectively." },
  { id: "fw15", word: "drive", textbookMeaning: "驾驶", readingMeaning: "驱动；推动；动力", example: "Curiosity drives scientific discovery." },
];
