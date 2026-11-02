import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LevelSelector } from './components/LevelSelector';
import { Level1Alphabet } from './components/levels/Level1Alphabet';
import { Level2Matras } from './components/levels/Level2Matras';
import { Level3Vocabulary } from './components/levels/Level3Vocabulary';
import { Level4Conversations } from './components/levels/Level4Conversations';
import { Level5SentenceMaster } from './components/levels/Level5SentenceMaster';
import { Level6ArcadeQuiz } from './components/levels/Level6ArcadeQuiz';
import { UserStats } from './types';
import { soundFx } from './utils/speech';
import { ArrowLeft, ArrowRight, Sparkles, Volume2, Mic, Edit3, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'namaste_hindi_stats_v1';

export function App() {
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [showPhonetics, setShowPhonetics] = useState<boolean>(true);
  const [slowAudio, setSlowAudio] = useState<boolean>(false);

  // User Stats with localStorage persistence
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read saved stats', e);
    }
    return {
      xp: 120,
      streak: 3,
      completedLevels: [1],
      practicedWordsCount: 15,
      stars: { 1: 3, 2: 2 },
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Could not save stats', e);
    }
  }, [stats]);

  const addXP = (points: number) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + points,
    }));
  };

  const handleLevelComplete = (levelId: number, stars: number) => {
    setStats((prev) => {
      const completed = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];
      return {
        ...prev,
        completedLevels: completed,
        stars: {
          ...prev.stars,
          [levelId]: Math.max(prev.stars[levelId] || 0, stars),
        },
      };
    });
  };

  const goToNextLevel = () => {
    if (activeLevel < 6) {
      setActiveLevel(activeLevel + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      soundFx.playClick();
    }
  };

  const goToPrevLevel = () => {
    if (activeLevel > 1) {
      setActiveLevel(activeLevel - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      soundFx.playClick();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50/30 to-emerald-50">
      {/* Top Header */}
      <Header
        stats={stats}
        showPhonetics={showPhonetics}
        setShowPhonetics={setShowPhonetics}
        slowAudio={slowAudio}
        setSlowAudio={setSlowAudio}
        activeLevel={activeLevel}
        setActiveLevel={setActiveLevel}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Quick Student Feature Highlights Bar */}
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 border border-orange-100 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 font-semibold shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              🔊
            </span>
            <span>Click any Audio Button to hear authentic native Hindi sounds</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Edit3 size={14} className="text-orange-500" /> Trace Letters
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Mic size={14} className="text-indigo-500" /> Voice Mic Check
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Sparkles size={14} className="text-amber-500" /> Earn Stars & XP
            </span>
          </div>
        </div>

        {/* Level Map Roadmap */}
        <LevelSelector
          activeLevel={activeLevel}
          setActiveLevel={setActiveLevel}
          stats={stats}
        />

        {/* Current Active Level View */}
        <div className="mb-10">
          {activeLevel === 1 && (
            <Level1Alphabet
              showPhonetics={showPhonetics}
              slowAudio={slowAudio}
              onAddXP={addXP}
            />
          )}

          {activeLevel === 2 && (
            <Level2Matras
              showPhonetics={showPhonetics}
              slowAudio={slowAudio}
              onAddXP={addXP}
            />
          )}

          {activeLevel === 3 && (
            <Level3Vocabulary
              showPhonetics={showPhonetics}
              slowAudio={slowAudio}
              onAddXP={addXP}
            />
          )}

          {activeLevel === 4 && (
            <Level4Conversations
              showPhonetics={showPhonetics}
              slowAudio={slowAudio}
              onAddXP={addXP}
            />
          )}

          {activeLevel === 5 && (
            <Level5SentenceMaster
              showPhonetics={showPhonetics}
              slowAudio={slowAudio}
              onAddXP={addXP}
            />
          )}

          {activeLevel === 6 && (
            <Level6ArcadeQuiz
              slowAudio={slowAudio}
              onAddXP={addXP}
              onLevelComplete={handleLevelComplete}
            />
          )}
        </div>

        {/* Bottom Level Navigation */}
        <div className="border-t border-slate-200/80 pt-6 flex items-center justify-between pb-12">
          <button
            onClick={goToPrevLevel}
            disabled={activeLevel === 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${
              activeLevel === 1
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
            }`}
          >
            <ArrowLeft size={16} />
            <span>Previous Level</span>
          </button>

          <span className="text-xs font-bold text-slate-400">
            Level {activeLevel} of 6
          </span>

          <button
            onClick={goToNextLevel}
            disabled={activeLevel === 6}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-sm transition-all shadow-md active:scale-95 ${
              activeLevel === 6
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-200'
            }`}
          >
            <span>Next Level</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </main>

      {/* App Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span>🇮🇳 नमस्ते Hindi Learning App</span>
            <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
              Made for Students
            </span>
          </div>
          <p>
            Learn Hindi with interactive audio, vowel matras, handwriting practice & fun puzzles.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
