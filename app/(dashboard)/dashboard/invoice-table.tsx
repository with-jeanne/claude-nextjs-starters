'use client'

/**
 * 견적서 목록 테이블 컴포넌트
 * PRD: F002 (견적서 목록 조회), F003 (공개 링크 생성), F011 (견적서 상태 관리)
 *
 * - 더미 데이터(MOCK_INVOICES) 기반 목록 표시
 * - 행 클릭 → 상세 미리보기 Dialog 모달
 * - 행별 공개 링크 복사 버튼 (클립보드 + 토스트)
 * - 상태 드롭다운 (초안 / 발송됨 / 확인됨)
 * - 빈 상태 EmptyState 컴포넌트
 * - 반응형: 모바일 가로 스크롤, 데스크탑 전체 컬럼
 */

import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { StatusBadge } from '@/components/invoice/status-badge'
import { EmptyState } from '@/components/layout/empty-state'
import { MOCK_INVOICES, getMockInvoiceWithItems } from '@/lib/mock-data'
import type { InvoiceSummary, InvoiceStatus, InvoiceWithItems } from '@/lib/types'

/** KRW 금액 포맷 헬퍼 */
function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

export function InvoiceTable() {
  // TODO: Phase 3에서 Supabase 쿼리 결과로 교체
  const [invoices, setInvoices] = useState<InvoiceSummary[]>(MOCK_INVOICES)

  // 상세 미리보기 모달용 선택된 견적서
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceWithItems | null>(null)

  /**
   * 행 클릭 핸들러 — 상세 미리보기 Dialog 오픈
   */
  const handleRowClick = (invoiceId: string) => {
    // TODO: Phase 3에서 Supabase 쿼리로 교체
    const detail = getMockInvoiceWithItems(invoiceId)
    if (detail) setSelectedInvoice(detail)
  }

  /**
   * 공개 링크 복사 핸들러
   * 클립보드에 토큰 포함 URL 복사 후 토스트 알림
   */
  const handleCopyLink = async (token: string, e: React.MouseEvent) => {
    // 행 클릭 이벤트 버블링 차단
    e.stopPropagation()
    // TODO: Phase 3에서 window.location.origin → NEXT_PUBLIC_APP_URL 환경 변수로 교체
    const url = `${window.location.origin}/invoice/${token}`
    await navigator.clipboard.writeText(url)
    toast.success('공개 링크가 클립보드에 복사되었습니다')
  }

  /**
   * 상태 드롭다운 변경 핸들러
   * TODO: Phase 3에서 Supabase UPDATE 호출로 교체
   */
  const handleStatusChange = (invoiceId: string, newStatus: InvoiceStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: newStatus } : inv))
    )
    toast.success('상태가 업데이트되었습니다')
  }

  /**
   * 모달 내 공개 링크 복사 핸들러
   */
  const handleModalCopyLink = async (token: string) => {
    // TODO: Phase 3에서 환경 변수 URL로 교체
    const url = `${window.location.origin}/invoice/${token}`
    await navigator.clipboard.writeText(url)
    toast.success('공개 링크가 클립보드에 복사되었습니다')
  }

  // 빈 상태 처리
  if (invoices.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />}
        title="견적서가 없습니다"
        description="Notion 동기화 버튼을 눌러 견적서 데이터를 가져오세요."
        action={
          <Button variant="outline" onClick={() => {}}>
            {/* TODO: 동기화 로직 구현 필요 */}
            Notion 동기화
          </Button>
        }
      />
    )
  }

  return (
    <>
      {/* 견적서 목록 테이블 — 모바일에서 가로 스크롤 */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {/* 제목: 모든 화면에서 표시 */}
              <TableHead className="min-w-[160px]">제목</TableHead>
              {/* 클라이언트: sm 이상에서 표시 */}
              <TableHead className="hidden sm:table-cell min-w-[100px]">클라이언트</TableHead>
              {/* 금액: md 이상에서 표시 */}
              <TableHead className="hidden md:table-cell text-right min-w-[120px]">금액</TableHead>
              {/* 상태: 모든 화면에서 표시 */}
              <TableHead className="min-w-[120px]">상태</TableHead>
              {/* 발행일: lg 이상에서 표시 */}
              <TableHead className="hidden lg:table-cell min-w-[100px]">발행일</TableHead>
              {/* 액션: 모든 화면에서 표시 */}
              <TableHead className="text-right min-w-[100px]">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => handleRowClick(invoice.id)}
                aria-label={`${invoice.title} 상세 보기`}
              >
                {/* 제목 */}
                <TableCell className="font-medium">{invoice.title}</TableCell>

                {/* 클라이언트명: sm 이상 */}
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {invoice.client_name}
                </TableCell>

                {/* 금액: md 이상 */}
                <TableCell className="hidden md:table-cell text-right tabular-nums">
                  {formatKRW(invoice.total_amount)}
                </TableCell>

                {/* 상태 드롭다운 */}
                <TableCell
                  onClick={(e) => e.stopPropagation()}
                  aria-label="상태 변경"
                >
                  <Select
                    value={invoice.status}
                    onValueChange={(value) =>
                      handleStatusChange(invoice.id, value as InvoiceStatus)
                    }
                  >
                    <SelectTrigger
                      className="w-28 h-8"
                      aria-label={`현재 상태: ${invoice.status}`}
                    >
                      <SelectValue>
                        <StatusBadge status={invoice.status} />
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">초안</SelectItem>
                      <SelectItem value="sent">발송됨</SelectItem>
                      <SelectItem value="confirmed">확인됨</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* 발행일: lg 이상 */}
                <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                  {invoice.issued_at}
                </TableCell>

                {/* 액션 버튼 */}
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-end gap-1">
                    {/* 공개 링크 복사 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={(e) => handleCopyLink(invoice.public_token, e)}
                      aria-label="공개 링크 복사"
                      title="공개 링크 복사"
                    >
                      <Copy className="size-4" />
                    </Button>

                    {/* 공개 페이지 새 탭 열기 버튼 */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      asChild
                      aria-label="공개 페이지 열기"
                      title="공개 페이지 열기"
                    >
                      <a
                        href={`/invoice/${invoice.public_token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 견적서 상세 미리보기 Dialog 모달 */}
      <Dialog
        open={!!selectedInvoice}
        onOpenChange={(open) => {
          if (!open) setSelectedInvoice(null)
        }}
      >
        {selectedInvoice && (
          <DialogContent
            className="sm:max-w-2xl max-h-[90vh] overflow-y-auto"
            aria-describedby="invoice-detail-description"
          >
            <DialogHeader>
              <DialogTitle className="pr-8 text-lg font-semibold leading-tight">
                {selectedInvoice.title}
              </DialogTitle>
              <DialogDescription id="invoice-detail-description">
                견적서 상세 정보를 확인합니다.
              </DialogDescription>
            </DialogHeader>

            {/* 견적서 메타 정보 */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 rounded-lg bg-muted/40 p-4 text-sm">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  클라이언트
                </p>
                <p className="font-medium">{selectedInvoice.client_name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  합계 금액
                </p>
                <p className="font-semibold tabular-nums">
                  {formatKRW(selectedInvoice.total_amount)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  상태
                </p>
                <StatusBadge status={selectedInvoice.status} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  발행일
                </p>
                <p>{selectedInvoice.issued_at}</p>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  마지막 동기화
                </p>
                <p className="text-muted-foreground">
                  {new Date(selectedInvoice.synced_at).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>

            {/* 설명 */}
            {selectedInvoice.description && (
              <div className="space-y-1 text-sm">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  설명
                </p>
                <p className="text-muted-foreground">{selectedInvoice.description}</p>
              </div>
            )}

            <Separator />

            {/* 견적 항목 테이블 */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">견적 항목</h3>
              {selectedInvoice.items.length > 0 ? (
                <div className="overflow-x-auto rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>항목 설명</TableHead>
                        <TableHead className="text-right w-20">수량</TableHead>
                        <TableHead className="text-right hidden sm:table-cell w-28">단가</TableHead>
                        <TableHead className="text-right w-28">소계</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="text-sm">{item.description}</TableCell>
                          <TableCell className="text-right text-sm tabular-nums">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right text-sm tabular-nums hidden sm:table-cell">
                            {formatKRW(item.unit_price)}
                          </TableCell>
                          <TableCell className="text-right text-sm tabular-nums font-medium">
                            {formatKRW(item.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  등록된 견적 항목이 없습니다.
                </p>
              )}
            </div>

            {/* 합계 요약 */}
            <div className="flex justify-end">
              <div className="rounded-lg bg-muted/40 px-4 py-3 text-sm space-y-1 min-w-[200px]">
                <div className="flex justify-between gap-8">
                  <span className="text-muted-foreground">합계</span>
                  <span className="font-semibold tabular-nums">
                    {formatKRW(selectedInvoice.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* 모달 액션 푸터 */}
            <DialogFooter>
              {/* 공개 링크 복사 버튼 */}
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => handleModalCopyLink(selectedInvoice.public_token)}
              >
                <Copy className="size-4" />
                링크 복사
              </Button>

              {/* 공개 페이지 새 탭 열기 */}
              <Button
                variant="outline"
                className="gap-2"
                asChild
              >
                <a
                  href={`/invoice/${selectedInvoice.public_token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                  공개 페이지 열기
                </a>
              </Button>

              {/* 닫기 버튼 */}
              <DialogClose asChild>
                <Button variant="default">닫기</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
