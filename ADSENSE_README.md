# AdSense 테스트 모드 가이드

## 🎯 목적
부정클릭 및 부정사용으로 인한 Google AdSense 계정 정지를 방지하기 위해 테스트 모드를 구현했습니다.

## 🔧 설정 방법

### 테스트 모드 (개발 및 테스트용)
1. `components/AdSense.tsx`에서 `TEST_MODE = true` 설정
2. `pages/_app.tsx`에서도 `TEST_MODE = true` 설정
3. Google 공식 테스트 광고가 표시됩니다
4. 페이지 상단에 "⚠️ 테스트 광고 (부정클릭 방지)" 배지 표시

### 프로덕션 모드 (실제 배포용)
1. `components/AdSense.tsx`에서 `TEST_MODE = false` 설정
2. `pages/_app.tsx`에서도 `TEST_MODE = false` 설정
3. 실제 AdSense 광고가 표시됩니다

## 📋 주요 변경 사항

### 1. Google 공식 테스트 광고 클라이언트 사용
```typescript
// Google이 제공하는 공식 테스트 광고 클라이언트 ID
const TEST_AD_CLIENT = 'ca-pub-3940256099942544';
```

### 2. 무한 루프 방지
- `useRef`를 사용하여 광고 중복 로드 방지
- AdSense 스크립트가 한 번만 실행되도록 보장

### 3. 시각적 표시
- 테스트 모드일 때 경고 배지 표시
- 개발자가 현재 테스트 중임을 쉽게 확인 가능

## 🚨 중요 사항

### 테스트 모드를 사용해야 하는 경우
- ✅ 로컬 개발 환경에서 테스트할 때
- ✅ 스테이징 환경에서 검증할 때
- ✅ UI/UX 디자인을 확인할 때
- ✅ 광고 위치와 레이아웃을 조정할 때

### 프로덕션 모드로 전환해야 하는 경우
- ✅ 실제 사용자에게 배포할 때
- ✅ 실제 수익을 발생시키고 싶을 때

## 📊 Google AdSense 정책

### 부정클릭 방지
Google AdSense는 다음과 같은 행위를 금지합니다:
- 본인의 광고 클릭
- 클릭 유도 문구 사용
- 자동화된 클릭 생성
- 가족, 친구에게 클릭 부탁

### 위반 시 처벌
- 경고 없이 계정 정지 가능
- 광고 수익 몰수
- 영구 정지 가능

## 🔄 배포 프로세스

### 1. 개발 단계
```bash
# TEST_MODE = true로 설정된 상태에서 개발
npm run dev
```

### 2. 프로덕션 빌드 전
```typescript
// components/AdSense.tsx
const TEST_MODE = false;  // ← 이 값을 false로 변경

// pages/_app.tsx
const TEST_MODE = false;  // ← 이 값을 false로 변경
```

### 3. 빌드 및 배포
```bash
npm run build
git add .
git commit -m "chore: Switch to production AdSense mode"
git push
```

## 🧪 테스트 체크리스트

배포 전에 다음 사항을 확인하세요:

- [ ] 테스트 모드에서 광고가 정상적으로 표시되는지 확인
- [ ] 모든 페이지에서 광고 위치가 적절한지 확인
- [ ] 반응형 디자인이 정상 작동하는지 확인
- [ ] 프로덕션 모드로 전환했는지 확인
- [ ] 실제 광고 클라이언트 ID가 올바른지 확인
- [ ] 빌드 후 에러가 없는지 확인

## 📝 참고 자료

- [Google AdSense 정책](https://support.google.com/adsense/answer/48182)
- [AdSense 프로그램 정책](https://support.google.com/adsense/answer/9335564)
- [테스트 광고 사용 방법](https://support.google.com/adsense/answer/185665)
