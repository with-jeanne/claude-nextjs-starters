# Invoice MVP 프로젝트 개발 규칙

**이 문서는 AI Agent가 개발 작업을 수행할 때 참고하는 프로젝트별 개발 규칙입니다.**

---

## 1. 프로젝트 개요

- **프로젝트명**: Invoice MVP
- **목적**: Notion에 입력한 견적서 데이터를 클라이언트가 고유 링크로 웹에서 확인하고 PDF로 다운로드할 수 있게 함
- **기술 스택**: Next.js 16.2.4 (App Router) + React 19 + TypeScript strict + TailwindCSS v4 + shadcn/ui
- **외부 연동**: Notion API (데이터 소스), Supabase (인증/DB)
- **개발 단계**: Phase 1~4 (총 5주, ROADMAP.md 참고)
- **언어**: 코드(변수/함수명)는 영어, 주석/커밋/PR은 한국어

---

## 2. 프로젝트 아키텍처

### 2.1 디렉토리 구조

```
app/
├── (auth)/                # 로그인/회원가입 라우트 그룹
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/           # 보호된 대시보드 (인증 필수)
│   └── dashboard/page.tsx
├── (public)/              # 토큰 기반 공개 페이지
│   └── invoice/[token]/page.tsx
├── (main)/                # 일반 공개 페이지
└── layout.tsx, error.tsx, not-found.tsx

components/
├── ui/                    # shadcn/ui 기본 컴포넌트
├── layout/                # 레이아웃 컴포넌트
├── dashboard/             # 대시보드 전용
├── header/                # 네비게이션 (nav-config.ts 포함)
└── invoice/               # 견적서 관련 컴포넌트

lib/
├── supabase/
│   ├── server.ts          # SSR용 클라이언트
│   └── client.ts          # 클라이언트용 클라이언트
├── notion/
│   ├── client.ts          # Notion API 클라이언트
│   └── mapper.ts          # 데이터 매핑 함수
├── utils.ts               # cn() 등 유틸리티
└── validations.ts         # Zod 스키마

types/
├── invoice.ts             # Invoice, InvoiceItem, User 인터페이스
└── notion.ts              # Notion API 응답 타입
```

### 2.2 라우팅 그룹

- **(auth)**: 비로그인 전용 라우트, 로그인/회원가입 페이지 포함
- **(dashboard)**: 로그인 필수 라우트, 관리자 대시보드
- **(public)**: 토큰 기반 공개 라우트, 미들웨어로 토큰 검증
- **(main)**: 일반 공개 라우트

---

## 3. 코드 표준

### 3.1 TypeScript

- **strict 모드 필수**: tsconfig.json의 `strict: true` 준수
- **모든 컴포넌트에 타입 명시**: Props 인터페이스 정의 필수
- **union/literal 타입 활용**: 상태는 `'draft' | 'sent' | 'confirmed'` 형식 권장

### 3.2 컴포넌트

- **클라이언트 컴포넌트**: 상호작용이 필요한 경우만 `'use client'` 선언
- **서버 컴포넌트**: 기본값, 메타데이터/DB 쿼리는 서버에서
- **props 인터페이스**: 모든 컴포넌트에서 정의

```typescript
// ❌ 나쁜 예
function Button(props) {
  return <button>{props.children}</button>
}

// ✅ 좋은 예
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  children: React.ReactNode
}

export function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  return <button className={cn('px-4 py-2', variant === 'primary' && 'bg-blue-500')}>{children}</button>
}
```

### 3.3 명명 관례

- **파일명**: kebab-case (`user-menu.tsx`, `invoice-list.tsx`)
- **컴포넌트/함수**: PascalCase / camelCase (`UserMenu`, `getInvoiceById`)
- **상수**: UPPER_SNAKE_CASE (`DEFAULT_PAGE_SIZE = 10`)
- **타입**: PascalCase (`InvoiceStatus`, `UserRole`)

### 3.4 주석

