---
name: 데이터베이스 쿼리 패턴
description: notion.databases.query() 필터/정렬/페이지네이션 핵심 패턴
type: reference
---

## 기본 쿼리

```typescript
const response = await notion.databases.query({
  database_id: "...",
  page_size: 100, // 최대 100
})
```

## 필터 (and/or 중첩 가능)

```typescript
filter: {
  and: [
    { property: "Status", select: { equals: "발행됨" } },
    { property: "Amount", number: { greater_than: 0 } },
    { or: [
      { property: "Tags", multi_select: { contains: "긴급" } },
      { property: "DueDate", date: { on_or_before: "2024-12-31" } },
    ]},
  ],
}
```

지원 필터 조건: `equals`, `does_not_equal`, `contains`, `starts_with`, `ends_with`,
`greater_than`, `less_than`, `on_or_before`, `on_or_after`, `is_empty`, `is_not_empty`

## 정렬

```typescript
sorts: [
  { property: "InvoiceDate", direction: "descending" },
  { timestamp: "created_time", direction: "ascending" },
]
```

## 전체 페이지네이션 (100개 초과)

```typescript
async function queryAll(databaseId: string) {
  const pages: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    })
    pages.push(...response.results.filter(isFullPage))
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  return pages
}
```

## 주의사항

- `page_size` 최대값: 100
- `next_cursor`는 `string | null` 타입 → `undefined` 변환 필요
- 레이트 리밋: 초당 3 requests (SDK가 자동 retry)
