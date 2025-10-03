import { useEffect, useRef } from 'react';

interface AdSenseProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

// 테스트 모드 설정: true로 설정하면 Google 공식 테스트 광고가 표시됩니다
const TEST_MODE = true;

// Google AdSense 공식 테스트 광고 클라이언트 ID
const TEST_AD_CLIENT = 'ca-pub-3940256099942544';

// 실제 프로덕션 광고 클라이언트 ID
const PROD_AD_CLIENT = 'ca-pub-4916365137102022';

export function AdSense({ slot, format, responsive = false, style }: AdSenseProps) {
  const adRef = useRef<boolean>(false);

  // 테스트 모드일 때 사용할 클라이언트 ID
  const adClient = TEST_MODE ? TEST_AD_CLIENT : PROD_AD_CLIENT;

  useEffect(() => {
    // 이미 로드된 경우 중복 로드 방지
    if (adRef.current) {
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        // AdSense 스크립트 초기화
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current = true;
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="relative">
      {TEST_MODE && (
        <div className="absolute -top-6 left-0 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
          ⚠️ 테스트 광고 (부정클릭 방지)
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={style || { display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format || 'auto'}
        data-full-width-responsive={responsive ? 'true' : 'false'}
        data-adtest={TEST_MODE ? 'on' : 'off'}
      />
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
