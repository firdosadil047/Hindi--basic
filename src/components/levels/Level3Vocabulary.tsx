import React, { useState } from 'react';
import { VOCABULARY_LIST } from '../../data/hindiData';
import { WordItem } from '../../types';
import { AudioButton } from '../AudioButton';
import { SpeakingMic } from '../SpeakingMic';
import { soundFx } from '../../utils/speech';
import { Layers, Sparkles, Filter } from 'lucide-react';

interface Level3VocabularyProps {
  showPhonetics: boolean;
  slowAudio: boolean;
  onAddXP: (points: number) => void;
}

export const Level3Vocabulary: React.FC<Level3VocabularyProps> = ({
  showPhonetics,
  slowAudio,
  onAddXP,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [learnedItems, setLearnedItems] = useState<string[]>([]);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'All Categories', icon: '🌟' },
    { id: 'numbers', label: 'Numbers (गिनती)', icon: '🔢' },
    { id: 'colors', label: 'Colors (रंग)', icon: '🎨' },
    { id: 'animals', label: 'Animals (जानवर)', icon: '🐾' },
    { id: 'family', label: 'Family (परिवार)', icon: '👨‍👩‍👧' },
    { id: 'fruits', label: 'Fruits (फल)', icon: '🍎' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? VOCABULARY_LIST
    : VOCABULARY_LIST.filter(item => item.category === selectedCategory);

  const toggleReveal = (id: string) => {
    setRevealedTranslations(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markLearned = (id: string) => {
    if (!learnedItems.includes(id)) {
      setLearnedItems([...learnedItems, id]);
      onAddXP(10);
      soundFx.playSuccess();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          रंग जानवर
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>Level 3</span>
            <span>•</span>
            <span>Essential Vocabulary</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            रोज़मर्रा के शब्द (Everyday Hindi Words)
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Expand your vocabulary with everyday essentials — animals, vibrant colors, counting from 1 to 10, tasty fruits, and family words! Click the audio button on any card to hear accurate pronunciation.
          </p>

          <div className="flex items-center gap-3 mt-4 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1.5 rounded-xl">
              {VOCABULARY_LIST.length} Key Words
            </span>
            <span className="bg-emerald-400/30 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300/40">
              ✓ {learnedItems.length} Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              soundFx.playClick();
            }}
            className={`whitespace-nowrap px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-300'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const isLearned = learnedItems.includes(item.id);

          return (
            <div
              key={item.id}
              className={`fun-card bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                isLearned
                  ? 'border-emerald-300 shadow-md bg-gradient-to-b from-white to-emerald-50/20'
                  : 'border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Top Bar with Emoji & Audio */}
              <div className="flex items-start justify-between">
                <span className="text-4xl select-none" role="img" aria-label={item.english}>
                  {item.emoji}
                </span>
                <AudioButton
                  text={item.hindi}
                  slow={slowAudio}
                  size="md"
                  onPlayed={() => markLearned(item.id)}
                />
              </div>

              {/* Word Display */}
              <div className="text-center my-4">
                <div className="font-devanagari font-black text-3xl sm:text-4xl text-slate-800 tracking-wide">
                  {item.hindi}
                </div>
                {showPhonetics && (
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
                    /{item.transliteration}/
                  </div>
                )}
                <div className="text-sm font-extrabold text-slate-600 mt-2">
                  {item.english}
                </div>
              </div>

              {/* Action: Practice Mic */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-center">
                <SpeakingMic
                  targetHindi={item.hindi}
                  onSuccess={() => markLearned(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
