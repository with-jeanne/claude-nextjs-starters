# Invoice MVP 개발 로드맵

Notion에 입력한 견적서 데이터를 클라이언트가 고유 링크로 웹에서 확인하고 PDF로 다운로드할 수 있게 하여, 이메일 첨부 방식의 비효율을 제거한다.

## 개요

Invoice MVP는 **프리랜서/소규모 사업자(관리자)와 견적서를 받는 클라이언트(수신자)**를 위한 Notion 기반 견적서 공유 SaaS로 다음 기능을 제공합니다:

- **Notion 데이터 동기화 (F001)**: Notion API로 견적서 DB를 조회하여 Supabase에 캐싱
- **견적서 목록 조회 (F002)**: 동기화된 견적서를 대시보드에서 확인
- **공개 링크 생성 (F003)**: UUID 기반 토큰으로 견적서별 고유 공유 URL 생성
- **견적서 공개 페이지 (F004)**: 토큰으로 인증 없이 견적서 웹 렌더링
- **PDF 다운로드 (F005)**: 공개 페이지 내용을 PDF 파일로 변환 및 저장
- **기본 인증 (F010)**: 관리자 회원가입/로그인/로그아웃
- **견적서 상태 관리 (F011)**: 초안/발송됨/확인됨 상태값 업데이트

---

## 개발 워크플로우

1. **작업 계획**
  - 기존 코드베이스를 학습하고 현재 상태를 파악
  - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
  - 우선순위 작업은 마지막 완료된 작업 다음에 삽입
2. **작업 생성**
  - `/tasks` 디렉토리에 새 작업 파일 생성
  - 명명 형식: `XXX-description.md` (예: `001-routing-skeleton.md`)
  - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
  - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
  - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 초기 상태 샘플은 `000-sample.md` 참조.
3. **작업 구현**
  - 작업 파일의 명세서를 따름
  - 기능과 기능성 구현
  - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
  - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
  - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
  - 테스트 통과 확인 후 다음 단계로 진행
  - 각 단계 완료 후 중단하고 추가 지시를 기다림
4. **로드맵 업데이트**
  - 로드맵에서 완료된 작업을 ✅로 표시

---

## 기능 ID 매핑 (PRD 기능 명세 기준)


| ID   | 기능명            | 카테고리      | 우선순위 | 상태      | 담당 Phase    |
| ---- | -------------- | --------- | ---- | ------- | ----------- |
| F001 | Notion 데이터 동기화 | MVP 핵심    | P0   | pending | Phase 3     |
| F002 | 견적서 목록 조회      | MVP 핵심    | P0   | pending | Phase 2 / 3 |
| F003 | 공개 링크 생성       | MVP 핵심    | P0   | pending | Phase 3     |
| F004 | 견적서 공개 페이지     | MVP 핵심    | P0   | pending | Phase 2 / 3 |
| F005 | PDF 다운로드       | MVP 핵심    | P1   | pending | Phase 4     |
| F010 | 기본 인증          | MVP 필수 지원 | P0   | pending | Phase 3     |
| F011 | 견적서 상태 관리      | MVP 핵심    | P1   | pending | Phase 3     |


> 우선순위: P0(필수, 차단 요소) > P1(중요) > P2(부가)
> 상태: pending(대기) / in-progress(진행 중) / completed(완료)

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 (1주차)

**목표**: 전체 라우트 구조와 빈 페이지, 타입 정의, DB 스키마 설계 완료

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ 완료
  - 일정: 1~2일
  - 의존성: 없음
  - 관련 기능: 모든 F001~F011의 진입 페이지 골격
  - 구현 사항:
    - Next.js App Router 라우트 그룹 정리: `(auth)`, `(dashboard)`, `(public)`, `(main)`
    - `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx` 빈 껍데기 생성
    - `app/(dashboard)/dashboard/page.tsx` 빈 껍데기 생성
    - `app/(public)/invoice/[token]/page.tsx` 동적 라우트 생성
    - `app/error.tsx`, `app/not-found.tsx` 오류/404 페이지 골격
    - 각 그룹별 `layout.tsx` 골격 (인증 상태별 분리)
    - 네비게이션 설정 파일(`components/header/nav-config.ts`)에 견적서 메뉴 반영
  - **산출물**: `middleware.ts` (라우트 보호 미들웨어), 모든 페이지 기본 구조 완성