- **원칙**: WHY가 명확하지 않으면 작성하지 않음
- **용도**: 숨겨진 제약, 미묘한 불변식, 특정 버그 우회, 예상 밖의 동작만 설명
- **형식**: 한국어로 작성, 1줄 최대

```typescript
// ❌ 나쁜 예 (WHAT은 코드가 이미 명확)
// 사용자 ID로 가져오기
const user = await getUser(userId)

// ✅ 좋은 예 (WHY 설명)
// Notion API는 3 req/sec 제한이 있으므로 결과를 5분간 캐싱
const cachedInvoices = await cache.get(`invoices:${notionDbId}`, { ttl: 300 })
```

---

## 4. 라우팅 규칙

### 4.1 경로 설계

| 그룹 | 경로 | 인증 | 용도 |
|------|------|------|------|
| (auth) | /login | 비로그인 전용 | 로그인 페이지 |
| (auth) | /register | 비로그인 전용 | 회원가입 페이지 |
| (dashboard) | /dashboard | 로그인 필수 | 관리자 대시보드 |
| (public) | /invoice/[token] | 토큰 검증 | 공개 페이지 |
| (main) | / | 모두 접근 | 홈 페이지 |

### 4.2 새 페이지 생성 규칙

1. 경로 그룹 결정: (auth) / (dashboard) / (public) / (main)
2. `app/(groupName)/newpage/page.tsx` 생성
3. 메타데이터 정의: `export const metadata = { title: '...' }`
4. 필요시 `layout.tsx` 생성
5. **네비게이션에 노출되면**: `components/header/nav-config.ts`의 `NAV_LINKS` 동시 수정 (아래 4.3 참고)

### 4.3 미들웨어 기반 라우트 보호

```typescript
// middleware.ts 규칙
// (dashboard) → 로그인 필수 (리디렉션 처리)
// (public) → public_token 검증 필수
```

---

## 5. 파일 생성 규칙

### 5.1 페이지 생성

```typescript
// app/(groupName)/[name]/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '페이지명',
  description: '설명'
}

export default function PageName() {
  // 서버 컴포넌트로 시작
  return <PageContent />
}
```

### 5.2 컴포넌트 생성

```typescript
// components/[category]/[name].tsx
interface ComponentNameProps {
  prop1: string
  prop2?: boolean
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return <div>{prop1}</div>
}
```

### 5.3 타입 정의 생성

- **types/invoice.ts**: Invoice, InvoiceItem, User 인터페이스 통합
- **types/notion.ts**: Notion API 응답 타입만 (RichTextBlock 등)
- 새 도메인 타입 추가 시 기존 파일에 추가하고 파일 분리는 10개 이상일 때만

### 5.4 유틸리티 함수 생성

- 단위별 파일: `lib/notion/mapper.ts`, `lib/supabase/queries.ts`
- 재사용 가능하고 단순한 함수: `lib/utils.ts`에 추가

---

## 6. 핵심 파일 상호작용 규칙 ⚠️

### 6.1 네비게이션 메뉴 추가/수정

**규칙**: 새 페이지가 헤더/네비 메뉴에 노출되면, 반드시 `components/header/nav-config.ts`의 `NAV_LINKS` 동시 수정

```typescript
// components/header/nav-config.ts
export const NAV_LINKS = [
  { label: '홈', href: '/' },
  { label: '대시보드', href: '/dashboard' },  // ← 새 메뉴 추가 시 여기도 수정
]
```

**적용 사례**:
- 대시보드 페이지 추가 → NAV_LINKS에 항목 추가
- 설정 페이지 추가 → NAV_LINKS에 항목 추가
- 인증 페이지는 제외 (비로그인/로그인 후 다르게 표시)

### 6.2 환경 변수 추가

**규칙**: `.env` 파일에 새 변수 추가 시, `.env.example`에도 동시 추가

```bash
# .env
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx

# .env.example (값 없음)
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id
```

### 6.3 타입 정의 추가

