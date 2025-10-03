# 생활 계산기 허브

일상에 필요한 모든 계산기를 한곳에서 제공하는 웹 애플리케이션입니다.

## 📋 프로젝트 개요

- **프레임워크**: Next.js 15 (Pages Router)
- **스타일링**: Tailwind CSS v4
- **배포**: Cloudflare Pages
- **광고**: Google AdSense (ca-pub-4916365137102022)

## 🚀 배포 방법

### Cloudflare Pages 배포

1. **빌드**
   ```bash
   npm install
   npm run build
   ```

2. **Cloudflare Pages 설정**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: 18.x 이상

3. **배포 방법**
   - GitHub 저장소 연결 후 자동 배포
   - 또는 `out` 폴더를 대시보드에 직접 업로드

## 📦 프로젝트 구조

```
calculator-hub/
├── components/         # 공통 컴포넌트
│   └── AdSense.tsx    # Google AdSense 컴포넌트
├── lib/               # 계산 로직
│   └── calculators/
│       └── finance/
│           └── loan.ts  # 대출 계산 로직
├── pages/             # 페이지 (Pages Router)
│   ├── _app.tsx       # 앱 래퍼
│   ├── _document.tsx  # HTML 문서
│   ├── index.tsx      # 메인 페이지
│   └── finance/
│       └── loan.tsx   # 대출 계산기
├── styles/            # 스타일
│   └── globals.css    # 전역 스타일
└── out/              # 빌드 결과 (배포용)
```

## 🧮 구현된 계산기

### 금융 계산기
- **대출 계산기**: 원리금균등, 원금균등, 만기일시상환

### 향후 추가 예정
- 적금 계산기
- 퇴직금 계산기
- BMI 계산기
- 칼로리 계산기
- 할인 계산기
- D-Day 계산기

## 💰 Google AdSense 광고 배치

- **상단 배너**: 728x90 (데스크탑)
- **사이드바**: 300x300 (데스크탑)
- **콘텐츠 중간**: 자동 반응형
- **하단**: 320x100 (모바일)

## 🛠️ 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

개발 서버: http://localhost:3000

## 📝 기술 스택

- **Next.js 15**: Pages Router를 사용한 정적 사이트 생성
- **TypeScript**: 타입 안정성
- **Tailwind CSS v4**: 유틸리티 우선 CSS
- **Decimal.js**: 정밀한 금융 계산
- **Lucide React**: 아이콘

## ✅ Cloudflare Pages 호환성

- ✅ 완전한 정적 HTML 생성
- ✅ 서버 사이드 코드 없음
- ✅ JavaScript는 클라이언트 인터랙션만 담당
- ✅ AdSense 자동 로드 및 표시
- ✅ 모든 페이지 빌드 타임에 생성

## 📄 라이선스

MIT License
