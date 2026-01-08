"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  alt: string;
}

export function ComparisonSlider({ beforeImage, afterImage, alt }: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-border group select-none"
         onMouseDown={() => setIsDragging(true)}
         onMouseUp={() => setIsDragging(false)}>
      
      {/* 1. After Image (Background) */}
      <Image src={afterImage} alt={`After ${alt}`} fill className="object-cover" />

      {/* 2. Before Image (Clipped overlay) */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden" 
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image src={beforeImage} alt={`Before ${alt}`} fill className="object-cover" />
      </div>

      {/* 3. The Handle Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-lg">
           <ChevronsLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* 4. Invisible Range Input (The Logic) */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-2 py-1 text-[10px] uppercase font-mono tracking-widest rounded-sm pointer-events-none">Before</div>
      <div className="absolute top-4 right-4 bg-primary text-white px-2 py-1 text-[10px] uppercase font-mono tracking-widest rounded-sm pointer-events-none">After</div>
    </div>
  );
}

