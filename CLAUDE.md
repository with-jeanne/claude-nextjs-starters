# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

- **PRD 문서**: @docs/PRD.md
- **개발 로드맵**: @docs/ROADMAP.md

## 프로젝트 개요

모던 Next.js 스타터킷으로, 프로덕션 레벨의 웹 애플리케이션을 빠르게 구축하기 위한 템플릿입니다.

- **Next.js 16.2.4** (App Router)
- **React 19.2.4**
- **TypeScript** (strict 모드)
- **TailwindCSS v4** + **shadcn/ui** (CSS-first)
- **next-themes** (다크모드 지원)
- **React Hook Form** + **Zod v4** (폼 처리 및 검증)

## 개발 명령어

```bash
npm run dev              # 개발 서버 실행 (localhost:3000)
npm run build            # 프로덕션 빌드 (타입 체크 포함)
npm start                # 프로덕션 서버 실행
npm run lint             # ESLint 현재 상태 확인
npx eslint --fix .       # ESLint 자동 수정 (lint --fix 사용 불가)
tsc --noEmit             # 타입 체킹만 수행 (빌드 없이)
```

**타입 체킹**: TypeScript strict 모드. `npm run build`는 자동 타입 검사를 포함합니다. 개발 중에는 `tsc --noEmit` 또는 IDE의 타입 체크를 활용하여 오류를 조기에 발견할 수 있습니다.

## 코드 구조

### 디렉토리 레이아웃

