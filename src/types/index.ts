export interface HindiChar {
  id: string;
  char: string;
  transliteration: string;
  category: 'swar' | 'vyanjan';
  soundMnemonic: string;
  exampleWord: string;
  exampleTranslit: string;
  exampleMeaning: string;
  emoji: string;
  audioPrompt?: string; // What to say in speech synthesis
}

export interface MatraItem {
  id: string;
  matra: string;
  name: string;
  vowel: string;
  symbol: string;
  exampleWithKa: string;
  exampleTranslit: string;
  meaning: string;
  sampleWord: string;
  sampleWordTranslit: string;
  sampleWordMeaning: string;
  emoji: string;
}

export interface WordItem {
  id: string;
  hindi: string;
  transliteration: string;
  english: string;
  category: 'two_letter' | 'three_letter' | 'animals' | 'colors' | 'numbers' | 'fruits' | 'family' | 'school';
  emoji: string;
  breakdown?: string[];
}

export interface PhraseItem {
  id: string;
  hindi: string;
  transliteration: string;
  english: string;
  category: 'greetings' | 'classroom' | 'daily' | 'feelings';
  tip?: string;
  dialogueSpeaker?: string;
}

export interface SentenceItem {
  id: string;
  hindi: string;
  transliteration: string;
  english: string;
  words: string[];
  grammarTip: string;
}

export interface QuizQuestion {
  id: string;
  type: 'audio_to_text' | 'text_to_meaning' | 'picture_match' | 'fill_blank';
  prompt: string;
  audioText?: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  emoji?: string;
}

export interface LevelInfo {
  id: number;
  title: string;
  hindiTitle: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  accentColor: string;
  itemsCount: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  completedLevels: number[];
  practicedWordsCount: number;
  stars: Record<number, number>; // levelId -> stars (1-3)
}
