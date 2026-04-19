# Invoice Web MVP - PRD 메타 프롬프트

당신은 견적서 및 인보이스 웹 애플리케이션의 제품 관리자입니다. 이 문서는 Claude Code와 개발팀이 Notion 기반 견적서를 웹 애플리케이션으로 변환하는 MVP를 개발하기 위한 요구사항입니다.

---

## 1. 프로젝트 개요

### 목표
Notion에서 입력한 견적서(Invoice) 데이터를 웹 애플리케이션으로 시각화하고, 클라이언트(발주처)가 웹을 통해 실시간으로 확인하며 PDF로 다운로드할 수 있는 시스템 구축.

### 주요 가치 제안
- **제공자**: Notion에서 한 번만 입력하고 자동 동기화
- **클라이언트**: 언제 어디서나 웹으로 실시간 견적서 확인
- **효율성**: PDF 자동 생성, 수정 이력 관리, 커뮤니케이션 감소

---

## 2. MVP 범위

### In Scope (필수)
1. **견적서 조회 페이지**
   - 고유 URL로 클라이언트가 견적서 확인
   - 마크다운 또는 템플릿 기반 표시
   - 다크모드 지원 (TailwindCSS v4)

2. **PDF 다운로드**
   - 서버사이드 PDF 생성 (고품질)
   - 한글 폰트 지원
   - 타임스탬프, 유효기간 포함

3. **Notion API 통합**
   - Notion Database에서 데이터 동기화
   - 실시간 업데이트 (또는 주기적 동기화)
   - 에러 처리 및 재시도 로직

4. **기본 관리 페이지**
   - 견적서 목록 (대시보드)
   - 생성/수정/삭제 (선택사항: 웹 UI 또는 Notion 유지)
   - 클라이언트 공개 URL 생성

### Out of Scope
- 사용자 인증/권한 관리 (Phase 2)
- 결제 시스템
- 메일 발송 자동화
- 버전 관리 및 이력 추적 (Phase 2)

---

## 3. 기술 요구사항

### 기술 스택 (기존 프로젝트 활용)
```
- Next.js 16.2.4 (App Router)
- React 19.2.4
- TypeScript (strict 모드)
- TailwindCSS v4 + shadcn/ui
- React Hook Form + Zod (폼 검증)
- next-themes (다크모드)
```

### 새로 추가할 라이브러리
- **`@notionhq/client`** - Notion API 클라이언트
- **`html2pdf.js` 또는 `puppeteer`** - PDF 생성 (권장: puppeteer, 고품질)
- **`date-fns`** - 날짜 형식화
- **`zustand` 또는 Context API** - 상태 관리 (선택)

### 아키텍처 패턴
- **Route Groups**: `(main)` / `(dashboard)` 분리
  - `(main)/invoice/[id]` - 공개 견적서 페이지
  - `(dashboard)/invoices` - 관리 대시보드
- **API Routes**: `app/api/invoices/`, `app/api/notion/` 등
- **Server Components**: 데이터 페칭 (Notion API)
- **Client Components**: PDF 다운로드, 폼 입력

---

## 4. 기능 요구사항

### 4.1 견적서 조회 페이지 (`/invoice/[id]`)
**기능 목록**
- [ ] 고유 ID로 견적서 조회
- [ ] 다음 정보 표시:
  - 발주사명 (클라이언트)
  - 공급사명 (판매자)
  - 견적서 번호, 발급일, 유효기간
  - 항목(Item) 리스트 (수량, 단가, 합계)
  - 소계, 세금, 총액
  - 특수 조건/비고
- [ ] 반응형 디자인 (모바일 최적화)
- [ ] 다크모드 자동 적용
- [ ] 뒤로가기/홈 버튼

**비기능 요구사항**
- 로딩 상태 표시 (Skeleton)
- 404 에러 처리
- 페이지 인쇄 지원

### 4.2 PDF 다운로드
**기능 목록**
- [ ] "PDF 다운로드" 버튼
- [ ] 서버사이드 PDF 생성 (API 엔드포인트)
- [ ] 한글 폰트 포함
- [ ] 로고/헤더/푸터 포함
- [ ] 파일명: `INVOICE_[ID]_[YYYYMMDD].pdf`
- [ ] 다운로드 진행 상황 표시

