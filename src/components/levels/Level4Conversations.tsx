import React, { useState } from 'react';
import { PHRASES_LIST } from '../../data/hindiData';
import { PhraseItem } from '../../types';
import { AudioButton } from '../AudioButton';
import { SpeakingMic } from '../SpeakingMic';
import { soundFx } from '../../utils/speech';
import { MessageCircle, Info, Sparkles, CheckCheck } from 'lucide-react';

interface Level4ConversationsProps {
  showPhonetics: boolean;
  slowAudio: boolean;
  onAddXP: (points: number) => void;
}

export const Level4Conversations: React.FC<Level4ConversationsProps> = ({
  showPhonetics,
  slowAudio,
  onAddXP,
}) => {
  const [practicedPhrases, setPracticedPhrases] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Dialogues' },
    { id: 'greetings', label: 'Greetings (अभिवादन)' },
    { id: 'classroom', label: 'School & Classroom (कक्षा)' },
    { id: 'daily', label: 'Daily Life (रोज़मर्रा)' },
  ];

  const filtered = filterCategory === 'all'
    ? PHRASES_LIST
    : PHRASES_LIST.filter(p => p.category === filterCategory);

  const markPracticed = (id: string) => {
    if (!practicedPhrases.includes(id)) {
      setPracticedPhrases([...practicedPhrases, id]);
      onAddXP(20);
      soundFx.playSuccess();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          नमस्ते
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>Level 4</span>
            <span>•</span>
            <span>Real-World Speech</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            बोलचाल के वाक्य (Daily Conversations & Phrases)
          </h2>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
            Learn real Hindi sentences you can speak with your teachers, friends, and family! Use the audio buttons to master the natural cadence and inflection.
          </p>

          <div className="flex items-center gap-3 mt-4 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1.5 rounded-xl">
              {PHRASES_LIST.length} Practical Phrases
            </span>
            <span className="bg-emerald-400/30 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300/40">
              ✓ {practicedPhrases.length} Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterCategory(c.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
              filterCategory === c.id
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Interactive Dialogue Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((phrase, idx) => {
          const isDone = practicedPhrases.includes(phrase.id);

          return (
            <div
              key={phrase.id}
              className={`fun-card bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                isDone
                  ? 'border-purple-300 shadow-md bg-gradient-to-b from-white to-purple-50/20'
                  : 'border-slate-200 hover:border-purple-300 shadow-xs hover:shadow-lg'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                      #{idx + 1}
                    </div>
                    <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                      {phrase.category}
                    </span>
                  </div>

                  <AudioButton
                    text={phrase.hindi}
                    slow={slowAudio}
                    size="md"
                    label="Listen"
                    onPlayed={() => markPracticed(phrase.id)}
                  />
                </div>

                {/* Hindi Phrase */}
                <div className="font-devanagari font-black text-2xl sm:text-3xl text-slate-800 leading-snug">
                  {phrase.hindi}
                </div>

                {/* Transliteration */}
                {showPhonetics && (
                  <div className="text-sm font-semibold text-purple-700 mt-1">
                    🗣️ {phrase.transliteration}
                  </div>
                )}

                {/* English Translation */}
                <div className="text-sm font-bold text-slate-600 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  🇬🇧 "{phrase.english}"
                </div>

                {/* Grammar / Culture Tip */}
                {phrase.tip && (
                  <div className="flex items-start gap-2 mt-3 text-xs text-slate-500 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/50">
                    <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>{phrase.tip}</span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <SpeakingMic
                  targetHindi={phrase.hindi}
                  onSuccess={() => markPracticed(phrase.id)}
                />

                {isDone && (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCheck size={16} /> Mastered!
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