**규칙**: 새 데이터 모델 생성 시 types/invoice.ts 또는 lib/validations.ts 동시 업데이트

```typescript
// types/invoice.ts
export interface Invoice {
  id: string
  notion_page_id: string
  public_token: string
  status: 'draft' | 'sent' | 'confirmed'
}

// lib/validations.ts (Zod 스키마)
export const invoiceSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['draft', 'sent', 'confirmed'])
})
```

---

## 7. 컴포넌트 규칙

### 7.1 컴포넌트 분류 및 위치

| 분류 | 위치 | 용도 | 예시 |
|------|------|------|------|
| UI | `components/ui/` | shadcn/ui 기본 컴포넌트 (local copy) | Button, Card, Input |
| Layout | `components/layout/` | 페이지 구조 컴포넌트 | Container, Section, PageHeader |
| Dashboard | `components/dashboard/` | 대시보드 전용 | DashboardHeader, SidebarNav |
| Header | `components/header/` | 네비게이션 및 헤더 | Header, NavLinks, UserMenu |
| Feature | `components/[feature]/` | 기능 단위 컴포넌트 | InvoiceTable, InvoiceForm |

### 7.2 shadcn/ui 컴포넌트 추가

```bash
# 새 컴포넌트 필요 시
npx shadcn@latest add <component-name>
# 예: npx shadcn@latest add dialog
```

- 자동으로 `components/ui/` 디렉토리에 설치됨
- 필요시 커스터마이징 가능

### 7.3 컴포넌트 분리 원칙

**서버 컴포넌트 (기본)**:
```typescript
// app/(dashboard)/dashboard/page.tsx
export const metadata = { title: '대시보드' }

export default function DashboardPage() {
  // 서버에서 데이터 조회
  const invoices = await getInvoices()
  return <DashboardContent invoices={invoices} />
}
```

**클라이언트 컴포넌트** (파일 분리):
```typescript
// components/dashboard/dashboard-content.tsx
'use client'

export function DashboardContent({ invoices }: { invoices: Invoice[] }) {
  const [status, setStatus] = useState('draft')
  return <div>...</div>
}
```

---

## 8. Notion/Supabase 연동 규칙

### 8.1 API 클라이언트 구조

```typescript
// lib/supabase/server.ts (SSR용)
import { createServerClient } from '@supabase/ssr'

export function createClient() {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, ...)
}

// lib/supabase/client.ts (클라이언트용)
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, ...)
}

// lib/notion/client.ts (Notion API)
import { Client } from '@notionhq/client'

export const notionClient = new Client({ auth: process.env.NOTION_API_KEY })
```

### 8.2 데이터 동기화 패턴

```typescript
// lib/notion/mapper.ts - Notion DB → Supabase
export async function syncInvoicesFromNotion(dbId: string) {
  // 1. Notion DB 조회
  const notionItems = await notionClient.databases.query({ database_id: dbId })
  
  // 2. 데이터 매핑 (타입 변환)
  const mapped = notionItems.results.map(item => mapNotionToInvoice(item))
  
  // 3. Supabase 업서트
  const result = await supabase.from('invoices').upsert(mapped)
  
  // 4. 타임스탬프 갱신
  return result
}
```

### 8.3 에러 처리

```typescript
// ✅ 필수: 외부 API 호출 시 에러 처리
try {
  const data = await notionClient.databases.query({ ... })
} catch (error) {
  if (error.code === 'rate_limited') {
    // Notion API 한도 초과 (3 req/sec)
    // 지수 백오프 재시도 또는 사용자에게 알림
  }
  throw new Error(`Notion 동기화 실패: ${error.message}`)
}
```

---

## 9. 폼 처리 규칙

### 9.1 React Hook Form + Zod 패턴

```typescript
// 1. Zod 스키마 정의 (lib/validations.ts)
export const loginSchema = z.object({
  email: z.string().email('유효한 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다')
})

// 2. 클라이언트 컴포넌트에서 사용
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const result = await loginAction(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} />
      {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}
    </form>
  )
}
```

