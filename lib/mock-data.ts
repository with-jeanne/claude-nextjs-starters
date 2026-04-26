/**
 * 개발/테스트용 더미 데이터
 * Phase 2 UI 구현 시에만 사용 (실제 데이터는 Supabase에서 조회)
 */

import { Invoice, InvoiceItem, InvoiceWithItems } from '@/lib/types/invoice'

/** 더미 Invoice 데이터 (10개) */
export const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    notion_page_id: 'notion-001',
    title: '웹사이트 리디자인 프로젝트',
    description: '홈페이지 전체 리디자인 및 반응형 구현',
    client_name: '쿠팡',
    total_amount: 2500000,
    status: 'sent',
    public_token: 'token-abc123def456',
    issued_at: '2024-04-20',
    synced_at: '2024-04-25T10:30:00Z',
    created_at: '2024-04-20T08:00:00Z',
    updated_at: '2024-04-25T10:30:00Z',
  },
  {
    id: '2',
    notion_page_id: 'notion-002',
    title: '모바일 앱 개발',
    description: 'iOS/Android 네이티브 앱 개발',
    client_name: '배달의민족',
    total_amount: 5000000,
    status: 'draft',
    public_token: 'token-xyz789uvw012',
    issued_at: '2024-04-19',
    synced_at: '2024-04-25T09:15:00Z',
    created_at: '2024-04-19T14:00:00Z',
    updated_at: '2024-04-25T09:15:00Z',
  },
  {
    id: '3',
    notion_page_id: 'notion-003',
    title: 'SEO 최적화 컨설팅',
    description: '검색 엔진 최적화 및 키워드 전략',
    client_name: '마켓컬리',
    total_amount: 1200000,
    status: 'confirmed',
    public_token: 'token-rst345jkl678',
    issued_at: '2024-04-18',
    synced_at: '2024-04-24T16:45:00Z',
    created_at: '2024-04-18T10:00:00Z',
    updated_at: '2024-04-24T16:45:00Z',
  },
  {
    id: '4',
    notion_page_id: 'notion-004',
    title: '클라우드 인프라 구축',
    description: 'AWS 기반 확장 가능한 인프라 설계 및 구축',
    client_name: '당근마켓',
    total_amount: 3500000,
    status: 'sent',
    public_token: 'token-mno901pqr234',
    issued_at: '2024-04-17',
    synced_at: '2024-04-25T11:20:00Z',
    created_at: '2024-04-17T09:30:00Z',
    updated_at: '2024-04-25T11:20:00Z',
  },
  {
    id: '5',
    notion_page_id: 'notion-005',
    title: 'CI/CD 파이프라인 구축',
    description: 'GitHub Actions 자동화 및 배포 시스템',
    client_name: '라이프',
    total_amount: 800000,
    status: 'draft',
    public_token: 'token-stu567vwx890',
    issued_at: '2024-04-16',
    synced_at: '2024-04-25T13:00:00Z',
    created_at: '2024-04-16T15:00:00Z',
    updated_at: '2024-04-25T13:00:00Z',
  },
  {
    id: '6',
    notion_page_id: 'notion-006',
    title: '데이터베이스 마이그레이션',
    description: '레거시 DB → PostgreSQL 마이그레이션',
    client_name: '우아한형제들',
    total_amount: 2200000,
    status: 'confirmed',
    public_token: 'token-yza123bcd456',
    issued_at: '2024-04-15',
    synced_at: '2024-04-23T14:30:00Z',
    created_at: '2024-04-15T11:00:00Z',
    updated_at: '2024-04-23T14:30:00Z',
  },
  {
    id: '7',
    notion_page_id: 'notion-007',
    title: 'API 보안 감사',
    description: 'REST API 보안 취약점 진단 및 개선',
    client_name: '토스',
    total_amount: 1500000,
    status: 'draft',
    public_token: 'token-efg789hij012',
    issued_at: '2024-04-14',
    synced_at: '2024-04-25T15:45:00Z',
    created_at: '2024-04-14T13:00:00Z',
    updated_at: '2024-04-25T15:45:00Z',
  },
  {
    id: '8',
    notion_page_id: 'notion-008',
    title: 'TypeScript 타입 정의 작성',
    description: '레거시 JavaScript 코드 TypeScript 마이그레이션',
    client_name: '라인',
    total_amount: 1800000,
    status: 'sent',
    public_token: 'token-klm345nop678',
    issued_at: '2024-04-13',
    synced_at: '2024-04-25T17:20:00Z',
    created_at: '2024-04-13T10:30:00Z',
    updated_at: '2024-04-25T17:20:00Z',
  },
  {
    id: '9',
    notion_page_id: 'notion-009',
    title: '성능 최적화 컨설팅',
    description: 'Core Web Vitals 개선 및 번들 최적화',
    client_name: '카카오',
    total_amount: 900000,
    status: 'draft',
    public_token: 'token-qrs901tuv234',
    issued_at: '2024-04-12',
    synced_at: '2024-04-25T12:10:00Z',
    created_at: '2024-04-12T14:00:00Z',
    updated_at: '2024-04-25T12:10:00Z',
  },
  {
    id: '10',
    notion_page_id: 'notion-010',
    title: '테스트 자동화 구축',
    description: 'Jest, Playwright E2E 테스트 스위트 구축',
    client_name: '네이버',
    total_amount: 1300000,
    status: 'confirmed',
    public_token: 'token-wxy567zab890',
    issued_at: '2024-04-11',
    synced_at: '2024-04-22T09:00:00Z',
    created_at: '2024-04-11T09:00:00Z',
    updated_at: '2024-04-22T09:00:00Z',
  },
]

