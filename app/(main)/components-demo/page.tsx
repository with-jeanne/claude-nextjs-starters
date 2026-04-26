/**
 * Phase 2 공통 컴포넌트 테스트 데모 페이지
 * 상태 배지, 빈 상태, 페이지 헤더 등의 렌더링을 검증
 */

import { StatusBadge } from '@/components/invoice/status-badge'
import { EmptyState } from '@/components/layout/empty-state'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'
import { MOCK_INVOICES, MOCK_INVOICE_ITEMS } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, FileText } from 'lucide-react'

export const metadata = {
  title: '컴포넌트 데모 — Invoice',
}

export default function ComponentsDemoPage() {
  return (
    <Container>
      <PageHeader
        title="공통 컴포넌트 라이브러리 데모"
        description="Phase 2 UI 구현을 위한 재사용 가능한 컴포넌트들"
      />

      <div className="section-divider" />

      {/* 상태 배지 데모 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">상태 배지 (StatusBadge)</h2>
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-2">
            <StatusBadge status="draft" />
            <span className="text-sm text-muted-foreground">draft</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusBadge status="sent" />
            <span className="text-sm text-muted-foreground">sent</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <StatusBadge status="confirmed" />
            <span className="text-sm text-muted-foreground">confirmed</span>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 빈 상태 데모 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">빈 상태 컴포넌트 (EmptyState)</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <EmptyState
            icon={<FileText className="h-6 w-6 text-blue-500" />}
            title="견적서 없음"
            description="아직 생성된 견적서가 없습니다. 첫 견적서를 만들어보세요."
            action={<Button>새 견적서 생성</Button>}
          />
          <EmptyState
            icon={<AlertCircle className="h-6 w-6 text-amber-500" />}
            title="동기화 필요"
            description="Notion에서 새로운 견적서를 확인할 수 있습니다."
            action={<Button variant="outline">Notion 동기화</Button>}
          />
        </div>
      </section>

      <div className="section-divider" />

      {/* 페이지 헤더 데모 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">페이지 헤더 (PageHeader)</h2>
        <PageHeader
          title="견적서 관리"
          description="Notion에서 동기화된 견적서 목록을 관리하고 클라이언트에게 공유하세요."
          action={<Button size="sm">Notion 동기화</Button>}
        />
      </section>

      <div className="section-divider" />

      {/* 더미 데이터 정보 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">더미 데이터 통계</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="invoice-card">
            <div className="mb-2 text-sm font-medium text-muted-foreground">총 견적서</div>
            <div className="text-3xl font-bold">{MOCK_INVOICES.length}</div>
            <div className="mt-2 text-xs text-muted-foreground">각 견적서는 고유 ID와 public_token 포함</div>
          </div>
          <div className="invoice-card">
            <div className="mb-2 text-sm font-medium text-muted-foreground">총 항목</div>
            <div className="text-3xl font-bold">{MOCK_INVOICE_ITEMS.length}</div>
            <div className="mt-2 text-xs text-muted-foreground">모든 항목이 견적서에 링크됨</div>
          </div>
          <div className="invoice-card">
            <div className="mb-2 text-sm font-medium text-muted-foreground">상태 분포</div>
            <div className="text-sm space-y-1">
              <div>
                초안: {MOCK_INVOICES.filter((i) => i.status === 'draft').length}개
              </div>
              <div>
                발송됨: {MOCK_INVOICES.filter((i) => i.status === 'sent').length}개
              </div>
              <div>
                확인됨: {MOCK_INVOICES.filter((i) => i.status === 'confirmed').length}개
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* 샘플 견적서 카드 */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">샘플 견적서 (더미 데이터)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_INVOICES.slice(0, 3).map((invoice) => (
            <div key={invoice.id} className="invoice-card">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{invoice.title}</h3>
                  <p className="text-sm text-muted-foreground">{invoice.client_name}</p>
                </div>
                <StatusBadge status={invoice.status} />
              </div>
              <div className="mb-3 text-lg font-bold">
                ₩{invoice.total_amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                발행일: {new Date(invoice.issued_at).toLocaleDateString('ko-KR')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  )
}