- **Task 002: 타입 정의 및 데이터 모델 설계** ✅ 완료
  - 일정: 1일
  - 의존성: Task 001
  - 관련 기능: F001, F002, F003, F004, F011
  - 구현 사항:
    - `lib/types/invoice.ts`: Invoice, InvoiceItem, User TypeScript 인터페이스 정의 (description 필드 추가)
    - `lib/types/notion.ts`: Notion API 응답 타입 정의 + NOTION_INVOICE_PROPERTY_NAMES, NOTION_ITEM_PROPERTY_NAMES, NOTION_STATUS_MAP 상수
    - 견적서 상태 Enum 타입: `draft | sent | confirmed`
    - Supabase 데이터베이스 스키마 SQL 작성 (실제 마이그레이션은 Phase 3에서 적용)
    - Zod 스키마 작성 (`lib/validations.ts`): 로그인/회원가입/견적서 입력/동기화/공개 링크 검증
  - **산출물**: `lib/types/invoice.ts`, `lib/types/notion.ts`, `lib/validations.ts`, Supabase 스키마 설계
- **Task 003: 환경 변수 및 외부 연동 설계** ✅ 완료
  - 일정: 0.5일
  - 의존성: Task 002
  - 관련 기능: F001, F010
  - 구현 사항:
    - `.env.example` 작성: `NOTION_API_KEY`, `NOTION_DATABASE_ID`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_APP_URL`
    - 환경 변수 검증 유틸리티 (`lib/env.ts`): Zod 스키마 기반 빌드 타임/런타임 변수 검증
    - 패키지 설치 계획서 (`docs/PACKAGES.md`): Phase별 설치 타이밍, 보안 주의사항
  - **산출물**: `lib/env.ts`, `.env.example`, `docs/PACKAGES.md`

---

### Phase 2: UI/UX 완성 (더미 데이터 활용) (2주차)

**목표**: 모든 페이지의 UI를 더미 데이터 기반으로 완성하여 사용자 플로우 검증 가능 상태로 만들기

- **Task 004: 공통 컴포넌트 라이브러리 구현** ✅ 완료
  - 일정: 2일
  - 의존성: Task 002
  - 관련 기능: F002, F004 (UI 기반)
  - 구현 사항:
    - shadcn/ui 추가 컴포넌트 설치: `table`, `dialog`, `dropdown-menu`, `select`, `badge`, `toast(sonner)` ✅
    - 더미 데이터 생성 (`lib/mock-data.ts`): Invoice 10개, InvoiceItem 32개 ✅
    - 견적서 상태 Badge 컴포넌트 (`components/invoice/status-badge.tsx`) ✅
    - 빈 상태(Empty State) 컴포넌트 (`components/layout/empty-state.tsx`) ✅
    - 페이지 헤더 컴포넌트 (`components/layout/page-header.tsx`) ✅
    - 디자인 토큰 및 색상 시스템 (globals.css) - 상태 배지, 테이블, 카드, 폼 스타일 ✅
    - 컴포넌트 데모 페이지 (`app/(main)/components-demo/page.tsx`) ✅
  - **산출물**: 모든 공통 컴포넌트 TypeScript strict 모드 통과, 렌더링 확인, Playwright 데모 페이지 검증 완료
- **Task 005: 인증 페이지 UI 구현 (로그인/회원가입)** ✅ 완료
  - 일정: 1.5일
  - 의존성: Task 004
  - 관련 기능: F010 (UI)
  - 구현 사항:
    - 로그인 폼 UI (이메일/비밀번호, React Hook Form + Zod 검증)
    - 회원가입 폼 UI (이메일/비밀번호/비밀번호 확인, 비밀번호 강도 표시)
    - 폼 에러 메시지 인라인 표시
    - 로그인↔회원가입 페이지 간 링크 연결
    - 로딩 상태 및 비활성화 처리
- **Task 006: 대시보드 페이지 UI 구현 (더미 데이터)** ✅ 완료
  - 일정: 2일
  - 의존성: Task 004
  - 관련 기능: F002, F003, F011 (UI)
  - 구현 사항:
    - 견적서 목록 테이블 (제목, 클라이언트명, 금액, 상태, 생성일)
    - "Notion 동기화" 버튼 UI (클릭 시 더미 응답)
    - 행별 "공개 링크 복사" 버튼 (클립보드 복사 + 토스트 알림)
    - 상태 드롭다운 (초안/발송됨/확인됨, 더미 상태 변경)
    - 행 클릭 시 견적서 상세 미리보기 모달
    - 빈 상태 UI (견적서 없을 때)
- **Task 007: 견적서 공개 페이지 UI 구현 (더미 데이터)** ✅ 완료
  - 일정: 1.5일
  - 의존성: Task 004
  - 관련 기능: F004 (UI)
  - 구현 사항:
    - 발행인/수신인 정보 영역 레이아웃
    - 품목 테이블 (설명, 수량, 단가, 소계)
    - 합계 금액 표시 영역
    - 발행일 및 메타 정보 표시
    - "PDF 다운로드" 버튼 UI (클릭 시 임시 동작)
    - 인쇄 최적화 CSS (`@media print` 미디어 쿼리)
    - 반응형 디자인 (모바일/태블릿/데스크탑)
- **Task 008: 오류 페이지 및 네비게이션 마무리** ✅ 완료
  - 일정: 0.5일
  - 의존성: Task 005, 006, 007
  - 관련 기능: 라우팅 처리
  - 구현 사항:
    - 오류 페이지 ("유효하지 않은 링크입니다" + 홈 이동 링크)
    - 404 페이지 디자인 마무리
    - 인증 상태별 헤더 메뉴 (더미 인증 상태로 토글 시뮬레이션)
    - 전체 사용자 플로우 클릭 검증 (Playwright MCP로 네비게이션 테스트)

---

### Phase 3: 핵심 기능 구현 (3~4주차)

**목표**: Supabase 연동, Notion 동기화, 인증 시스템을 실제로 동작시키기

- **Task 009: Supabase 프로젝트 설정 및 데이터베이스 구축** - 우선순위
  - 일정: 1.5일
  - 의존성: Task 002, Task 003
  - 관련 기능: F001, F002, F003, F010, F011
  - 구현 사항:
    - Supabase 프로젝트 생성 및 환경 변수 설정
    - Invoice / InvoiceItem 테이블 마이그레이션 적용
    - RLS(Row Level Security) 정책 설정 (public_token으로 공개 페이지 접근, 관리자만 쓰기)
    - `lib/supabase/server.ts`, `lib/supabase/client.ts` (SSR 및 클라이언트 분리)
    - 더미 데이터를 Supabase에서 조회하도록 1차 교체
- **Task 010: 인증 시스템 구현 (F010)** - 우선순위
  - 일정: 2일
  - 의존성: Task 009, Task 005
  - 관련 기능: F010
  - 구현 사항:
    - Supabase Auth 연동 (이메일/비밀번호)
    - 회원가입 Server Action 및 세션 생성
    - 로그인 Server Action 및 리디렉션 처리
    - 로그아웃 Server Action
    - 미들웨어(`middleware.ts`) - 보호된 경로 접근 제어
    - 세션 관리 및 쿠키 설정 (`@supabase/ssr`)
    - **테스트 체크리스트**: Playwright MCP로 회원가입 → 로그인 → 대시보드 진입 → 로그아웃 E2E 검증
- **Task 011: Notion API 통합 및 데이터 동기화 (F001)**
  - 일정: 2.5일
  - 의존성: Task 009
  - 관련 기능: F001
  - 구현 사항:
    - `@notionhq/client` 설치 및 클라이언트 초기화 (`lib/notion/client.ts`)
    - Notion 데이터베이스 스키마 매핑 함수 작성 (`lib/notion/mapper.ts`)
    - 동기화 Server Action: Notion DB 조회 → Invoice/InvoiceItem 업서트
    - `synced_at` 타임스탬프 갱신 로직
    - 신규/업데이트/삭제 견적서 처리 로직
    - 에러 핸들링 (API 한도 초과, 네트워크 실패, 매핑 실패)
    - **테스트 체크리스트**: Playwright MCP로 동기화 버튼 클릭 → 테이블 갱신 검증, API 모킹으로 실패 케이스 검증
- **Task 012: 대시보드 견적서 목록 및 상태 관리 (F002, F011)**
  - 일정: 1.5일
  - 의존성: Task 010, Task 011
  - 관련 기능: F002, F011
  - 구현 사항:
    - 대시보드 페이지에서 Supabase 데이터 조회 (Server Component)
    - 견적서 목록 페이지네이션/정렬 (생성일 내림차순 기본)
    - 상태 변경 Server Action (`draft → sent → confirmed`)
    - 낙관적 UI 업데이트 (`useOptimistic`)
    - **테스트 체크리스트**: Playwright MCP로 상태 드롭다운 변경 → DB 반영 검증
- **Task 013: 공개 링크 생성 및 공개 페이지 데이터 연동 (F003, F004)**
  - 일정: 2일
  - 의존성: Task 011
  - 관련 기능: F003, F004
  - 구현 사항:
    - 견적서 생성/동기화 시 UUID v4 기반 `public_token` 자동 생성
    - 공개 링크 복사 버튼 동작 (`/invoice/[token]` URL 생성 및 클립보드 복사)
    - 공개 페이지 Server Component에서 토큰으로 견적서 조회
    - 토큰 무효 시 오류 페이지로 리디렉션
    - 더미 데이터를 실제 Supabase 데이터로 교체
    - **테스트 체크리스트**: Playwright MCP로 링크 복사 → 비로그인 브라우저에서 접근 → 견적서 렌더링 검증, 잘못된 토큰 → 오류 페이지 검증
- **Task 014: 핵심 기능 통합 테스트**
  - 일정: 1일
  - 의존성: Task 010, 011, 012, 013
  - 관련 기능: F001, F002, F003, F004, F010, F011
  - 구현 사항:
    - Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
    - 시나리오: 회원가입 → Notion 동기화 → 견적서 목록 확인 → 공개 링크 생성 → 클라이언트가 공개 페이지 접근 → 상태 변경
    - 에러 핸들링: Notion API 실패, 잘못된 토큰, 인증 실패 케이스
    - 엣지 케이스: 빈 견적서 DB, 동기화 중 중복 클릭, 만료된 세션

---

### Phase 4: PDF 다운로드 및 최적화 (5주차)

**목표**: PDF 다운로드 완성, 성능 최적화, 배포 준비

- **Task 015: PDF 다운로드 구현 (F005)** - 우선순위
  - 일정: 2일
  - 의존성: Task 013
  - 관련 기능: F005
  - 구현 사항:
    - **MVP 1단계**: `window.print()` + 인쇄 최적화 CSS로 빠른 구현
    - 인쇄 미디어 쿼리: 헤더/네비 숨김, 페이지 분할 제어, 색상 보정
    - **MVP 2단계 (옵션)**: `@react-pdf/renderer` 도입하여 서버 사이드 PDF 생성
    - PDF 다운로드 Server Action / Route Handler (`app/api/invoice/[token]/pdf/route.ts`)
    - 파일명 규칙: `invoice-{client_name}-{issued_at}.pdf`
    - **테스트 체크리스트**: Playwright MCP로 PDF 다운로드 버튼 클릭 → 다운로드 검증, 인쇄 미리보기 시각 검증
- **Task 016: 성능 최적화 및 캐싱 전략**
  - 일정: 1.5일
  - 의존성: Task 015
  - 관련 기능: F001, F004
  - 구현 사항:
    - Next.js `revalidateTag` / `revalidatePath`로 동기화 후 캐시 무효화
    - 공개 페이지 ISR 적용 (`revalidate: 300`)
    - Supabase 쿼리 인덱스 추가 (`public_token`, `notion_page_id`)
    - 이미지 최적화 (`next/image`)
    - 번들 크기 분석 및 동적 import 적용
- **Task 017: 모니터링, 로깅 및 배포**
  - 일정: 1일
  - 의존성: Task 016
  - 관련 기능: 운영 인프라
  - 구현 사항:
    - Vercel 프로젝트 연결 및 환경 변수 설정
    - 프로덕션 빌드 확인 (`npm run build`, `tsc --noEmit`)
    - 에러 로깅 (Sentry 또는 Vercel Logs)
    - 배포 후 스모크 테스트 시나리오 작성 및 실행
    - README 업데이트 (실제 사용 방법, 환경 변수 가이드)

---

## 의존성 및 차단 요소

### 핵심 차단 의존성


| 차단 요소             | 영향 받는 Task                  | 해소 방법                                   |
| ----------------- | --------------------------- | --------------------------------------- |
| Supabase 프로젝트 미생성 | Task 009 이후 모든 Phase 3/4 작업 | Phase 3 시작 전 Supabase 계정 및 프로젝트 생성      |
| Notion API 키 미발급  | Task 011 (F001 동기화)         | Notion Integration 생성 및 데이터베이스 공유 권한 부여 |
| Notion DB 스키마 미확정 | Task 011, Task 002 (타입 정의)  | PRD 데이터 모델 기준으로 Notion DB 컬럼 사전 합의      |
| Vercel 배포 환경 미준비  | Task 017                    | Phase 4 진입 전 Vercel 계정 연결               |


### 작업 간 의존성 그래프

```
Task 001 (라우팅 골격)
  └─> Task 002 (타입 정의)
        └─> Task 003 (환경 변수)
              └─> Task 004 (공통 컴포넌트) ──┬─> Task 005 (인증 UI)
                                              ├─> Task 006 (대시보드 UI)
                                              └─> Task 007 (공개 페이지 UI)
                                                    └─> Task 008 (오류/네비)

