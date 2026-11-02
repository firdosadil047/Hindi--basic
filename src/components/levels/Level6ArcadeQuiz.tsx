import React, { useState } from 'react';
import { ARCADE_QUIZZES, HINDI_PRAISE } from '../../data/hindiData';
import { QuizQuestion } from '../../types';
import { AudioButton } from '../AudioButton';
import { soundFx, speakHindi } from '../../utils/speech';
import { Trophy, Heart, Sparkles, CheckCircle2, XCircle, RotateCcw, Volume2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level6ArcadeQuizProps {
  slowAudio: boolean;
  onAddXP: (points: number) => void;
  onLevelComplete: (levelId: number, stars: number) => void;
}

export const Level6ArcadeQuiz: React.FC<Level6ArcadeQuizProps> = ({
  slowAudio,
  onAddXP,
  onLevelComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [praiseText, setPraiseText] = useState('');

  const currentQ = ARCADE_QUIZZES[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isAnswered || gameOver || quizFinished) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      soundFx.playSuccess();
      const randomPraise = HINDI_PRAISE[Math.floor(Math.random() * HINDI_PRAISE.length)];
      setPraiseText(randomPraise);
      setScore(prev => prev + 1);
      onAddXP(25);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFx.playWrong();
      setLives(prev => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setGameOver(true);
        }
        return nextLives;
      });
    }
  };

  const handleNext = () => {
    if (currentIdx < ARCADE_QUIZZES.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setPraiseText('');
    } else {
      // Finished all questions
      setQuizFinished(true);
      soundFx.playFanfare();
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.5 } });
      const stars = score >= 8 ? 3 : score >= 5 ? 2 : 1;
      onLevelComplete(6, stars);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setQuizFinished(false);
    setPraiseText('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 text-9xl opacity-10 font-bold select-none pointer-events-none">
          🏆
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <span>Level 6</span>
              <span>•</span>
              <span>Ultimate Challenge</span>
            </div>
            <h2 className="text-3xl font-black">
              महासंग्राम क्विज़ (Arcade Challenge)
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              Test your ear, recognize vocabulary, and earn stars!
            </p>
          </div>

          {/* Lives & Score Counter */}
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((heart) => (
                <Heart
                  key={heart}
                  size={18}
                  className={
                    heart <= lives
                      ? 'text-red-500 fill-red-500 animate-pulse'
                      : 'text-slate-400'
                  }
                />
              ))}
            </div>
            <div className="h-4 w-px bg-white/30"></div>
            <div className="text-sm font-black flex items-center gap-1">
              <Trophy size={16} className="text-yellow-300" />
              <span>{score}/{ARCADE_QUIZZES.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Area */}
      {!gameOver && !quizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-yellow-200 shadow-xl space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-amber-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / ARCADE_QUIZZES.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Header */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Question {currentIdx + 1} of {ARCADE_QUIZZES.length}
            </span>

            {currentQ.emoji && (
              <div className="text-6xl animate-bounceSlight my-2">{currentQ.emoji}</div>
            )}

            <h3 className="text-xl sm:text-2xl font-black text-slate-800">
              {currentQ.prompt}
            </h3>

            {/* Audio Button if question has audio */}
            {currentQ.audioText && (
              <div className="pt-2 flex justify-center">
                <AudioButton
                  text={currentQ.audioText}
                  slow={slowAudio}
                  size="xl"
                  label="Play Sound 🔊"
                />
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              const isCorrectOpt = opt === currentQ.correctAnswer;

              let btnStyle = 'bg-slate-50 hover:bg-amber-50/60 text-slate-800 border-2 border-slate-200 hover:border-amber-300';

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-900 font-black shadow-md';
                } else if (isSelected) {
                  btnStyle = 'bg-red-100 border-2 border-red-500 text-red-900 font-bold';
                } else {
                  btnStyle = 'opacity-40 bg-slate-50 border-slate-200';
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl font-devanagari text-lg sm:text-xl font-bold transition-all flex items-center justify-between text-left ${btnStyle} active:scale-98`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && <CheckCircle2 size={20} className="text-emerald-600" />}
                  {isAnswered && isSelected && !isCorrectOpt && <XCircle size={20} className="text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border text-sm animate-fade-in ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="font-black text-base mb-1">
                {selectedOption === currentQ.correctAnswer ? praiseText : 'गलत! (Incorrect)'}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-black text-sm shadow-md active:scale-95 transition-all"
              >
                <span>{currentIdx < ARCADE_QUIZZES.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      ) : gameOver ? (
        /* Game Over Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-red-200 shadow-xl text-center space-y-4">
          <div className="text-6xl">💔</div>
          <h3 className="text-3xl font-black text-slate-800">You ran out of hearts!</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Don't worry! Every mistake helps you learn Hindi faster. Let's try once more!
          </p>
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold shadow-md active:scale-95 transition-all"
          >
            <RotateCcw size={18} /> Try Again
          </button>
        </div>
      ) : (
        /* Victory & Results Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-5">
          <div className="text-7xl">🎉</div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-800">
            शानदार! Quiz Completed!
          </h3>
          <p className="text-slate-600 font-medium">
            You scored <strong className="text-amber-600 text-xl">{score}</strong> out of{' '}
            <strong className="text-slate-800 text-xl">{ARCADE_QUIZZES.length}</strong>!
          </p>

          <div className="flex items-center justify-center gap-2 text-4xl text-amber-400">
            <span>⭐</span>
            <span>⭐</span>
            <span>{score >= 8 ? '⭐' : '☆'}</span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black shadow-md active:scale-95 transition-all"
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
