import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'

// 테스트 모드 설정 (AdSense.tsx와 동일하게 유지)
const TEST_MODE = true;

// Google AdSense 공식 테스트 광고 클라이언트 ID
const TEST_AD_CLIENT = 'ca-pub-3940256099942544';

// 실제 프로덕션 광고 클라이언트 ID
const PROD_AD_CLIENT = 'ca-pub-4916365137102022';

export default function App({ Component, pageProps }: AppProps) {
  const adClient = TEST_MODE ? TEST_AD_CLIENT : PROD_AD_CLIENT;

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  )
}
