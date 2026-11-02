import React from 'react';
import { Star, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { LEVELS } from '../data/hindiData';
import { UserStats } from '../types';

interface LevelSelectorProps {
  activeLevel: number;
  setActiveLevel: (levelId: number) => void;
  stats: UserStats;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  activeLevel,
  setActiveLevel,
  stats,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <span>Learning Roadmap</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full">
              Level-Wise Progress
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Step-by-step path designed for fast comprehension and clear pronunciation
          </p>
        </div>
      </div>

      {/* Grid of Level Badges */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {LEVELS.map((lvl) => {
          const isActive = activeLevel === lvl.id;
          const isCompleted = stats.completedLevels.includes(lvl.id);
          const starsEarned = stats.stars[lvl.id] || 0;

          return (
            <button
              key={lvl.id}
              onClick={() => setActiveLevel(lvl.id)}
              className={`relative text-left p-3.5 rounded-3xl transition-all duration-300 flex flex-col justify-between border-2 ${
                isActive
                  ? 'bg-white border-orange-500 shadow-lg shadow-orange-100 ring-4 ring-orange-100 scale-102 z-10'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              {/* Header inside level card */}
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-2xl">{lvl.icon}</span>
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  Lvl {lvl.id}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-black text-xs sm:text-sm text-slate-800 line-clamp-1">
                  {lvl.hindiTitle}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                  {lvl.title}
                </p>
              </div>

              {/* Footer status / Stars */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((starIdx) => (
                    <Star
                      key={starIdx}
                      size={12}
                      className={
                        starIdx <= starsEarned
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-200'
                      }
                    />
                  ))}
                </div>
                {isCompleted ? (
                  <CheckCircle size={14} className="text-emerald-500" />
                ) : (
                  <span className="text-[10px] text-slate-400">{lvl.itemsCount} items</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
