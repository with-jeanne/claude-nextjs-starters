---
name: 서버 전용 클라이언트
description: Next.js에서 Notion 클라이언트 싱글톤 패턴 및 server-only 보장 방법
type: reference
---

## 싱글톤 클라이언트 (lib/notion/client.ts)

```typescript
import "server-only"
import { Client } from "@notionhq/client"

function createNotionClient() {
  const auth = process.env.NOTION_TOKEN
  if (!auth) {
    throw new Error("NOTION_TOKEN 환경 변수가 설정되지 않았습니다")
  }
  return new Client({ auth })
}

// 모듈 수준 싱글톤 — Next.js 서버에서 재사용됨
export const notion = createNotionClient()
```

## server-only 보장

- `import "server-only"` — 클라이언트 번들에 포함되면 빌드 에러 발생
- Next.js App Router에서 Server Component / Server Action에서만 import 가능

## 필수 환경 변수

```
NOTION_TOKEN=secret_xxx...
NOTION_DATABASE_ID=xxx...
```

- `.env.local`에 저장 (`.gitignore`에 포함 확인)
- Notion Integration 생성: https://www.notion.so/my-integrations
- 데이터베이스에 Integration 연결 필수 (Share → Connections)

## 클라이언트 옵션

```typescript
new Client({
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 30_000, // 기본 60초, 서버 환경에서 조정
  notionVersion: "2022-06-28", // 최신 버전 (기본값)
})
```
