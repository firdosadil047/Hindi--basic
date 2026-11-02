import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { speakHindi, stopSpeaking } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'ghost' | 'bubble';
  label?: string;
  className?: string;
  slow?: boolean; // 0.7x speed for slower articulation
  onPlayed?: () => void;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  size = 'md',
  variant = 'primary',
  label,
  className = '',
  slow = false,
  onPlayed,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const rate = slow ? 0.65 : 0.88;
    speakHindi(text, {
      rate,
      pitch: 1.05,
      onStart: () => setIsPlaying(true),
      onEnd: () => {
        setIsPlaying(false);
        onPlayed?.();
      },
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2.5 text-sm gap-2',
    lg: 'px-4 py-2.5 text-base gap-2.5 shadow-md',
    xl: 'px-6 py-3.5 text-lg gap-3 shadow-lg font-bold',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
    xl: 26,
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-300 active:scale-95',
    secondary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 active:scale-95',
    ghost: 'bg-orange-100/70 hover:bg-orange-200 text-orange-700 active:scale-95',
    bubble: 'bg-white hover:bg-amber-50 text-amber-600 border-2 border-amber-300 shadow-sm hover:shadow active:scale-95',
  };

  return (
    <button
      onClick={handlePlay}
      type="button"
      title={`Listen to pronunciation: ${text}`}
      aria-label={`Listen to ${text}`}
      className={`inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 cursor-pointer select-none group relative overflow-hidden ${sizeClasses[size]} ${variantClasses[variant]} ${
        isPlaying ? 'ring-4 ring-orange-300 scale-105 animate-pulse' : ''
      } ${className}`}
    >
      {isPlaying ? (
        <span className="flex items-center gap-1.5">
          <span className="flex space-x-0.5 items-end h-4">
            <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms', height: '12px' }}></span>
            <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms', height: '16px' }}></span>
            <span className="w-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms', height: '10px' }}></span>
          </span>
          {label && <span>Playing...</span>}
        </span>
      ) : (
        <>
          <Volume2
            size={iconSizes[size]}
            className="transition-transform group-hover:scale-110 group-active:rotate-12"
          />
          {label && <span>{label}</span>}
          {slow && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-black/10">
              🐢 Slow
            </span>
          )}
        </>
      )}
    </button>
  );
};