- **app/** - Next.js App Router 구조
  - Route Groups 사용: `(main)`, `(dashboard)`, `(auth)` - 레이아웃 격리 및 그룹핑
  - 각 그룹은 독립적인 레이아웃 가능
  - 공통 레이아웃은 `app/layout.tsx`에 정의
  - **에러 처리**: `app/error.tsx` (전역 에러 바운더리), `app/not-found.tsx` (404 페이지)

- **components/** - React 컴포넌트
  - `ui/` - shadcn/ui 기반 재사용 UI 컴포넌트 (button, card, input, sidebar, form 등 25개+)
  - `layout/` - 레이아웃 관련 컴포넌트 (container, section, page-header)
  - `header/` - 네비게이션 및 헤더 컴포넌트
    - `index.tsx` - 헤더 메인
    - `nav-config.ts` - NAV_LINKS 메뉴 설정 (네비게이션 수정 시 이 파일 수정)
    - `nav-links.tsx` - 데스크탑 링크 렌더러
    - `mobile-nav.tsx` - 모바일 네비게이션
    - `user-menu.tsx` - 사용자 드롭다운 메뉴
  - `dashboard/` - 대시보드 전용 컴포넌트 (app-sidebar, dashboard-header, sidebar-nav)
  - `theme-toggle.tsx` - 다크모드 토글
  - `footer.tsx` - 푸터

- **hooks/** - 커스텀 React 훅
  - `use-mobile.ts` - `useIsMobile()` 훅 (768px breakpoint 기준 모바일 감지, SSR 안전, 클라이언트 컴포넌트에서만 사용 가능)

- **lib/** - 유틸리티 함수
  - `utils.ts` - `cn()` 함수: Tailwind 클래스 병합 유틸리티 (clsx + tailwind-merge 조합). 조건부 스타일링에 사용: `cn("base-class", condition && "conditional-class")`
  - `validations.ts` - Zod 스키마 (폼 검증 규칙)

- **providers/** - React Context/Provider
  - `providers.tsx` - ThemeProvider, Sonner Toaster 등록

## 주요 아키텍처 패턴

### Route Groups
경로 그룹은 폴더명을 `(name)` 형식으로 지정하여 URL에 포함되지 않으면서 레이아웃을 격리합니다:
- `(main)` - 메인 페이지 및 공개 영역
- `(dashboard)` - 대시보드 (독립 사이드바, 헤더)
- `(auth)` - 로그인/회원가입 (별도 레이아웃)

### 경로 별칭
`tsconfig.json`에 정의: `@/*` → 프로젝트 루트

```typescript
import { Button } from '@/components/ui/button'
```

### 다크모드
- **Provider**: `next-themes` + `ThemeProvider`
- **토글**: `components/theme-toggle.tsx`
- **구현**: CSS 클래스 기반 (`class` 속성)
- **저장소**: localStorage (기본값: `system` 테마)

### 폼 처리
- **라이브러리**: React Hook Form + Zod
- **사용처**: 로그인, 회원가입, 설정
- **검증**: Zod 스키마로 클라이언트/서버 검증

### UI 컴포넌트
shadcn/ui 기반으로, `components/ui/` 디렉토리에 모두 로컬 복사되어 있습니다. 마음껏 커스터마이징 가능합니다.

**컴포넌트 추가 방법:**
```bash
npx shadcn@latest add <component-name>
# 예: npx shadcn@latest add dialog
```
새 컴포넌트는 `components/ui/` 디렉토리에 자동 설치되고, 필요시 수정하여 사용할 수 있습니다.

### ESLint 설정
- **버전**: ESLint 9 + eslint-config-next (flat config)
- **설정 파일**: `eslint.config.mjs` (프로젝트 루트, ESLint 9 flat config 방식)
- **무시 목록**: `eslint.config.mjs`의 `globalIgnores` 설정
- **자동 수정**: `npx eslint --fix .` 명령어 사용
- **IDE 연동**: VS Code ESLint 확장 프로그램 권장

## Next.js 16 주의사항

**⚠️ Breaking Changes - 매우 중요**

Next.js 16은 이전 버전과 큰 차이가 있습니다. 새로운 라우팅, 컴포넌트 API, 라이프사이클이 변경되었으므로:

- 새 코드 작성 전에 **반드시** `node_modules/next/dist/docs/` 가이드 확인
- 레거시 API(getServerSideProps, getStaticProps 등)는 더 이상 지원되지 않음
- 공식 문서의 **최신 패턴** 참고 (training data는 구버전 기반)
- 의문이 생기면 공식 Next.js 문서를 우선으로 참고

**상세:** `AGENTS.md` 참고

## 메타데이터

루트 레이아웃: `app/layout.tsx`
- 기본 제목/설명 지정
- 페이지별 메타데이터는 각 페이지 파일에서 `export const metadata`로 오버라이드

## 스타일링

- **TailwindCSS v4** (CSS-first 방식)
  - **설정 파일**: `tailwind.config.*` 없음 (CSS에서 직접 설정)
  - **설정 방식**: `app/globals.css`에서 `@import "tailwindcss"` 직접 import
  - **shadcn CSS**: `@import "shadcn/tailwind.css"` (globals.css)
  - **애니메이션**: `@import "tw-animate-css"` (globals.css)
  - **폰트**: Geist, Geist Mono (`next/font/google` 로드, CSS 변수 `--font-geist-sans`, `--font-geist-mono`)
- **클래스 병합**: `cn()` 유틸리티로 Tailwind 클래스 충돌 해결
  ```typescript
  import { cn } from '@/lib/utils'
  
  export function Button({ variant, className, ...props }) {
    return (
      <button className={cn('px-4 py-2', variant === 'primary' && 'bg-blue-500', className)} {...props} />
    )
  }
  ```
- **조건부 클래스**: `clsx` 라이브러리 활용 (cn 함수 내부에서 사용됨)

## 코딩 스타일

- TypeScript strict 모드 준수
- 모든 컴포넌트에 타입 명시
- 클라이언트 컴포넌트는 `'use client'` 선언
- 서버 컴포넌트가 기본 (필요할 때만 클라이언트화)

## 서버/클라이언트 컴포넌트 분리 패턴

폼이나 상호작용이 많은 페이지는 서버/클라이언트 경계를 명확히 분리합니다:

**예: `(dashboard)/settings/page.tsx` 구조**
```typescript
// page.tsx - 서버 컴포넌트
export const metadata = { title: '설정' }
export default function SettingsPage() {
  return <SettingsContent /> // 클라이언트 컴포넌트 import
}

// settings-content.tsx - 클라이언트 컴포넌트
'use client'
export function SettingsContent() {
  // React Hook Form + Zod 폼 로직
}
```

이렇게 분리하면 메타데이터는 서버에서, 폼 상호작용은 클라이언트에서 처리 가능합니다.

## 커스텀 유틸리티 및 훅

### cn() 함수
`lib/utils.ts`의 `cn()` 함수는 Tailwind 클래스 병합 유틸리티입니다. Props로 받은 className이 기본 스타일을 덮어쓰는 상황을 방지합니다.

```typescript
import { cn } from '@/lib/utils'

// Props로 받은 className이 기본 색상을 덮어씀
<button className={cn('px-4 py-2 bg-blue-500', className)} />
```

### useIsMobile() 훅
`hooks/use-mobile.ts`의 `useIsMobile()` 훅은 모바일 여부를 감지합니다. **클라이언트 컴포넌트에서만 사용 가능합니다.**

```typescript
'use client'
import { useIsMobile } from '@/hooks/use-mobile'

export function MyComponent() {
  const isMobile = useIsMobile() // 768px 기준
  
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}
```

## Claude 에이전트 시스템

프로젝트에 통합된 자동화 도구들:

### 커스텀 커맨드
- **`/commit`** - Emoji + Conventional Commit 형식의 커밋 메시지 생성 (`.claude/commands/git/commit.md`)
- **`/testcase`** - QA 테스트케이스 생성 (마크다운 형식)

### 서브에이전트
- **`code-reviewer`** (model: sonnet) - 코드 변경 후 자동 리뷰 (`code.changeReview.beforeCommit` 설정 가능)
  - 10단계 검토: TypeScript, 컴포넌트 품질, 스타일링, 폼, 성능, 보안, 접근성, 테스트 등

### Slack 알림 훅
`.claude/settings.json`에 설정된 3가지 훅:
- `PostToolUse[Bash]` - Bash 도구 실행 시 Slack 메시지
- `Notification` - Claude Code 알림 발생 시 Slack 메시지
- `Stop` - 작업 종료 시 Slack 메시지

## 환경 변수

**.env 파일 (선택사항, 훅 시스템 사용 시 필수)**
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

주의: `.env.example` 없음. 로컬 개발 시 `.env` 직접 생성 필요. `.gitignore`에 `.env` 포함되어 있음.

## 테스트케이스

QA 테스트케이스는 마크다운 형식으로 저장:
- **위치**: `docs/testcases/` 디렉토리
- **생성**: `/testcase 기능명` 커맨드로 생성 가능
- **예**: `docs/testcases/dashboard.md` (24개 P0/P1/P2 테스트케이스)

## 개발 워크플로우

### 새로운 페이지 추가
1. `app/(groupName)/새페이지/page.tsx` 생성
2. 필요시 레이아웃 파일 추가: `layout.tsx`
3. 메타데이터 정의: `export const metadata = { title: '...' }`

### 새로운 컴포넌트 추가
1. `components/` 아래 적절한 폴더에 배치
2. `use client` 선언 (클라이언트 기능 필요시만)
3. 타입 명시: Props 인터페이스 정의

### 네비게이션 메뉴 수정
네비게이션 링크 수정 시 `components/header/nav-config.ts` 파일의 `NAV_LINKS` 배열을 수정합니다. 다른 네비게이션 컴포넌트들이 이 설정을 참고합니다.

```typescript
// components/header/nav-config.ts
export const NAV_LINKS = [
  { label: '홈', href: '/' },
  { label: '대시보드', href: '/dashboard' },
  // 추가...
]
```

### 빌드 및 배포 전 체크리스트
1. `npm run lint` - 린트 오류 확인 및 수정
2. `tsc --noEmit` - 타입 오류 확인
3. `npm run build` - 프로덕션 빌드 성공 확인
4. `npm run dev` - 개발 서버에서 기능 검증
