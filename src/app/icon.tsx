import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #8b5cf6 0%, #4f46e5 100%)',
          borderRadius: 7,
          color: '#ffffff',
          fontSize: 20,
          fontWeight: 800,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}
      >
        O
      </div>
    ),
    {
      ...size,
    }
  );
}
