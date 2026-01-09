import { ImageResponse } from 'next/og';

// Favicon generator for BN logo (house outline with BN letters)
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#1a1a1a', // Dark charcoal grey background
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16%', // Rounded corners
          border: '3px solid #f5f5dc', // Light beige border
          position: 'relative',
        }}
      >
        {/* House outline */}
        <svg
          width="380"
          height="380"
          viewBox="0 0 380 380"
          style={{
            position: 'absolute',
          }}
        >
          {/* House outline path - pentagon shape */}
          <path
            d="M 60 320 L 60 200 L 190 80 L 320 200 L 320 320 Z"
            fill="none"
            stroke="#d4af37" // Bronze/golden brown color
            strokeWidth="20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* BN Letters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#d4af37', // Bronze/golden brown
            fontWeight: 'bold',
            fontFamily: 'system-ui, sans-serif',
            letterSpacing: '-0.05em',
            fontSize: '140px',
            marginTop: '20px',
          }}
        >
          BN
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
