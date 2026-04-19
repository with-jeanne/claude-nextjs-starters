---
name: Project Architecture
description: Next.js 16 스타터킷의 Route Groups, 스택, 디렉토리 구조 및 핵심 아키텍처 결정사항
type: project
---

Next.js 16 (App Router) 기반 프로덕션 스타터킷. Route Groups으로 레이아웃 격리.

**Route Groups:**
- `(main)` — 헤더/푸터 공개 레이아웃
- `(dashboard)` — SidebarProvider 기반 사이드바+헤더 레이아웃
- `(auth)` — 중앙 정렬 카드 레이아웃

**스택:**
- Next.js 16.2.4, React 19.2.4
- TypeScript strict 모드 (tsconfig.json 확인)
- TailwindCSS v4 + tailwind-merge + clsx
- shadcn/ui (로컬 복사, components/ui/)
- next-themes (class 기반 다크모드, defaultTheme="system")
- React Hook Form + Zod (lib/validations.ts에 스키마 집중)
- sonner (Toaster)

**경로 별칭:** `@/*` → 프로젝트 루트

**Why:** 프로덕션 레벨 스타터로, 실제 서비스 확장을 고려한 구조.
**How to apply:** 새 페이지/컴포넌트 추가 시 Route Group과 디렉토리 규칙 준수 여부 반드시 확인.
