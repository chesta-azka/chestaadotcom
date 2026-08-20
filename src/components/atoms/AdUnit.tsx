import { useEffect } from 'react';

interface AdUnitProps {
  slot: string;
}

export const AdUnit = ({ slot }: AdUnitProps) => {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [slot]);

  return (
    <div className="my-8 flex justify-center overflow-hidden border border-slate-100 rounded-2xl bg-white/[0.02]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={(import.meta as any).env?.VITE_AD_PUBLISHER_ID || ''}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
