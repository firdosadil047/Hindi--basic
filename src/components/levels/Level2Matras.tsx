import React, { useState } from 'react';
import { MATRA_LIST, TWO_LETTER_WORDS } from '../../data/hindiData';
import { MatraItem, WordItem } from '../../types';
import { AudioButton } from '../AudioButton';
import { SpeakingMic } from '../SpeakingMic';
import { speakHindi, soundFx } from '../../utils/speech';
import { Sparkles, Layers, Plus, BookOpen, Volume2, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level2MatrasProps {
  showPhonetics: boolean;
  slowAudio: boolean;
  onAddXP: (points: number) => void;
}

export const Level2Matras: React.FC<Level2MatrasProps> = ({
  showPhonetics,
  slowAudio,
  onAddXP,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'matras' | 'builder' | 'words'>('matras');
  const [selectedConsonant, setSelectedConsonant] = useState('क');
  const [selectedMatra, setSelectedMatra] = useState(MATRA_LIST[0]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);

  const sampleConsonants = ['क', 'ख', 'ग', 'च', 'त', 'न', 'प', 'म', 'र', 'ल', 'स', 'ह'];

  // Combine consonant + matra
  const getCombinedChar = (cons: string, matra: MatraItem) => {
    // If it's a matra like ा, ि, ी, etc.
    return cons + matra.matra;
  };

  const handleWordLearned = (wordId: string) => {
    if (!completedWords.includes(wordId)) {
      setCompletedWords([...completedWords, wordId]);
      onAddXP(15);
      soundFx.playSuccess();
    }
  };

  const combinedOutput = getCombinedChar(selectedConsonant, selectedMatra);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          का कि
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>Level 2</span>
            <span>•</span>
            <span>Vowel Signs & Words</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            मात्राएँ और सरल शब्द (Matras & Word Magic)
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            In Hindi, vowels take the form of <strong className="text-white underline">मात्रा (Matras)</strong> to change how consonants sound. Learn the formulas and build your first Hindi words with sound!
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-xs border border-emerald-100 max-w-md">
        <button
          onClick={() => setActiveSubTab('matras')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSubTab === 'matras'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          10 मात्राएँ (Matras)
        </button>
        <button
          onClick={() => setActiveSubTab('builder')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSubTab === 'builder'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ✨ Syllable Builder
        </button>
        <button
          onClick={() => setActiveSubTab('words')}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeSubTab === 'words'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          सरल शब्द (First Words)
        </button>
      </div>

      {/* SECTION 1: MATRAS CARDS */}
      {activeSubTab === 'matras' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MATRA_LIST.map((m) => (
            <div
              key={m.id}
              className="fun-card bg-white rounded-3xl p-5 border-2 border-emerald-100 hover:border-emerald-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Vowel: {m.vowel}
                </span>
                <AudioButton
                  text={`${m.exampleWithKa}, ${m.sampleWord}`}
                  slow={slowAudio}
                  size="sm"
                  onPlayed={() => onAddXP(5)}
                />
              </div>

              {/* Matra Symbol & Example with Ka */}
              <div className="text-center my-4">
                <div className="flex items-center justify-center gap-2 text-slate-400 text-lg font-bold">
                  <span className="font-devanagari text-2xl text-slate-700">क</span>
                  <span>+</span>
                  <span className="font-devanagari text-3xl text-emerald-600 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
                    {m.matra}
                  </span>
                  <span>=</span>
                </div>
                <div className="font-devanagari font-black text-5xl text-slate-900 mt-2">
                  {m.exampleWithKa}
                </div>
                {showPhonetics && (
                  <span className="inline-block mt-1 font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {m.exampleTranslit}
                  </span>
                )}
                <p className="text-[11px] text-slate-500 font-medium mt-1">
                  {m.name}
                </p>
              </div>

              {/* Sample Word */}
              <div className="bg-emerald-50/60 rounded-2xl p-3 border border-emerald-100 text-center">
                <div className="text-2xl mb-1">{m.emoji}</div>
                <div className="font-bold text-slate-800 font-devanagari text-base">
                  {m.sampleWord}
                </div>
                {showPhonetics && (
                  <div className="text-[11px] text-slate-500 font-medium">
                    {m.sampleWordTranslit}
                  </div>
                )}
                <div className="text-xs text-emerald-800 font-extrabold mt-0.5">
                  = {m.sampleWordMeaning}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: INTERACTIVE SYLLABLE BUILDER */}
      {activeSubTab === 'builder' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-xl max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
              ✨ Interactive Sound Lab
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-2">
              Pick a Consonant + Any Matra to Hear the Combined Sound!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Test how any letter transforms when you add different vowel markers.
            </p>
          </div>

          {/* Consonant Picker */}
          <div className="mb-5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
              1. Choose Consonant (व्यंजन):
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleConsonants.map((cons) => (
                <button
                  key={cons}
                  onClick={() => {
                    setSelectedConsonant(cons);
                    soundFx.playClick();
                  }}
                  className={`w-11 h-11 rounded-2xl font-devanagari font-black text-xl transition-all ${
                    selectedConsonant === cons
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-110 ring-2 ring-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cons}
                </button>
              ))}
            </div>
          </div>

          {/* Matra Picker */}
          <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
              2. Choose Matra (मात्रा):
            </label>
            <div className="flex flex-wrap gap-2">
              {MATRA_LIST.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMatra(m);
                    soundFx.playClick();
                  }}
                  className={`px-3 py-2 rounded-2xl font-devanagari font-black text-lg transition-all flex items-center gap-1.5 ${
                    selectedMatra.id === m.id
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-200 scale-105 ring-2 ring-teal-300'
                      : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200'
                  }`}
                >
                  <span>{m.vowel}</span>
                  <span className="text-xs font-sans opacity-80">({m.matra})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Big Result Display */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 rounded-3xl p-6 border-2 border-emerald-300 text-center flex flex-col items-center">
            <div className="flex items-center gap-3 text-2xl font-bold text-slate-600 mb-2">
              <span className="font-devanagari text-4xl text-slate-800">{selectedConsonant}</span>
              <span>+</span>
              <span className="font-devanagari text-4xl text-emerald-600">{selectedMatra.matra}</span>
              <span>=</span>
            </div>

            <div className="font-devanagari font-black text-7xl sm:text-8xl text-emerald-700 my-2 tracking-wide drop-shadow-sm">
              {combinedOutput}
            </div>

            <p className="text-sm font-semibold text-slate-600 mb-4">
              Combined Syllable Sound ({selectedMatra.name})
            </p>

            <div className="flex items-center gap-3">
              <AudioButton
                text={combinedOutput}
                slow={slowAudio}
                size="xl"
                label="Listen Sound 🔊"
                onPlayed={() => {
                  onAddXP(10);
                  confetti({ particleCount: 30, spread: 45, origin: { y: 0.8 } });
                }}
              />
              <SpeakingMic targetHindi={combinedOutput} />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 2 & 3 LETTER WORDS WITH BREAKDOWN */}
      {activeSubTab === 'words' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TWO_LETTER_WORDS.map((w) => {
            const isDone = completedWords.includes(w.id);

            return (
              <div
                key={w.id}
                className={`fun-card bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between ${
                  isDone
                    ? 'border-emerald-300 shadow-md bg-gradient-to-b from-white to-emerald-50/20'
                    : 'border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{w.emoji}</span>
                  <AudioButton
                    text={w.hindi}
                    slow={slowAudio}
                    size="md"
                    onPlayed={() => handleWordLearned(w.id)}
                  />
                </div>

                {/* Syllable Breakdown equation */}
                {w.breakdown && (
                  <div className="flex items-center justify-center gap-1.5 my-3 bg-slate-50 py-1.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500">
                    {w.breakdown.map((part, idx) => (
                      <React.Fragment key={idx}>
                        <span className="font-devanagari text-slate-800 text-base">{part}</span>
                        {idx < w.breakdown!.length - 1 && <span>+</span>}
                      </React.Fragment>
                    ))}
                    <span>=</span>
                  </div>
                )}

                {/* Full Word */}
                <div className="text-center my-2">
                  <div className="font-devanagari font-black text-4xl text-slate-900 tracking-wide">
                    {w.hindi}
                  </div>
                  {showPhonetics && (
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      /{w.transliteration}/
                    </div>
                  )}
                  <div className="text-sm font-bold text-slate-600 mt-1">
                    {w.english}
                  </div>
                </div>

                {/* Practice Mic */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-center">
                  <SpeakingMic
                    targetHindi={w.hindi}
                    onSuccess={() => handleWordLearned(w.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
