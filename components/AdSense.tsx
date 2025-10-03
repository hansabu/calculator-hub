import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

export function AdSense({ slot, format, responsive = false, style }: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client="ca-pub-4916365137102022"
      data-ad-slot={slot}
      data-ad-format={format || 'auto'}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
