/**
 * 대시보드 페이지 - Invoice 목록 관리
 * PRD: F001, F002, F003, F011
 * - 견적서 목록 테이블 (제목, 클라이언트명, 금액, 상태, 생성일)
 * - Notion 동기화 버튼
 * - 공개 링크 복사
 * - 상태 드롭다운
 */
import type { Metadata } from 'next'
import { InvoiceTable } from './invoice-table'
import { SyncButton } from './sync-button'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: '대시보드 — Invoice',
}

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader
        title="견적서 관리"
        description="Notion에서 동기화된 견적서 목록을 관리하고 클라이언트에게 공유하세요."
      >
        <SyncButton />
      </PageHeader>

      {/* 견적서 목록 테이블 */}
      <InvoiceTable />
    </Container>
  )
}
