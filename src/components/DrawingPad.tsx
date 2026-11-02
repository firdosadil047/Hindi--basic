import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, Volume2, CheckCircle2, Pencil } from 'lucide-react';
import { speakHindi } from '../utils/speech';
import confetti from 'canvas-confetti';

interface DrawingPadProps {
  letter: string;
  transliteration: string;
  onClose?: () => void;
}

export const DrawingPad: React.FC<DrawingPadProps> = ({
  letter,
  transliteration,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#ea580c'); // Vibrant orange
  const [brushSize, setBrushSize] = useState(12);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const celebratePractice = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    speakHindi(`शाबाश! आपने ${letter} लिख लिया!`);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-orange-100 flex flex-col items-center max-w-md w-full">
      <div className="flex justify-between items-center w-full mb-3">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
            ✍️ Trace & Write Practice
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            Write Letter: <span className="text-orange-600">{letter}</span> ({transliteration})
          </h3>
        </div>
        <button
          onClick={() => speakHindi(letter)}
          className="p-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-full transition-colors"
          title="Listen sound"
        >
          <Volume2 size={20} />
        </button>
      </div>

      {/* Drawing Board with Background Letter Outline */}
      <div className="relative w-full aspect-square max-w-[320px] bg-slate-50 rounded-2xl border-2 border-dashed border-orange-300 overflow-hidden shadow-inner flex items-center justify-center select-none">
        {/* Background Guide Letter for Tracing */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-slate-200/90 font-extrabold text-[160px] leading-none font-devanagari">
          {letter}
        </div>

        {/* Tracing Stroke Grid Line */}
        <div className="absolute top-1/4 w-full border-t border-slate-200/60 pointer-events-none"></div>
        <div className="absolute top-1/2 w-full border-t border-slate-200/60 pointer-events-none"></div>
        <div className="absolute top-3/4 w-full border-t border-slate-200/60 pointer-events-none"></div>

        {/* Actual Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full relative z-10 cursor-crosshair touch-none"
        />
      </div>

      {/* Palette & Controls */}
      <div className="flex items-center justify-between w-full mt-4 gap-2">
        {/* Color buttons */}
        <div className="flex items-center gap-1.5">
          {['#ea580c', '#2563eb', '#16a34a', '#9333ea'].map((color) => (
            <button
              key={color}
              onClick={() => setStrokeColor(color)}
              style={{ backgroundColor: color }}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${
                strokeColor === color ? 'border-white ring-2 ring-slate-800 scale-110' : 'border-transparent'
              }`}
              title="Pick brush color"
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            <RotateCcw size={14} /> Clear
          </button>
          <button
            onClick={celebratePractice}
            disabled={!hasDrawn}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
              hasDrawn
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={15} /> Check!
          </button>
        </div>
      </div>
    </div>
  );
};