/** 더미 InvoiceItem 데이터 (30개+) */
export const MOCK_INVOICE_ITEMS: InvoiceItem[] = [
  // Invoice 1의 항목 (웹사이트 리디자인)
  {
    id: 'item-1',
    invoice_id: '1',
    description: '디자인 및 와이어프레임 작성',
    quantity: 40,
    unit_price: 150000,
    amount: 6000000,
  },
  {
    id: 'item-2',
    invoice_id: '1',
    description: '프론트엔드 개발 (HTML/CSS/JS)',
    quantity: 80,
    unit_price: 100000,
    amount: 8000000,
  },
  {
    id: 'item-3',
    invoice_id: '1',
    description: '백엔드 개발 (API)',
    quantity: 60,
    unit_price: 120000,
    amount: 7200000,
  },
  {
    id: 'item-4',
    invoice_id: '1',
    description: '테스트 및 배포',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },

  // Invoice 2의 항목 (모바일 앱)
  {
    id: 'item-5',
    invoice_id: '2',
    description: '기획 및 요구사항 분석',
    quantity: 30,
    unit_price: 150000,
    amount: 4500000,
  },
  {
    id: 'item-6',
    invoice_id: '2',
    description: 'iOS 개발',
    quantity: 100,
    unit_price: 150000,
    amount: 15000000,
  },
  {
    id: 'item-7',
    invoice_id: '2',
    description: 'Android 개발',
    quantity: 100,
    unit_price: 150000,
    amount: 15000000,
  },
  {
    id: 'item-8',
    invoice_id: '2',
    description: 'API 개발 및 백엔드',
    quantity: 80,
    unit_price: 150000,
    amount: 12000000,
  },

  // Invoice 3의 항목 (SEO)
  {
    id: 'item-9',
    invoice_id: '3',
    description: '키워드 리서치 및 경쟁사 분석',
    quantity: 16,
    unit_price: 100000,
    amount: 1600000,
  },
  {
    id: 'item-10',
    invoice_id: '3',
    description: '온페이지 SEO 최적화',
    quantity: 24,
    unit_price: 100000,
    amount: 2400000,
  },
  {
    id: 'item-11',
    invoice_id: '3',
    description: '백링크 전략 및 구축',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },

  // Invoice 4의 항목 (클라우드)
  {
    id: 'item-12',
    invoice_id: '4',
    description: '아키텍처 설계 및 인프라 구축',
    quantity: 60,
    unit_price: 150000,
    amount: 9000000,
  },
  {
    id: 'item-13',
    invoice_id: '4',
    description: '서버 설정 및 보안 구성',
    quantity: 40,
    unit_price: 120000,
    amount: 4800000,
  },
  {
    id: 'item-14',
    invoice_id: '4',
    description: '모니터링 및 로깅 시스템',
    quantity: 30,
    unit_price: 100000,
    amount: 3000000,
  },

  // Invoice 5의 항목 (CI/CD)
  {
    id: 'item-15',
    invoice_id: '5',
    description: '파이프라인 설계',
    quantity: 16,
    unit_price: 80000,
    amount: 1280000,
  },
  {
    id: 'item-16',
    invoice_id: '5',
    description: '자동 테스트 구성',
    quantity: 20,
    unit_price: 70000,
    amount: 1400000,
  },
  {
    id: 'item-17',
    invoice_id: '5',
    description: '자동 배포 설정',
    quantity: 20,
    unit_price: 70000,
    amount: 1400000,
  },

  // Invoice 6의 항목 (마이그레이션)
  {
    id: 'item-18',
    invoice_id: '6',
    description: '마이그레이션 계획 및 준비',
    quantity: 20,
    unit_price: 100000,
    amount: 2000000,
  },
  {
    id: 'item-19',
    invoice_id: '6',
    description: '데이터 변환 및 이관',
    quantity: 40,
    unit_price: 120000,
    amount: 4800000,
  },
  {
    id: 'item-20',
    invoice_id: '6',
    description: '검증 및 롤백 계획',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },

  // Invoice 7의 항목 (API 보안)
  {
    id: 'item-21',
    invoice_id: '7',
    description: '취약점 진단',
    quantity: 30,
    unit_price: 100000,
    amount: 3000000,
  },
  {
    id: 'item-22',
    invoice_id: '7',
    description: '보안 개선 권고안 작성',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },
  {
    id: 'item-23',
    invoice_id: '7',
    description: '개선 사항 구현 지원',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },

  // Invoice 8의 항목 (TypeScript)
  {
    id: 'item-24',
    invoice_id: '8',
    description: '타입 정의 설계',
    quantity: 20,
    unit_price: 90000,
    amount: 1800000,
  },
  {
    id: 'item-25',
    invoice_id: '8',
    description: '파일 단위 마이그레이션',
    quantity: 40,
    unit_price: 100000,
    amount: 4000000,
  },
  {
    id: 'item-26',
    invoice_id: '8',
    description: '타입 검사 및 테스트',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },

  // Invoice 9의 항목 (성능)
  {
    id: 'item-27',
    invoice_id: '9',
    description: '성능 분석 및 진단',
    quantity: 16,
    unit_price: 100000,
    amount: 1600000,
  },
  {
    id: 'item-28',
    invoice_id: '9',
    description: '최적화 구현',
    quantity: 20,
    unit_price: 80000,
    amount: 1600000,
  },
  {
    id: 'item-29',
    invoice_id: '9',
    description: '성능 모니터링 설정',
    quantity: 8,
    unit_price: 70000,
    amount: 560000,
  },

  // Invoice 10의 항목 (테스트)
  {
    id: 'item-30',
    invoice_id: '10',
    description: '유닛 테스트 작성',
    quantity: 40,
    unit_price: 100000,
    amount: 4000000,
  },
  {
    id: 'item-31',
    invoice_id: '10',
    description: 'E2E 테스트 시나리오 작성',
    quantity: 30,
    unit_price: 90000,
    amount: 2700000,
  },
  {
    id: 'item-32',
    invoice_id: '10',
    description: 'CI 통합 및 리포팅',
    quantity: 10,
    unit_price: 80000,
    amount: 800000,
  },
]

/**
 * Invoice + Items 조합 데이터 생성 함수
 * @param invoiceId - 견적서 ID
 * @returns Invoice와 관련 InvoiceItem을 포함한 InvoiceWithItems
 */
export function getMockInvoiceWithItems(invoiceId: string): InvoiceWithItems | undefined {
  const invoice = MOCK_INVOICES.find((inv) => inv.id === invoiceId)
  if (!invoice) return undefined

  const items = MOCK_INVOICE_ITEMS.filter((item) => item.invoice_id === invoiceId)
  return {
    ...invoice,
    items,
  }
}

/**
 * 모든 Invoice + Items 조합 데이터
 */
export function getAllMockInvoicesWithItems(): InvoiceWithItems[] {
  return MOCK_INVOICES.map((invoice) => ({
    ...invoice,
    items: MOCK_INVOICE_ITEMS.filter((item) => item.invoice_id === invoice.id),
  }))
}
