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
    // 테스트 모드에서는 AdSense 로드하지 않음
    if (TEST_MODE) {
      return;
    }

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

  // 테스트 모드: 실제 광고 사이즈의 플레이스홀더 표시
  if (TEST_MODE) {
    // style prop에서 width와 height 추출
    const width = style?.width || (responsive ? '100%' : 'auto');
    const height = style?.height || '90px';
    const display = style?.display || 'block';

    return (
      <div className="relative" style={{ width, height, display }}>
        <div
          className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50
                     border-2 border-dashed border-blue-300 rounded-lg
                     flex flex-col items-center justify-center gap-2
                     text-blue-600 font-medium shadow-sm"
        >
          <div className="text-2xl">📢</div>
          <div className="text-sm">AdSense 테스트 광고</div>
          <div className="text-xs text-blue-400">
            {width} × {height}
          </div>
        </div>
        <div className="absolute -top-5 left-0 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded shadow-sm">
          ⚠️ 테스트 모드 (부정클릭 방지)
        </div>
      </div>
    );
  }

  // 프로덕션 모드: 실제 AdSense 광고
  return (
    <ins
      className="adsbygoogle"
      style={style || { display: 'block' }}
      data-ad-client={adClient}
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
