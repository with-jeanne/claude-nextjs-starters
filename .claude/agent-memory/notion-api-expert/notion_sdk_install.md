---
name: Notion SDK 설치 상태
description: @notionhq/client 패키지 설치 여부 및 프로젝트 의존성 현황
type: project
---

2026-04-25 기준, `@notionhq/client`는 `package.json`에 포함되지 않아 미설치 상태.

**Why:** Invoice MVP Phase 1 작업이 아직 시작되지 않아 Notion 관련 패키지가 없음.

**How to apply:** `lib/notion/` 디렉토리 및 관련 코드 작성 전 반드시 패키지 설치 필요.
설치 명령: `npm install @notionhq/client`