### 9.2 금지 사항

- ❌ 폼 검증 없이 사용자 입력을 직접 처리
- ❌ 서버 액션에서 Zod 검증 다시 (클라이언트에서만 충분하면 불필요)
- ❌ 복잡한 폼은 분리하지 않음 (페이지/컴포넌트 구분)

---

## 10. 타입 정의 규칙

### 10.1 파일별 책임

**types/invoice.ts** (도메인 타입):
```typescript
export interface Invoice {
  id: string
  notion_page_id: string
  public_token: string
  client_name: string
  total_amount: number
  status: 'draft' | 'sent' | 'confirmed'
  created_at: Date
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  unit_price: number
}

export interface User {
  id: string
  email: string
  created_at: Date
}
```

**types/notion.ts** (외부 API 타입):
```typescript
export interface NotionPageObject {
  id: string
  created_time: string
  last_edited_time: string
  properties: Record<string, NotionProperty>
}

export type NotionProperty = TitleProperty | RichTextProperty | NumberProperty | ...
```

**lib/validations.ts** (입력 검증):
```typescript
import { z } from 'zod'

export const invoiceStatusEnum = z.enum(['draft', 'sent', 'confirmed'])

export const createInvoiceSchema = z.object({
  client_name: z.string().min(1, '클라이언트명은 필수입니다'),
  total_amount: z.number().min(0),
  status: invoiceStatusEnum
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
```

### 10.2 타입 위치

| 타입 | 위치 | 용도 |
|------|------|------|
| 도메인 모델 | `types/invoice.ts` | Invoice, InvoiceItem, User |
| 외부 API | `types/notion.ts` | Notion API 응답 |
| 입력 검증 | `lib/validations.ts` | Zod 스키마 |
| 컴포넌트 Props | 각 컴포넌트 파일 내부 | ComponentNameProps |

---

## 11. 스타일링 규칙

### 11.1 TailwindCSS v4 + cn() 유틸

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 11.2 조건부 스타일링

```typescript
// ✅ 좋은 예 (cn() 사용)
<button className={cn('px-4 py-2 bg-blue-500', variant === 'secondary' && 'bg-gray-300')} />

// ❌ 나쁜 예 (직접 삼항 연산자)
<button className={variant === 'primary' ? 'px-4 py-2 bg-blue-500' : 'px-4 py-2 bg-gray-300'} />
```

### 11.3 반응형 디자인

```typescript
// ✅ TailwindCSS 반응형 클래스
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />

// useIsMobile() 훅 (클라이언트 컴포넌트에서만)
'use client'
import { useIsMobile } from '@/hooks/use-mobile'

export function MyComponent() {
  const isMobile = useIsMobile()
  return isMobile ? <MobileLayout /> : <DesktopLayout />
}
```

---

## 12. AI 의사결정 기준

### 12.1 애매한 상황에서의 판단 원칙

| 상황 | 판단 기준 | 선택 |
|------|---------|------|
| 새 함수화할지 결정 | 3줄 이상 중복되는가? | 예 → 함수화 |
| 컴포넌트 분리할지 결정 | 상호작용이 필요한가? | 예 → 클라이언트 분리 |
| 라우팅 그룹 선택 | 인증 필요/메뉴 노출/공개도 | ROADMAP.md 메뉴 구조 참고 |
| 타입 위치 결정 | 외부 API인가? | 아니오 → types/invoice.ts |
| 컴포넌트 분류 | shadcn 기본인가? | 예 → components/ui/ |
| 주석 필요한가 | WHY가 비명확한가? | 예 → 한국어 1줄 주석 |
| MVP 범위인가 | ROADMAP의 "MVP 이후"에 있는가? | 예 → 제외 |

### 12.2 MVP 범위 판단

