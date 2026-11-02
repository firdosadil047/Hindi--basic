import React, { useState, useEffect } from 'react';
import { Mic, MicOff, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/speech';
import confetti from 'canvas-confetti';

interface SpeakingMicProps {
  targetHindi: string;
  onSuccess?: () => void;
  className?: string;
}

// Declaration for SpeechRecognition
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export const SpeakingMic: React.FC<SpeakingMicProps> = ({
  targetHindi,
  onSuccess,
  className = '',
}) => {
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'listening' | 'success' | 'retry'>('idle');
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const win = window as unknown as IWindow;
    if (!win.SpeechRecognition && !win.webkitSpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const startListening = () => {
    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setStatus('retry');
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'hi-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('listening');
        setSpokenText(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        setSpokenText(transcript);

        // Normalize Hindi comparison (strip spaces / punctuation)
        const cleanTarget = targetHindi.replace(/[^\u0900-\u097F]/g, '');
        const cleanSpoken = transcript.replace(/[^\u0900-\u097F]/g, '');

        if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken) || cleanSpoken.length > 0) {
          setStatus('success');
          soundFx.playSuccess();
          confetti({ particleCount: 40, spread: 55, origin: { y: 0.7 } });
          onSuccess?.();
        } else {
          setStatus('retry');
          soundFx.playWrong();
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsListening(false);
        setStatus('retry');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.warn('Speech Recognition init failed:', err);
      setIsListening(false);
      setStatus('retry');
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        onClick={startListening}
        disabled={isListening}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-bold text-xs transition-all ${
          isListening
            ? 'bg-red-500 text-white animate-pulse shadow-lg ring-4 ring-red-200'
            : status === 'success'
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm active:scale-95'
        }`}
        title="Tap to speak in Hindi and check your pronunciation"
      >
        {isListening ? (
          <>
            <Mic className="animate-spin text-white" size={16} />
            <span>Listening... Speak now!</span>
          </>
        ) : status === 'success' ? (
          <>
            <CheckCircle size={16} className="text-emerald-600" />
            <span>Well Said! / शाबाश!</span>
          </>
        ) : (
          <>
            <Mic size={16} />
            <span>Practice Speaking</span>
          </>
        )}
      </button>

      {spokenText && (
        <span className="text-xs text-slate-500 bg-white/80 px-2 py-0.5 rounded-lg border border-slate-200 shadow-xs">
          You said: <strong className="text-slate-800">{spokenText}</strong>
        </span>
      )}

      {status === 'retry' && (
        <span className="text-[11px] text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
          <AlertCircle size={12} /> Try again clearly!
        </span>
      )}
    </div>
  );
};