### 4.3 관리 대시보드 (`/(dashboard)/invoices`)
**기능 목록**
- [ ] 견적서 목록 (테이블)
  - 컬럼: ID, 클라이언트명, 금액, 발급일, 상태
  - 정렬/필터링 (선택사항)
- [ ] 공개 URL 복사 버튼
- [ ] 생성 버튼 (Notion에서 수동 입력 또는 폼)
- [ ] 삭제 버튼
- [ ] 실시간 동기화 상태 표시

### 4.4 Notion 동기화
**API 엔드포인트**
- `GET /api/invoices` - 모든 견적서 조회
- `GET /api/invoices/[id]` - 특정 견적서 조회
- `POST /api/notion/sync` - Notion과 동기화 (수동/자동)

**동기화 로직**
- Notion Database 쿼리
- 캐시 (선택: Redis 또는 메모리)
- 에러 핸들링

---

## 5. 데이터 모델

### Notion Database 스키마 (참고)
```
- ID (고유 ID)
- 클라이언트명 (Text)
- 공급사명 (Text)
- 견적서번호 (Text)
- 발급일 (Date)
- 유효기간 (Date)
- 항목 (Relation/Rollup)
  - 항목명 (Text)
  - 수량 (Number)
  - 단가 (Number)
  - 합계 (Formula: 수량 × 단가)
- 소계 (Rollup: Sum)
- 세금률 (Number, 기본값: 0.1)
- 세금 (Formula)
- 총액 (Formula)
- 특수조건 (Rich Text)
- 공개 여부 (Checkbox)
- 공개 URL (Text, 자동 생성)
- 생성일 (Created time)
- 수정일 (Last edited time)
```

### 애플리케이션 데이터 구조
```typescript
interface Invoice {
  id: string
  clientName: string
  supplierName: string
  invoiceNumber: string
  issueDate: Date
  dueDate: Date
  items: LineItem[]
  subtotal: number
  taxRate: number
  tax: number
  total: number
  notes?: string
  isPublic: boolean
  publicUrl: string
  createdAt: Date
  updatedAt: Date
}

interface LineItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}
```

---

## 6. 화면 설계

### 6.1 공개 견적서 페이지 (`/invoice/[id]`)
```
┌─────────────────────────────────────────┐
│ Logo / 헤더                             │
├─────────────────────────────────────────┤
│ 견적서                                  │
├─────────────────────────────────────────┤
│ 공급사: [Company] | 클라이언트: [Name]  │
│ 번호: [Number] | 발급일: [Date]         │
├─────────────────────────────────────────┤
│ 항목             수량  단가      합계   │
├─────────────────────────────────────────┤
│ [Item 1]         1    100,000   100,000 │
│ [Item 2]         2    50,000    100,000 │
├─────────────────────────────────────────┤
│                      소계: 200,000     │
│                      세금: 20,000      │
│                      총액: 220,000     │
├─────────────────────────────────────────┤
│ 특수조건:                               │
│ [Notes]                                │
├─────────────────────────────────────────┤
│ [PDF 다운로드]  [인쇄]  [공유]          │
└─────────────────────────────────────────┘
```

### 6.2 대시보드 (`/(dashboard)/invoices`)
```
┌─────────────────────────────────────────┐
│ 견적서 관리                             │
├─────────────────────────────────────────┤
│ [+ 새 견적서]                           │
├─────────────────────────────────────────┤
│ ID  | 클라이언트  | 금액   | 발급일    │
├─────────────────────────────────────────┤
│ 1   | A회사      | 220K  | 2026-04-19 │
│ 2   | B회사      | 550K  | 2026-04-18 │
└─────────────────────────────────────────┘
```

---

## 7. 사용자 시나리오

### 시나리오 1: 공급사 (판매자)
1. Notion에서 견적서 작성 (항목, 금액 입력)
2. 클라이언트에게 공개 URL 공유
3. 수정 사항 발생 → Notion 수정 → 자동 반영
4. 클라이언트가 PDF 다운로드하면 완료