**포함해야 할 기능** (ROADMAP.md Phase 1~4):
- F001: Notion 데이터 동기화
- F002: 견적서 목록 조회
- F003: 공개 링크 생성
- F004: 견적서 공개 페이지
- F005: PDF 다운로드
- F010: 기본 인증
- F011: 견적서 상태 관리

**제외해야 할 기능** (ROADMAP.md "MVP 이후 기능"):
- 프로필 관리
- 알림 설정
- API 키 관리
- 다중 언어 지원
- 결제 기능

---

## 13. 금지 사항 ❌

### 13.1 코드

- ❌ **MVP 범위 초과**: ROADMAP "MVP 이후 기능" 영역 침범
- ❌ **과도한 추상화**: 3줄 미만 중복은 함수화하지 않음
- ❌ **미사용 코드**: 제거하지 않은 변수/함수/파일 남기기
- ❌ **주석 과다**: WHY가 비명확한 주석 작성
- ❌ **타입 생략**: Props 인터페이스 정의 없음
- ❌ **폼 검증 누락**: 사용자 입력에 Zod 검증 없음

### 13.2 구조

- ❌ **네비게이션 미동기**: 페이지 추가 후 nav-config.ts 수정 안 함
- ❌ **환경 변수 불일치**: .env와 .env.example 불일치
- ❌ **타입 분산**: types/ 안의 타입을 컴포넌트 파일에 정의
- ❌ **Back-compat 해킹**: 사용되지 않는 _var 이름 변경, 불필요한 re-export

### 13.3 외부 연동

- ❌ **에러 처리 누락**: Notion API / Supabase 쿼리의 try-catch 없음
- ❌ **하드코딩된 값**: API 키/URL을 코드에 직접 입력
- ❌ **비동기 처리 누락**: 동기화 버튼 클릭 후 로딩 상태 표시 안 함

### 13.4 커밋/PR

- ❌ **스킵 훅**: `--no-verify` 또는 `--no-gpg-sign` 사용
- ❌ **강제 푸시**: `git push --force` (main/develop 절대 금지)
- ❌ **영어 커밋 메시지**: "Add login page" (한국어로 작성: "✨ feat: 로그인 페이지 추가")

---

## 14. 개발 검증 체크리스트

### 14.1 새 페이지 추가 시

- [ ] app/(groupName)/newpage/page.tsx 생성
- [ ] 메타데이터 정의 (export const metadata)
- [ ] 헤더 메뉴 노출 여부 확인
  - [ ] 노출되면: components/header/nav-config.ts에 NAV_LINKS 항목 추가
- [ ] `npm run build` 성공 확인
- [ ] `tsc --noEmit` 타입 에러 없음 확인

### 14.2 새 컴포넌트 추가 시

- [ ] 올바른 디렉토리 위치 (UI/layout/dashboard/header/feature)
- [ ] Props 인터페이스 정의
- [ ] 클라이언트/서버 구분 (상호작용 필요시 'use client')
- [ ] 타입 에러 없음

### 14.3 Notion/Supabase 연동 시

- [ ] 환경 변수 추가 시: .env + .env.example 동시 수정
- [ ] API 클라이언트 구조 준수 (lib/supabase/server.ts, lib/notion/client.ts)
- [ ] 에러 처리 (try-catch 포함)
- [ ] 타임스탬프 갱신 로직 포함 (synced_at, updated_at)

### 14.4 폼 추가 시

- [ ] lib/validations.ts에 Zod 스키마 정의
- [ ] React Hook Form 사용
- [ ] 클라이언트 컴포넌트로 분리 ('use client')
- [ ] 에러 메시지 인라인 표시

---

## 15. 참고 문서

- **PRD**: `/docs/PRD.md` - 기능 명세 및 페이지별 요구사항
- **ROADMAP**: `/docs/ROADMAP.md` - 개발 단계별 작업 목록
- **CLAUDE.md**: `/CLAUDE.md` - 프로젝트 기술 스택 및 라이브러리 가이드
- **Task 디렉토리**: `/tasks/` - 각 단계별 상세 구현 명세

