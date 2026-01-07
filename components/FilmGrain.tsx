"use client";

import React from "react";

export const FilmGrain: React.FC = () => {
  return (
    <div className="film-grain">
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "url(#noise)" }}
      >
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
              type="fractalNoise"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.4)" />
      </svg>
    </div>
  );
};

