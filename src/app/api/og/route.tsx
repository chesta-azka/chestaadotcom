import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Chestaa B2B Tech & AI Intelligence';
    const category = searchParams.get('category') || 'Executive Insight';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#0b0b0f',
            backgroundImage: 'radial-gradient(circle at 25% 25%, #1e1b4b 0%, #0b0b0f 75%)',
            padding: '60px',
            fontFamily: 'sans-serif',
            color: '#f8fafc',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
              <span style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.05em', color: '#ffffff' }}>chestaa.com</span>
            </div>
            <span style={{ fontSize: '18px', fontFamily: 'monospace', color: '#818cf8', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '9999px', backgroundColor: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
              {category}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
            <h1 style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#ffffff', margin: 0 }}>
              {title}
            </h1>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '24px' }}>
            <span style={{ fontSize: '20px', color: '#94a3b8' }}>Konsultan AI & Fractional CTO Tangerang & Jakarta</span>
            <span style={{ fontSize: '20px', fontFamily: 'monospace', color: '#6366f1' }}>chestaa.com/insights</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
