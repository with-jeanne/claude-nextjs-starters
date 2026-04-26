/**
 * Supabase 데이터베이스 타입 정의
 * Supabase CLI 자동 생성 타입과 호환되는 수동 정의 버전
 * 추후 `npx supabase gen types typescript`로 교체 가능
 */

import type { Invoice, InvoiceItem } from './invoice'

/** Supabase Database 스키마 타입 */
export interface Database {
  public: {
    Tables: {
      invoices: {
        Row: Invoice
        Insert: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Invoice, 'id' | 'created_at'>>
      }
      invoice_items: {
        Row: InvoiceItem
        Insert: Omit<InvoiceItem, 'id'>
        Update: Partial<Omit<InvoiceItem, 'id'>>
      }
    }
  }
}
