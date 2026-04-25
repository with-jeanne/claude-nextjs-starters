---
name: 타입 가드 패턴
description: isFullPage, isFullPageOrDataSource 등 Notion SDK TypeScript 타입 안전성 패턴
type: reference
---

## 주요 타입 가드 함수

```typescript
import {
  isFullPage,           // PageObjectResponse로 좁힘
  isFullBlock,          // BlockObjectResponse로 좁힘
  isFullDatabase,       // DatabaseObjectResponse로 좁힘
  isFullPageOrDataSource, // PageObjectResponse | DataSourceObjectResponse
  isNotionClientError,  // 에러 타입 가드
  isHTTPResponseError,  // HTTP 에러 타입 가드
} from "@notionhq/client"
```

## 사용 패턴

```typescript
// databases.query() 결과 타입 좁힘
const response = await notion.databases.query({ database_id: "..." })
for (const page of response.results) {
  if (!isFullPage(page)) continue
  // 이후 page는 PageObjectResponse 타입
  const props = page.properties
}

// 페이지 직접 조회
const page = await notion.pages.retrieve({ page_id: "..." })
if (isFullPage(page)) {
  page.url        // OK
  page.properties // OK
}
```

## PageObjectResponse 타입 import

```typescript
import type {
  PageObjectResponse,
  DatabaseObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
```

## 프로퍼티 접근 패턴

```typescript
// props["PropertyName"].type === "title" 으로 좁힘
const props = page.properties
const nameProp = props["Name"]
if (nameProp.type === "title") {
  const title = nameProp.title.map(t => t.plain_text).join("")
}
```