### 시나리오 2: 클라이언트 (구매자)
1. 공급사로부터 링크 수신
2. 웹에서 견적서 확인 (데스크탑/모바일)
3. PDF 다운로드하여 보관
4. 질문 있으면 메일 또는 전화

### 시나리오 3: 지속적 유지보수
1. 매월 주기적으로 Notion 동기화
2. 오래된 견적서 아카이빙
3. 성능 모니터링 (응답속도, 에러율)

---

## 8. 성공 기준 (Acceptance Criteria)

### P0 (필수)
- [ ] Notion 데이터 성공적으로 조회
- [ ] 공개 URL로 견적서 웹 페이지 접근 가능
- [ ] PDF 다운로드 완료 (한글 깨짐 없음)
- [ ] 모바일 반응형 정상 작동
- [ ] 다크모드 정상 작동

### P1 (중요)
- [ ] 대시보드에서 견적서 목록 관리
- [ ] Notion 동기화 에러 처리
- [ ] 404 페이지 처리
- [ ] 로딩 상태 표시
- [ ] 인쇄 최적화

### P2 (선택)
- [ ] 실시간 동기화 (WebSocket/Polling)
- [ ] 캐시 전략 (TTL 기반)
- [ ] 분석 (GA 통합)
- [ ] 이메일 공유 기능

---

## 9. 개발 일정 (추정)

| 단계 | 작업 | 소요시간 |
|------|------|---------|
| 1 | Notion API 통합, 데이터 모델링 | 1-2일 |
| 2 | 견적서 조회 페이지 UI | 2-3일 |
| 3 | PDF 생성 기능 | 1-2일 |
| 4 | 대시보드 및 관리 기능 | 1-2일 |
| 5 | 테스트 및 최적화 | 1-2일 |
| **Total** | | **7-11일** |

---

## 10. 구현 체크리스트

### Phase 1: 기초 설정
- [ ] Notion API 키 설정
- [ ] `.env` 파일 추가
- [ ] 의존성 설치 (`@notionhq/client`, `puppeteer` 등)
- [ ] 데이터 타입 정의 (TypeScript)

### Phase 2: 공개 페이지
- [ ] Route: `app/(main)/invoice/[id]/page.tsx`
- [ ] API: `app/api/invoices/[id]/route.ts`
- [ ] 컴포넌트: InvoiceView (마크다운 스타일링)
- [ ] 스타일링: shadcn/ui 활용

### Phase 3: PDF 다운로드
- [ ] API: `app/api/invoices/[id]/pdf/route.ts`
- [ ] 템플릿: HTML/CSS → PDF 변환
- [ ] 한글 폰트 설정
- [ ] 버튼: "PDF 다운로드" UI

### Phase 4: 대시보드
- [ ] Route: `app/(dashboard)/invoices/page.tsx`
- [ ] 컴포넌트: InvoiceTable, InvoiceForm
- [ ] 상태 관리: zustand 또는 Context
- [ ] CRUD 기능 (읽기 필수, 쓰기 선택)

### Phase 5: 통합 테스트
- [ ] 엔드-투-엔드 테스트 (Playwright 추천)
- [ ] 성능 테스트 (LCP, CLS 등)
- [ ] 에러 핸들링 검증
- [ ] 모바일 테스트 (iOS/Android)

---

## 11. 주의사항

### 보안
- Notion API 키는 환경 변수로 관리 (절대 노출 금지)
- 공개 URL에 인증 토큰 포함 (추후 Phase 2)
- CORS 설정 주의

### 성능
- Notion API 요청 수 제한 (Rate Limiting)
- 캐싱 전략 (ISR 또는 revalidateTag)
- PDF 생성은 백그라운드 큐 고려 (선택사항)

### UX
- 느린 네트워크 대비 로딩 상태
- 오프라인 모드 고려 (선택사항)
- 접근성 (WCAG 2.1 준수)

---

## 12. 참고 자료

- [Notion API Docs](https://developers.notion.com)
- [Next.js 16 API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Puppeteer PDF](https://pptr.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TailwindCSS v4](https://tailwindcss.com/blog/tailwindcss-v4)

---

**최종 목표**: 2026년 4월 말까지 MVP 완성 및 베타 테스트 시작
