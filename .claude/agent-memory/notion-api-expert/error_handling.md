---
name: 에러 처리 패턴
description: APIErrorCode, rate limit, isHTTPResponseError 등 Notion API 에러 처리 패턴
type: reference
---

## 에러 타입 계층

- `NotionClientError` (기반)
  - `APIResponseError` — API 서버 에러 (4xx/5xx)
  - `RequestTimeoutError` — 요청 타임아웃
  - `UnknownHTTPResponseError` — 알 수 없는 HTTP 에러

## 에러 처리 패턴

```typescript
import {
  isNotionClientError,
  isHTTPResponseError,
  APIResponseError,
  APIErrorCode,
  ClientErrorCode,
} from "@notionhq/client"

try {
  await notion.databases.query({ database_id: "..." })
} catch (error: unknown) {
  if (isNotionClientError(error)) {
    switch (error.code) {
      case APIErrorCode.ObjectNotFound:
        // 데이터베이스 ID 오류 또는 권한 없음
        throw new Error("데이터베이스를 찾을 수 없습니다")
      case APIErrorCode.Unauthorized:
        // 토큰 오류
        throw new Error("Notion 인증에 실패했습니다")
      case APIErrorCode.RateLimited:
        // SDK가 자동 retry하지만 초과 시 여기 도달
        throw new Error("요청 한도 초과, 잠시 후 다시 시도하세요")
      case APIErrorCode.ValidationError:
        // 잘못된 필터/속성명
        throw new Error("잘못된 쿼리 파라미터입니다")
      case ClientErrorCode.RequestTimeout:
        throw new Error("요청 시간 초과")
    }

    if (isHTTPResponseError(error)) {
      // error.status, error.request_id, error.body 접근 가능
    }
  }
  throw error // Notion 외 에러는 re-throw
}
```

## Rate Limit 정책

- 제한: 초당 3 requests
- SDK 자동 retry: `Retry-After` 헤더 존중
- 전체 페이지네이션 시 대량 요청 주의 → 필요 시 수동 delay 추가
- `APIErrorCode.RateLimited` 코드로 감지 가능

## 주요 APIErrorCode 값

- `ObjectNotFound` — 리소스 없음
- `Unauthorized` — 인증 실패
- `RateLimited` — 레이트 리밋
- `InvalidJSON` — 잘못된 요청 본문
- `InvalidRequestURL` — 잘못된 URL
- `ValidationError` — 파라미터 검증 실패
- `ConflictError` — 동시 편집 충돌
- `InternalServerError` — Notion 서버 오류
- `ServiceUnavailable` — 서비스 일시 중단
