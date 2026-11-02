import React, { useState } from 'react';
import { SWAR_LIST, VYANJAN_LIST, HINDI_PRAISE } from '../../data/hindiData';
import { HindiChar } from '../../types';
import { AudioButton } from '../AudioButton';
import { DrawingPad } from '../DrawingPad';
import { SpeakingMic } from '../SpeakingMic';
import { soundFx } from '../../utils/speech';
import { Sparkles, Edit3, CheckCircle, HelpCircle, Volume2, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level1AlphabetProps {
  showPhonetics: boolean;
  slowAudio: boolean;
  onAddXP: (points: number) => void;
}

export const Level1Alphabet: React.FC<Level1AlphabetProps> = ({
  showPhonetics,
  slowAudio,
  onAddXP,
}) => {
  const [activeTab, setActiveTab] = useState<'swar' | 'vyanjan'>('swar');
  const [selectedForWriting, setSelectedForWriting] = useState<HindiChar | null>(null);
  const [learnedChars, setLearnedChars] = useState<string[]>([]);
  const [filterQuery, setFilterQuery] = useState('');

  const list = activeTab === 'swar' ? SWAR_LIST : VYANJAN_LIST;
  const filteredList = list.filter((item) =>
    item.char.includes(filterQuery) ||
    item.transliteration.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.exampleMeaning.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const markLearned = (id: string) => {
    if (!learnedChars.includes(id)) {
      setLearnedChars([...learnedChars, id]);
      onAddXP(10);
      soundFx.playSuccess();
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          अ क
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>Level 1</span>
            <span>•</span>
            <span>The Foundations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            वर्णमाला (Hindi Alphabet & Sounds)
          </h2>
          <p className="text-orange-100 text-sm sm:text-base leading-relaxed">
            Hindi is purely phonetic — what you read is exactly what you say! Click the{' '}
            <strong className="text-white underline">audio button</strong> to listen to each letter, practice handwriting, and speak into the mic.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1.5 rounded-xl">
              13 स्वर (Vowels)
            </span>
            <span className="bg-white/20 px-3 py-1.5 rounded-xl">
              30 व्यंजन (Consonants)
            </span>
            <span className="bg-emerald-400/30 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300/40">
              ✓ {learnedChars.length} / {SWAR_LIST.length + VYANJAN_LIST.length} Mastered
            </span>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-xs border border-orange-100 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('swar')}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'swar'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            स्वर (Vowels - {SWAR_LIST.length})
          </button>
          <button
            onClick={() => setActiveTab('vyanjan')}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'vyanjan'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            व्यंजन (Consonants - {VYANJAN_LIST.length})
          </button>
        </div>

        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Search letter, sound or word..."
          className="w-full sm:w-64 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-xs"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredList.map((item) => {
          const isLearned = learnedChars.includes(item.id);

          return (
            <div
              key={item.id}
              className={`fun-card bg-white rounded-3xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                isLearned
                  ? 'border-emerald-300 shadow-md bg-gradient-to-b from-white to-emerald-50/20'
                  : 'border-orange-100 hover:border-orange-300 shadow-xs hover:shadow-lg'
              }`}
            >
              {/* Top Bar inside card */}
              <div className="flex items-start justify-between">
                <span className="text-3xl select-none" role="img" aria-label={item.exampleMeaning}>
                  {item.emoji}
                </span>

                {/* Primary Audio Button */}
                <AudioButton
                  text={item.audioPrompt || item.char}
                  slow={slowAudio}
                  size="md"
                  onPlayed={() => markLearned(item.id)}
                />
              </div>

              {/* Main Letter Display */}
              <div className="text-center my-3">
                <span className="font-devanagari font-black text-6xl sm:text-7xl text-slate-800 tracking-wide block transition-transform group-hover:scale-105">
                  {item.char}
                </span>
                {showPhonetics && (
                  <span className="inline-block mt-1 font-bold text-sm text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    /{item.transliteration}/
                  </span>
                )}
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  {item.soundMnemonic}
                </p>
              </div>

              {/* Example Word Pill */}
              <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-3 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-bold text-slate-800 font-devanagari text-base">
                    {item.exampleWord}
                  </span>
                  {showPhonetics && (
                    <span className="text-xs text-slate-500 font-medium">
                      ({item.exampleTranslit})
                    </span>
                  )}
                </div>
                <span className="text-xs text-orange-700 font-bold block mt-0.5">
                  = {item.exampleMeaning}
                </span>
              </div>

              {/* Action Buttons: Practice Writing + Practice Speaking */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedForWriting(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Edit3 size={13} />
                    <span>Trace & Write</span>
                  </button>

                  <SpeakingMic
                    targetHindi={item.char}
                    onSuccess={() => markLearned(item.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Writing Pad Modal */}
      {selectedForWriting && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative">
            <button
              onClick={() => setSelectedForWriting(null)}
              className="absolute -top-3 -right-3 z-20 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-md"
            >
              <X size={18} />
            </button>
            <DrawingPad
              letter={selectedForWriting.char}
              transliteration={selectedForWriting.transliteration}
              onClose={() => setSelectedForWriting(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