Task 003 ──> Task 009 (Supabase) ──┬─> Task 010 (인증 구현)
                                     ├─> Task 011 (Notion 동기화)
                                     │     └─> Task 012 (목록/상태)
                                     │     └─> Task 013 (공개 링크)
                                     └─> Task 014 (통합 테스트)
                                            └─> Task 015 (PDF)
                                                  └─> Task 016 (최적화)
                                                        └─> Task 017 (배포)
```

---

## 위험 요소 및 완화 계획


| #   | 위험 요소                                       | 영향도      | 발생 가능성 | 완화 계획                                                                    |
| --- | ------------------------------------------- | -------- | ------ | ------------------------------------------------------------------------ |
| R1  | Notion API 호출 한도 초과 (3 req/sec)             | High     | Medium | 수동 동기화 버튼 + Supabase 캐싱 우선, 배치 동기화 시 rate limit 처리 (지수 백오프)              |
| R2  | Notion DB 스키마 변경으로 매핑 실패                    | High     | Medium | 매핑 레이어(`lib/notion/mapper.ts`) 분리, 매핑 실패 시 부분 동기화 + 에러 로깅                |
| R3  | PDF 디자인 깨짐 (`window.print()` 한계)            | Medium   | High   | MVP 1단계에서 단순 인쇄 CSS로 출시 → 사용자 피드백 후 `@react-pdf/renderer`로 단계적 전환        |
| R4  | Supabase RLS 정책 오설정으로 데이터 누출                | Critical | Low    | 공개 토큰 기반 SELECT만 허용, 나머지는 `auth.uid()` 검증, 배포 전 RLS 침투 테스트 필수            |
| R5  | UUID 토큰 추측 공격                               | Medium   | Low    | UUID v4(122 bit 엔트로피) 사용 + Rate Limiting, 추후 만료 정책 추가                    |
| R6  | Next.js 16 Breaking Change로 인한 라이브러리 호환성 문제 | High     | Medium | 라이브러리 설치 전 Next.js 16 지원 여부 확인, `node_modules/next/dist/docs/` 가이드 우선 참조 |
| R7  | 1인 개발자의 일정 지연                               | Medium   | High   | 각 Task를 1~2일 단위로 분해, MVP 범위 엄격 통제 (PRD "MVP 이후 기능" 영역 절대 침범 금지)          |
| R8  | 클라이언트 디바이스별 PDF 호환성                         | Medium   | Medium | Chrome/Safari/Firefox 인쇄 미리보기 사전 검증, 모바일은 다운로드 안내 UI 제공                  |


---

## 마일스톤 요약


| Phase   | 기간            | 산출물                                      | 검증 기준                                      |
| ------- | ------------- | ---------------------------------------- | ------------------------------------------ |
| Phase 1 | 1주차 (3.5일)    | ✅ 라우팅 골격 + 타입 정의 + 환경 변수 설계                | ✅ 모든 페이지에 빈 컴포넌트 존재, `npm run build` 성공      |
| Phase 2 | 2주차 (7.5일)    | 더미 데이터 기반 전체 UI 완성                       | Playwright로 전체 페이지 네비게이션 가능, 사용자 플로우 시각 검증 |
| Phase 3 | 3~4주차 (10.5일) | F001, F002, F003, F004, F010, F011 실제 동작 | E2E 시나리오(회원가입→동기화→공유→공개 페이지 접근) 통과         |
| Phase 4 | 5주차 (4.5일)    | F005 PDF 다운로드 + 배포                       | Vercel 프로덕션 배포, 모든 기능 동작 검증                |


**전체 예상 일정**: 5주 (약 26일 작업일)

---

## 페이지별 기능 매핑 (PRD 섹션 5 기준)


| 페이지        | 구현 기능                  | 인증      | 담당 Task                                |
| ---------- | ---------------------- | ------- | -------------------------------------- |
| 로그인 페이지    | F010                   | 비로그인 전용 | Task 005, Task 010                     |
| 회원가입 페이지   | F010                   | 비로그인 전용 | Task 005, Task 010                     |
| 대시보드 페이지   | F001, F002, F003, F011 | 로그인 필수  | Task 006, Task 011, Task 012, Task 013 |
| 견적서 공개 페이지 | F001, F004, F005       | 토큰 기반   | Task 007, Task 013, Task 015           |
| 오류 페이지     | 라우팅 처리                 | 없음      | Task 008                               |


