import React from 'react';
import { Sparkles, Flame, Eye, EyeOff, Volume2, Award, BookOpen } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  showPhonetics: boolean;
  setShowPhonetics: (val: boolean) => void;
  slowAudio: boolean;
  setSlowAudio: (val: boolean) => void;
  onResetProgress?: () => void;
  activeLevel: number;
  setActiveLevel: (lvl: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  showPhonetics,
  setShowPhonetics,
  slowAudio,
  setSlowAudio,
  activeLevel,
  setActiveLevel,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => setActiveLevel(1)}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 flex items-center justify-center text-2xl shadow-md shadow-orange-200 transform hover:scale-105 transition-transform">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-slate-800">
                  नमस्ते <span className="text-orange-600">Hindi</span>
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                  For Students
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Learn Hindi fast, fun, and easy with native audio 🎧
              </p>
            </div>
          </div>

          {/* Gamification Bar: XP, Streak, Toggles */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            {/* XP Points */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 font-bold text-sm shadow-xs">
              <Sparkles size={16} className="text-amber-500 fill-amber-400 animate-pulse" />
              <span>{stats.xp} XP</span>
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-2xl text-orange-800 font-bold text-sm shadow-xs">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span>{stats.streak} Day Streak</span>
            </div>

            {/* Phonetic / English Hint Toggle */}
            <button
              onClick={() => setShowPhonetics(!showPhonetics)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
                showPhonetics
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Toggle English pronunciation guides"
            >
              {showPhonetics ? <Eye size={15} /> : <EyeOff size={15} />}
              <span className="hidden md:inline">English Hints:</span>
              <span>{showPhonetics ? 'ON' : 'OFF'}</span>
            </button>

            {/* Audio Speed Mode (Normal vs 🐢 Slow) */}
            <button
              onClick={() => setSlowAudio(!slowAudio)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all border ${
                slowAudio
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
              title="Switch between Normal and Slow pronunciation speed for clearer audio"
            >
              <Volume2 size={15} />
              <span>{slowAudio ? '🐢 Slow Audio (0.7x)' : '⚡ Normal Speed'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
