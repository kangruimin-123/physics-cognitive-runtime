export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  type: PhraseType;
  example?: string;
}

export type PhraseType =
  | "causal"
  | "contrast"
  | "example"
  | "addition"
  | "comparison"
  | "essential";

export const PHRASE_TYPE_LABELS: Record<PhraseType, string> = {
  causal: "因果关系",
  contrast: "转折对比",
  example: "举例说明",
  addition: "递进补充",
  comparison: "比较对比",
  essential: "万能高频",
};

export const PHRASES: Phrase[] = [
  // 因果
  { id: "ph01", phrase: "lead to", translation: "导致；引起", type: "causal", example: "Stress can lead to serious health problems." },
  { id: "ph02", phrase: "result in", translation: "导致；造成（结果）", type: "causal", example: "Lack of sleep results in poor concentration." },
  { id: "ph03", phrase: "contribute to", translation: "导致；促成；有助于", type: "causal", example: "Exercise contributes to better mental health." },
  { id: "ph04", phrase: "because of", translation: "因为；由于", type: "causal", example: "Many species are at risk because of habitat loss." },
  { id: "ph05", phrase: "as a result", translation: "因此；结果", type: "causal", example: "He studied hard. As a result, he passed the exam." },
  { id: "ph06", phrase: "due to", translation: "由于；因为", type: "causal", example: "The project was delayed due to bad weather." },
  { id: "ph07", phrase: "thanks to", translation: "由于；多亏了", type: "causal", example: "Thanks to new technology, remote work is possible." },
  { id: "ph08", phrase: "be responsible for", translation: "导致；负责", type: "causal", example: "Carbon emissions are responsible for global warming." },

  // 转折对比
  { id: "ph09", phrase: "however", translation: "然而；但是", type: "contrast", example: "Technology has many benefits. However, it also has drawbacks." },
  { id: "ph10", phrase: "although / though", translation: "虽然；尽管", type: "contrast", example: "Although it was difficult, she never gave up." },
  { id: "ph11", phrase: "while", translation: "而；然而；尽管（转折）", type: "contrast", example: "Some students love exams, while others hate them." },
  { id: "ph12", phrase: "yet", translation: "然而；但是（书面语）", type: "contrast", example: "He worked hard, yet he failed the test." },
  { id: "ph13", phrase: "nevertheless", translation: "尽管如此；然而", type: "contrast", example: "It was raining. Nevertheless, they went for a walk." },
  { id: "ph14", phrase: "even though", translation: "即使；尽管", type: "contrast", example: "Even though he was tired, he kept studying." },
  { id: "ph15", phrase: "on the other hand", translation: "另一方面；从另一角度看", type: "contrast", example: "Social media connects people. On the other hand, it can isolate us." },
  { id: "ph16", phrase: "in contrast", translation: "相比之下；相反地", type: "contrast", example: "In contrast to urban life, rural life is quieter." },

  // 举例
  { id: "ph17", phrase: "for example", translation: "例如", type: "example", example: "Many cities use smart technology. For example, Beijing has smart traffic systems." },
  { id: "ph18", phrase: "such as", translation: "例如；像", type: "example", example: "Renewable energy sources, such as solar and wind power, are growing." },
  { id: "ph19", phrase: "for instance", translation: "例如；举例来说", type: "example", example: "Some activities, for instance volunteering, boost happiness." },
  { id: "ph20", phrase: "including", translation: "包括；其中包括", type: "example", example: "Many animals, including tigers and pandas, are endangered." },

  // 递进
  { id: "ph21", phrase: "moreover", translation: "此外；而且", type: "addition", example: "Exercise improves mood. Moreover, it boosts energy levels." },
  { id: "ph22", phrase: "furthermore", translation: "此外；更有甚者", type: "addition", example: "The plan is cost-effective. Furthermore, it is easy to implement." },
  { id: "ph23", phrase: "besides", translation: "此外；除此之外", type: "addition", example: "Besides improving health, sports build teamwork skills." },
  { id: "ph24", phrase: "in addition", translation: "另外；此外", type: "addition", example: "In addition to helping with homework, AI can tutor students." },
  { id: "ph25", phrase: "what's more", translation: "更重要的是；而且", type: "addition", example: "The new system is fast. What's more, it is accurate." },

  // 比较
  { id: "ph26", phrase: "compared with", translation: "与…相比", type: "comparison", example: "Compared with last year, pollution levels have dropped." },
  { id: "ph27", phrase: "rather than", translation: "而不是；与其…不如", type: "comparison", example: "Focus on learning rather than just getting good grades." },
  { id: "ph28", phrase: "instead of", translation: "代替；而不是", type: "comparison", example: "Use public transport instead of driving." },
  { id: "ph29", phrase: "unlike", translation: "不像；与…不同", type: "comparison", example: "Unlike traditional schools, online platforms offer flexibility." },

  // 万能高频
  { id: "ph30", phrase: "pay attention to", translation: "注意；关注", type: "essential", example: "We should pay attention to students' mental health." },
  { id: "ph31", phrase: "focus on", translation: "专注于；集中于", type: "essential", example: "The article focuses on the benefits of exercise." },
  { id: "ph32", phrase: "be likely to", translation: "很可能；易于", type: "essential", example: "Happy people are more likely to succeed in life." },
  { id: "ph33", phrase: "be able to", translation: "能够；可以", type: "essential", example: "With practice, students are able to improve quickly." },
  { id: "ph34", phrase: "take part in", translation: "参加；参与", type: "essential", example: "Students who take part in sports have better mental health." },
  { id: "ph35", phrase: "deal with", translation: "处理；应对；解决", type: "essential", example: "Schools must deal with the rising problem of anxiety." },
  { id: "ph36", phrase: "care for", translation: "照顾；关心；喜欢", type: "essential", example: "Robots can care for elderly patients at home." },
  { id: "ph37", phrase: "benefit from", translation: "从…中受益", type: "essential", example: "Students benefit from working in teams." },
  { id: "ph38", phrase: "depend on", translation: "依靠；取决于", type: "essential", example: "Success depends on hard work and opportunity." },
  { id: "ph39", phrase: "be interested in", translation: "对…感兴趣", type: "essential", example: "More young people are interested in environmental issues." },
  { id: "ph40", phrase: "be aware of", translation: "意识到；了解", type: "essential", example: "We should be aware of the dangers of fake news." },
  { id: "ph41", phrase: "be willing to", translation: "愿意；乐意", type: "essential", example: "Students must be willing to accept failure." },
  { id: "ph42", phrase: "be proud of", translation: "为…骄傲；感到自豪", type: "essential", example: "Be proud of your progress, not just your results." },
  { id: "ph43", phrase: "grow up", translation: "成长；长大", type: "essential", example: "Children who grow up with pets tend to be more empathetic." },
  { id: "ph44", phrase: "come up with", translation: "想出；提出（方案）", type: "essential", example: "Students were asked to come up with creative solutions." },
  { id: "ph45", phrase: "point out", translation: "指出；说明", type: "essential", example: "The researcher points out that sleep affects memory." },
  { id: "ph46", phrase: "find out", translation: "发现；查明", type: "essential", example: "Scientists are trying to find out what causes depression." },
  { id: "ph47", phrase: "carry out", translation: "执行；开展；进行", type: "essential", example: "The team carried out a survey on student wellbeing." },
  { id: "ph48", phrase: "make up", translation: "组成；弥补；编造", type: "essential", example: "Teamwork and effort make up the key to success.", testHint: "多义词，常考" } as Phrase & { testHint?: string },
  { id: "ph49", phrase: "set up", translation: "建立；设立；创立", type: "essential", example: "The school set up a mental health support program." },
  { id: "ph50", phrase: "look up to", translation: "尊敬；仰望", type: "essential", example: "Young people often look up to sports stars as role models." },
];

