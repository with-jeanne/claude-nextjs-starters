---
name: 프로퍼티 파싱 패턴
description: PageObjectResponse에서 각 타입별 값 추출 방법 (title, rich_text, number, date, select, multi_select)
type: reference
---

## API 응답 구조 (각 프로퍼티)

```json
// title
"Name": { "type": "title", "title": [{ "plain_text": "값" }] }

// rich_text
"Memo": { "type": "rich_text", "rich_text": [{ "plain_text": "값" }] }

// number
"Amount": { "type": "number", "number": 150000 }

// date
"InvoiceDate": { "type": "date", "date": { "start": "2024-01-15", "end": null } }

// select
"Status": { "type": "select", "select": { "name": "발행됨" } }

// multi_select
"Tags": { "type": "multi_select", "multi_select": [{ "name": "긴급" }] }
```

## TypeScript 파싱 헬퍼 함수

각 타입은 `property.type === "title"` 등으로 좁히면 자동으로 타입 추론됨.

```typescript
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

type Props = PageObjectResponse["properties"][string]

function parseTitle(prop: Props): string {
  return prop.type === "title"
    ? prop.title.map(t => t.plain_text).join("")
    : ""
}

function parseRichText(prop: Props): string {
  return prop.type === "rich_text"
    ? prop.rich_text.map(t => t.plain_text).join("")
    : ""
}

function parseNumber(prop: Props): number | null {
  return prop.type === "number" ? prop.number : null
}

function parseDate(prop: Props): string | null {
  return prop.type === "date" ? prop.date?.start ?? null : null
}

function parseSelect(prop: Props): string | null {
  return prop.type === "select" ? prop.select?.name ?? null : null
}

function parseMultiSelect(prop: Props): string[] {
  return prop.type === "multi_select"
    ? prop.multi_select.map(s => s.name)
    : []
}
```

## 주의사항

- `rich_text` 배열은 여러 세그먼트로 분리될 수 있으므로 `map + join` 필수
- `date.start`는 `YYYY-MM-DD` 또는 ISO 8601 형식
- `select`, `number`, `date`는 값이 없으면 `null` 반환
- 타입 import는 `@notionhq/client/build/src/api-endpoints`에서
