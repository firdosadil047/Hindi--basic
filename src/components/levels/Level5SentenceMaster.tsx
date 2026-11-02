import React, { useState, useEffect } from 'react';
import { SENTENCE_PUZZLES } from '../../data/hindiData';
import { SentenceItem } from '../../types';
import { AudioButton } from '../AudioButton';
import { SpeakingMic } from '../SpeakingMic';
import { soundFx, speakHindi } from '../../utils/speech';
import { CheckCircle2, RotateCcw, ArrowRight, Lightbulb, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level5SentenceMasterProps {
  showPhonetics: boolean;
  slowAudio: boolean;
  onAddXP: (points: number) => void;
}

export const Level5SentenceMaster: React.FC<Level5SentenceMasterProps> = ({
  showPhonetics,
  slowAudio,
  onAddXP,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWordIndices, setSelectedWordIndices] = useState<number[]>([]);
  const [shuffledWords, setShuffledWords] = useState<{ word: string; originalIdx: number }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [solvedCount, setSolvedCount] = useState(0);

  const currentPuzzle = SENTENCE_PUZZLES[currentIndex];

  // Shuffle words whenever current puzzle changes
  useEffect(() => {
    if (!currentPuzzle) return;
    const mapped = currentPuzzle.words.map((w, idx) => ({ word: w, originalIdx: idx }));
    // Deterministic shuffle or random shuffle
    const shuffled = [...mapped].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setSelectedWordIndices([]);
    setIsCompleted(false);
    setIsWrong(false);
  }, [currentIndex]);

  const handleTileClick = (indexInShuffled: number) => {
    if (isCompleted) return;
    if (selectedWordIndices.includes(indexInShuffled)) return;

    soundFx.playClick();
    const newSelected = [...selectedWordIndices, indexInShuffled];
    setSelectedWordIndices(newSelected);

    // If user has picked all tiles, verify
    if (newSelected.length === currentPuzzle.words.length) {
      const assembledSentence = newSelected.map(idx => shuffledWords[idx].word).join(' ');
      const correctSentence = currentPuzzle.words.join(' ');

      if (assembledSentence === correctSentence) {
        setIsCompleted(true);
        setIsWrong(false);
        soundFx.playSuccess();
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setSolvedCount(prev => prev + 1);
        onAddXP(30);

        // Speak assembled sentence
        setTimeout(() => {
          speakHindi(currentPuzzle.hindi);
        }, 300);
      } else {
        setIsWrong(true);
        soundFx.playWrong();
      }
    }
  };

  const removeLastTile = () => {
    if (isCompleted || selectedWordIndices.length === 0) return;
    soundFx.playClick();
    setSelectedWordIndices(selectedWordIndices.slice(0, -1));
    setIsWrong(false);
  };

  const resetCurrentPuzzle = () => {
    soundFx.playClick();
    setSelectedWordIndices([]);
    setIsWrong(false);
  };

  const nextPuzzle = () => {
    if (currentIndex < SENTENCE_PUZZLES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          वाक्य
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <span>Level 5</span>
            <span>•</span>
            <span>Grammar & Logic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            वाक्य निर्माण (Sentence Puzzle Builder)
          </h2>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Hindi follows <strong>Subject + Object + Verb (SOV)</strong> order. Tap the word blocks below in the correct order to construct the Hindi sentence!
          </p>

          <div className="flex items-center gap-3 mt-4 text-xs font-bold">
            <span className="bg-white/20 px-3 py-1.5 rounded-xl">
              Puzzle {currentIndex + 1} of {SENTENCE_PUZZLES.length}
            </span>
            <span className="bg-emerald-400/30 text-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300/40">
              🏆 {solvedCount} Solved
            </span>
          </div>
        </div>
      </div>

      {/* Main Puzzle Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-100 shadow-xl space-y-6">
        {/* Target English sentence */}
        <div className="text-center">
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
            Translate into Hindi:
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            "{currentPuzzle.english}"
          </h3>
          {showPhonetics && (
            <p className="text-xs text-slate-400 font-medium mt-1">
              Phonetic target: {currentPuzzle.transliteration}
            </p>
          )}
        </div>

        {/* Sentence Assembly Zone (Drop Slot) */}
        <div
          className={`min-h-[90px] rounded-2xl border-2 border-dashed p-4 flex flex-wrap items-center justify-center gap-2 transition-all ${
            isCompleted
              ? 'border-emerald-400 bg-emerald-50/60'
              : isWrong
              ? 'border-red-400 bg-red-50/60'
              : 'border-slate-300 bg-slate-50/70'
          }`}
        >
          {selectedWordIndices.length === 0 ? (
            <span className="text-slate-400 font-semibold text-sm select-none">
              Tap the Hindi words below to place them here...
            </span>
          ) : (
            selectedWordIndices.map((idxInShuffled, pos) => {
              const item = shuffledWords[idxInShuffled];
              return (
                <button
                  key={pos}
                  onClick={removeLastTile}
                  className="px-4 py-2.5 rounded-2xl bg-white border-2 border-rose-300 text-rose-900 font-devanagari font-black text-xl shadow-sm hover:border-red-400 transition-all cursor-pointer animate-pulseFast"
                  title="Click to remove"
                >
                  {item.word}
                </button>
              );
            })
          )}
        </div>

        {/* Status Message */}
        {isCompleted && (
          <div className="bg-emerald-100 text-emerald-800 p-4 rounded-2xl flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={24} className="text-emerald-600 shrink-0" />
              <div>
                <p className="font-extrabold text-sm">शानदार! (Perfect Sentence!)</p>
                <p className="text-xs text-emerald-700">{currentPuzzle.hindi}</p>
              </div>
            </div>
            <AudioButton text={currentPuzzle.hindi} size="md" label="Listen" />
          </div>
        )}

        {isWrong && (
          <div className="bg-red-100 text-red-800 p-3 rounded-2xl text-center text-xs font-bold animate-wiggle">
            ❌ Not quite right! Click "Clear" or tap the tiles to reorder them.
          </div>
        )}

        {/* Word Tiles Selection Pool */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-3 text-center">
            Word Bank (Tap in order):
          </label>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {shuffledWords.map((item, idx) => {
              const isUsed = selectedWordIndices.includes(idx);
              return (
                <button
                  key={idx}
                  disabled={isUsed || isCompleted}
                  onClick={() => handleTileClick(idx)}
                  className={`px-5 py-3 rounded-2xl font-devanagari font-black text-xl transition-all shadow-sm ${
                    isUsed
                      ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed scale-95'
                      : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-2 border-rose-200 hover:border-rose-400 active:scale-95 hover:shadow-md'
                  }`}
                >
                  {item.word}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grammar Tip Box */}
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3">
          <Lightbulb size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700">
            <span className="font-bold text-amber-900 block mb-0.5">💡 Grammar Hint:</span>
            {currentPuzzle.grammarTip}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={resetCurrentPuzzle}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
          >
            <RotateCcw size={14} /> Clear / Retry
          </button>

          <button
            onClick={nextPuzzle}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white rounded-2xl font-black text-sm shadow-md shadow-rose-200 active:scale-95 transition-all"
          >
            <span>Next Puzzle</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