// 同义替换 — what test makers substitute
export interface SynonymPair {
  id: string;
  original: string;
  testSubstitute: string;
  chineseMeaning: string;
}

export const SYNONYM_PAIRS: SynonymPair[] = [
  { id: "sy01", original: "help", testSubstitute: "support / assist", chineseMeaning: "帮助" },
  { id: "sy02", original: "important", testSubstitute: "significant / crucial / vital", chineseMeaning: "重要的" },
  { id: "sy03", original: "change", testSubstitute: "transform / alter", chineseMeaning: "改变" },
  { id: "sy04", original: "problem", testSubstitute: "challenge / issue / difficulty", chineseMeaning: "问题" },
  { id: "sy05", original: "improve", testSubstitute: "enhance / boost / develop", chineseMeaning: "提高" },
  { id: "sy06", original: "show", testSubstitute: "demonstrate / reveal / indicate", chineseMeaning: "显示" },
  { id: "sy07", original: "use", testSubstitute: "apply / employ / utilize", chineseMeaning: "使用" },
  { id: "sy08", original: "learn", testSubstitute: "acquire / develop / gain", chineseMeaning: "学习/获得" },
  { id: "sy09", original: "think", testSubstitute: "believe / consider / argue", chineseMeaning: "认为" },
  { id: "sy10", original: "need", testSubstitute: "require / demand / call for", chineseMeaning: "需要" },
  { id: "sy11", original: "make", testSubstitute: "enable / allow / cause", chineseMeaning: "使…" },
  { id: "sy12", original: "stop", testSubstitute: "prevent / avoid / reduce", chineseMeaning: "阻止/减少" },
];
