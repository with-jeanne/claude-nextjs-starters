/**
 * Invoice MVP 핵심 데이터 모델
 * PRD 섹션 6 (데이터 모델) 기반
 */

/** 견적서 상태값 */
export type InvoiceStatus = 'draft' | 'sent' | 'confirmed'

/** 견적서 (Invoice) - Supabase invoices 테이블 매핑 */
export interface Invoice {
  id: string
  /** Notion 페이지 ID (동기화 키) */
  notion_page_id: string
  /** 견적서 제목 */
  title: string
  /** 수신 클라이언트명 */
  client_name: string
  /** 합계 금액 */
  total_amount: number
  /** 상태: 초안 / 발송됨 / 확인됨 */
  status: InvoiceStatus
  /** 공개 링크용 UUID 기반 토큰 */
  public_token: string
  /** 발행일 */
  issued_at: string
  /** 마지막 Notion 동기화 시각 */
  synced_at: string
  /** 생성일 */
  created_at: string
  /** 수정일 */
  updated_at: string
}

/** 견적 항목 (InvoiceItem) - Supabase invoice_items 테이블 매핑 */
export interface InvoiceItem {
  id: string
  /** 소속 견적서 ID */
  invoice_id: string
  /** 항목 설명 */
  description: string
  /** 수량 */
  quantity: number
  /** 단가 */
  unit_price: number
  /** 소계 (quantity × unit_price) */
  amount: number
}

/** 관리자 계정 (User) - Supabase Auth 연동 */
export interface User {
  id: string
  email: string
  created_at: string
}

/** 견적서 + 항목 조합 (공개 페이지 렌더링용) */
export interface InvoiceWithItems extends Invoice {
  items: InvoiceItem[]
}

/** 대시보드 목록 표시용 요약 타입 */
export type InvoiceSummary = Pick<
  Invoice,
  'id' | 'title' | 'client_name' | 'total_amount' | 'status' | 'public_token' | 'issued_at' | 'synced_at'
>
