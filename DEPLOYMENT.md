# Cloudflare Pages 배포 가이드

## 🚀 배포 절차

### 1. 로컬 빌드 테스트

```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls -la out/
```

빌드가 성공하면 `out` 폴더에 다음과 같은 정적 파일들이 생성됩니다:
- `index.html` - 메인 페이지
- `finance/loan/index.html` - 대출 계산기
- `404.html` - 404 페이지
- `_next/` - Next.js 정적 에셋

### 2. Cloudflare Pages 프로젝트 생성

#### 방법 A: GitHub 연동 (권장)

1. **GitHub 저장소 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Calculator Hub"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Cloudflare Pages 설정**
   - Cloudflare 대시보드 → Pages → Create a project
   - Connect to Git → GitHub 저장소 선택
   - Build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
     - **Node.js version**: 18.x 이상

3. **환경 변수 (선택사항)**
   - 필요한 경우 환경 변수 추가

4. **배포 시작**
   - Save and Deploy 클릭
   - 자동으로 빌드 및 배포 시작

#### 방법 B: 직접 업로드

1. **빌드 실행**
   ```bash
   npm run build
   ```

2. **Cloudflare Pages 대시보드**
   - Pages → Create a project
   - Upload assets directly
   - `out` 폴더 전체를 드래그 앤 드롭

### 3. 배포 확인

배포가 완료되면 Cloudflare가 제공하는 URL로 접속:
- `https://your-project.pages.dev`

확인 사항:
- ✅ 메인 페이지가 정상적으로 로드되는지
- ✅ 대출 계산기 페이지가 작동하는지
- ✅ AdSense 광고가 표시되는지
- ✅ 모바일에서도 정상 작동하는지

### 4. 커스텀 도메인 설정 (선택)

1. Cloudflare Pages 프로젝트 → Custom domains
2. Add a custom domain
3. DNS 레코드 추가 (Cloudflare DNS 사용 시 자동)
4. SSL/TLS 자동 적용

## 📋 빌드 명령어 정리

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 위치
./out/
```

## 🔧 문제 해결

### 빌드 실패 시

1. **Node.js 버전 확인**
   ```bash
   node --version  # 18.x 이상 필요
   ```

2. **의존성 재설치**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

3. **캐시 정리**
   ```bash
   rm -rf .next out
   npm run build
   ```

### 광고가 안 보일 때

1. AdSense 계정에서 사이트 승인 확인
2. 광고 코드 검증 (ca-pub-4916365137102022)
3. 브라우저 광고 차단 해제
4. 페이지 새로고침

### 404 에러 발생 시

- Cloudflare Pages는 자동으로 `404.html`을 처리
- 빌드 시 `404.html`이 생성되었는지 확인
- trailing slash 설정 확인 (next.config.js)

## 📊 배포 후 모니터링

### Cloudflare Analytics
- Pages 프로젝트 → Analytics
- 방문자 수, 페이지뷰, 대역폭 확인

### Google AdSense
- AdSense 대시보드에서 수익 모니터링
- 광고 실적 확인

## 🔄 업데이트 배포

### GitHub 연동 시 (자동 배포)
```bash
git add .
git commit -m "Update: description"
git push
```
→ 자동으로 새 버전 빌드 및 배포

### 직접 업로드 시
1. `npm run build`
2. Cloudflare Pages 대시보드에서 새 버전 업로드

## ⚡ 성능 최적화

Cloudflare Pages는 자동으로 다음을 제공:
- ✅ 글로벌 CDN 배포
- ✅ HTTPS 자동 적용
- ✅ HTTP/2, HTTP/3 지원
- ✅ 자동 캐싱
- ✅ DDoS 보호

추가 최적화는 필요하지 않습니다.

## 📝 체크리스트

배포 전 확인:
- [ ] `npm run build` 성공
- [ ] `out` 폴더에 정적 파일 생성 확인
- [ ] AdSense 코드 검증
- [ ] 모든 페이지 로컬 테스트 완료
- [ ] `.gitignore` 설정 확인
- [ ] package.json 정리 완료

배포 후 확인:
- [ ] 사이트 정상 작동
- [ ] 광고 표시 확인
- [ ] 모바일 반응형 확인
- [ ] SEO 메타태그 확인
- [ ] 커스텀 도메인 설정 (선택)
