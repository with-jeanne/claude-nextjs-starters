# 패키지 설치 계획서

Invoice MVP 개발 단계별 패키지 설치 및 설정 가이드

---

## 현재 설치된 패키지 (Phase 1~2)

### 기본 프레임워크
- **next**: 16.2.4 (App Router)
- **react**: 19.2.4
- **react-dom**: 19.2.4
- **typescript**: 5.6+

### 스타일링 & UI
- **tailwindcss**: 4.x (CSS-first)
- **@tailwindcss/postcss**: 4.x
- **tw-animate-css**: 1.4.0
- **clsx**: 2.1.1 (조건부 클래스 병합 기반)
- **tailwind-merge**: 3.5.0 (cn() 유틸)
- **lucide-react**: 1.8.0 (아이콘)
- **radix-ui**: 1.4.3 (shadcn/ui 기반)

### 폼 & 검증
- **react-hook-form**: 7.72.1 (폼 상태 관리)
- **@hookform/resolvers**: 5.2.2 (Zod 연동)
- **zod**: 4.3.6 (스키마 검증)

### 테마 & 알림
- **next-themes**: 0.4.6 (다크모드)
- **sonner**: 2.0.7 (토스트 알림)

### 개발 도구
- **eslint**: 9.x
- **eslint-config-next**: 16.2.4
- **shadcn**: 4.3.0 (CLI)

---

## Phase 3에서 설치할 패키지 (Supabase + Notion)

### Task 009: Supabase 연동
```bash
npm install @supabase/supabase-js @supabase/ssr
```

**용도**:
- `@supabase/supabase-js`: Supabase 클라이언트 (데이터베이스 접근)
- `@supabase/ssr`: Server-Side Rendering 지원 (middleware, 쿠키 관리)

**버전 권장**:
- `@supabase/supabase-js`: ^2.38.0 (안정 버전)
- `@supabase/ssr`: ^0.0.10 (SSR 통합용)

**설정 위치**:
- `lib/supabase/client.ts` (클라이언트 클라이언트)
- `lib/supabase/server.ts` (SSR 클라이언트)
- `middleware.ts` (Supabase Auth 미들웨어)

### Task 011: Notion API 연동
```bash
npm install @notionhq/client
```

**용도**:
- Notion API 공식 클라이언트 (데이터베이스 쿼리, 페이지 읽기)

**버전 권장**:
- `@notionhq/client`: ^2.2.12 (안정 버전)

**설정 위치**:
- `lib/notion/client.ts` (Notion 클라이언트 초기화)
- `lib/notion/mapper.ts` (Notion DB → Invoice 데이터 매핑)

---

## Phase 4에서 설치할 패키지 (PDF + 최적화)

### Task 015: PDF 생성 (선택사항)

#### 방법 1: window.print() (MVP 빠른 출시용)
- **추가 패키지 불필요**
- CSS `@media print` 쿼리로 인쇄 스타일링
- 브라우저 인쇄 함수 활용

#### 방법 2: @react-pdf/renderer (고급 기능용)
```bash
npm install @react-pdf/renderer
```

**용도**:
- React 컴포넌트를 PDF로 서버 사이드 렌더링
- 복잡한 레이아웃/스타일 정밀 제어 필요 시

**버전 권장**:
- `@react-pdf/renderer`: ^3.4.0 (React 19 호환)

**설정 위치**:
- `app/api/invoice/[token]/pdf/route.ts` (PDF 생성 API 엔드포인트)

### Task 016: 모니터링 & 로깅 (선택사항)
```bash
npm install @sentry/nextjs
```

**용도**:
- 프로덕션 에러 모니터링
- 성능 추적

**환경 변수**:
```
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

---

## 설치 타이밍 및 체크리스트

### Phase 3 시작 전 (Task 009 준비)
- [ ] Supabase 프로젝트 생성
- [ ] Supabase URL, Anon Key, Service Role Key 확보
- [ ] `.env.local` 파일 생성 및 환경 변수 입력
- [ ] `npm install @supabase/supabase-js @supabase/ssr` 실행

### Task 011 시작 전 (Notion 연동)
- [ ] Notion Integration 생성 및 권한 설정
- [ ] Notion API Key 확보
- [ ] Invoice DB와 Items DB ID 확보
- [ ] `.env.local`에 환경 변수 추가
- [ ] `npm install @notionhq/client` 실행

### Phase 4 시작 전 (PDF 생성)
- [ ] PDF 생성 방식 결정 (window.print vs @react-pdf/renderer)
- [ ] window.print() 선택 시: CSS `@media print` 작성 (패키지 불필요)
- [ ] @react-pdf/renderer 선택 시: `npm install @react-pdf/renderer` 실행

### 프로덕션 배포 전 (선택사항)
- [ ] `npm install @sentry/nextjs` 및 `.env.local`에 DSN 추가 (선택)
- [ ] `npm run build` 최종 확인
- [ ] Vercel 환경 변수 설정

---

## 주의사항

### 보안
- ⚠️ `.env.local` 파일은 절대 Git에 커밋하지 마세요 (`.gitignore`에 포함됨)
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용
- ⚠️ `NOTION_API_KEY`는 공개하지 마세요

### 호환성
- Next.js 16은 Breaking Changes 있음 → 공식 문서 먼저 확인
- Zod v4는 v3와 호환성 문제 가능성 → 업그레이드 시 테스트 필수
- React 19는 실험적 기능 포함 → 프로덕션 환경 확인 필수

### 성능
- 번들 크기 모니터링: `npm run build` 후 `.next/static` 크기 확인
- 불필요한 패키지 설치 최소화

---

## 참고

- `package.json`: 현재 설치된 모든 패키지 및 버전 확인
- `.env.example`: 필수 환경 변수 목록
- `lib/env.ts`: 환경 변수 검증 로직
