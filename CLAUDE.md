# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

모던 Next.js 스타터킷으로, 프로덕션 레벨의 웹 애플리케이션을 빠르게 구축하기 위한 템플릿입니다.

- **Next.js 16** (App Router)
- **TypeScript** (strict 모드)
- **TailwindCSS v4** + **shadcn/ui**
- **next-themes** (다크모드 지원)
- **React Hook Form** + **Zod** (폼 처리 및 검증)

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm start        # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

## 코드 구조

### 디렉토리 레이아웃

- **app/** - Next.js App Router 구조
  - Route Groups 사용: `(main)`, `(dashboard)`, `(auth)` - 레이아웃 격리 및 그룹핑
  - 각 그룹은 독립적인 레이아웃 가능
  - 공통 레이아웃은 `app/layout.tsx`에 정의

- **components/** - React 컴포넌트
  - `ui/` - shadcn/ui 기반 재사용 UI 컴포넌트 (button, card, input 등)
  - `layout/` - 레이아웃 관련 컴포넌트 (container, section, page-header)
  - `header/` - 네비게이션 및 헤더 컴포넌트
  - `dashboard/` - 대시보드 전용 컴포넌트
  - `theme-toggle.tsx` - 다크모드 토글
  - `footer.tsx` - 푸터

- **lib/** - 유틸리티 함수
  - `utils.ts` - 일반 유틸리티 (clsx, tailwind-merge 등)
  - `validations.ts` - Zod 스키마

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
shadcn/ui 기반으로, `components/ui/` 디렉토리에 모두 로컬 복사되어 있습니다.
마음껏 커스터마이징 가능합니다.

## Next.js 16 주의사항

**⚠️ Breaking Changes**

Next.js 16은 이전 버전과 차이가 있습니다. 새 코드를 작성하기 전에:
- `node_modules/next/dist/docs/` 가이드 확인
- 레거시 API와 새 API 구분 확인
- 공식 문서에서 최신 패턴 확인

**참고:** @AGENTS.md

## 메타데이터

루트 레이아웃: `app/layout.tsx`
- 기본 제목/설명 지정
- 페이지별 메타데이터는 각 페이지 파일에서 `export const metadata`로 오버라이드

## 스타일링

- **TailwindCSS v4** 사용
- **클래스 병합**: `tailwind-merge` 유틸리티로 클래스 충돌 해결
- **조건부 클래스**: `clsx` 라이브러리 활용

## 코딩 스타일

- TypeScript strict 모드 준수
- 모든 컴포넌트에 타입 명시
- 클라이언트 컴포넌트는 `'use client'` 선언
- 서버 컴포넌트가 기본 (필요할 때만 클라이언트화)
