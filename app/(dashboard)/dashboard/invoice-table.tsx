'use client'

/**
 * 견적서 목록 테이블 컴포넌트
 * PRD: F002, F003, F011
 * - 견적서 목록 표시 (제목, 클라이언트명, 금액, 상태, 발행일)
 * - 공개 링크 복사 버튼
 * - 상태 드롭다운 (초안 / 발송됨 / 확인됨)
 */
import { useState } from 'react'
import { toast } from 'sonner'
import { Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Skeleton } from '@/components/ui/skeleton'
import type { InvoiceSummary, InvoiceStatus } from '@/lib/types'

/** 상태별 Badge variant 매핑 */
const STATUS_CONFIG: Record<InvoiceStatus, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  draft: { label: '초안', variant: 'outline' },
  sent: { label: '발송됨', variant: 'secondary' },
  confirmed: { label: '확인됨', variant: 'default' },
}

// TODO: 실제 구현 시 Supabase 쿼리로 교체
const MOCK_INVOICES: InvoiceSummary[] = [
  {
    id: '1',
    title: '웹사이트 개발 견적서',
    client_name: '홍길동',
    total_amount: 5500000,
    status: 'sent',
    public_token: 'a1b2c3d4-e5f6-4789-abcd-ef0123456789',
    issued_at: '2026-04-20',
    synced_at: '2026-04-25T10:00:00Z',
  },
  {
    id: '2',
    title: '모바일 앱 개발 견적서',
    client_name: '김철수',
    total_amount: 12000000,
    status: 'draft',
    public_token: 'b2c3d4e5-f6a7-4890-bcde-f01234567890',
    issued_at: '2026-04-22',
    synced_at: '2026-04-25T10:00:00Z',
  },
  {
    id: '3',
    title: 'UI/UX 디자인 견적서',
    client_name: '이영희',
    total_amount: 3200000,
    status: 'confirmed',
    public_token: 'c3d4e5f6-a7b8-4901-cdef-012345678901',
    issued_at: '2026-04-15',
    synced_at: '2026-04-25T10:00:00Z',
  },
]

export function InvoiceTable() {
  const [invoices, setInvoices] = useState<InvoiceSummary[]>(MOCK_INVOICES)
  const isLoading = false // TODO: 실제 로딩 상태로 교체

  const handleCopyLink = async (token: string) => {
    const url = `${window.location.origin}/invoice/${token}`
    await navigator.clipboard.writeText(url)
    toast.success('공개 링크가 클립보드에 복사되었습니다')
  }

  const handleStatusChange = async (invoiceId: string, newStatus: InvoiceStatus) => {
    // TODO: Supabase UPDATE 호출
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: newStatus } : inv))
    )
    toast.success('상태가 업데이트되었습니다')
  }

  const formatKRW = (amount: number) =>
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center">
        <p className="text-muted-foreground">견적서가 없습니다.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Notion 동기화 버튼을 눌러 데이터를 가져오세요.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>클라이언트</TableHead>
            <TableHead className="text-right">금액</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>발행일</TableHead>
            <TableHead className="text-right">액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const statusConfig = STATUS_CONFIG[invoice.status]
            return (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.title}</TableCell>
                <TableCell>{invoice.client_name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatKRW(invoice.total_amount)}
                </TableCell>
                <TableCell>
                  <Select
                    value={invoice.status}
                    onValueChange={(value) =>
                      handleStatusChange(invoice.id, value as InvoiceStatus)
                    }
                  >
                    <SelectTrigger className="w-28 h-8">
                      <SelectValue>
                        <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">초안</SelectItem>
                      <SelectItem value="sent">발송됨</SelectItem>
                      <SelectItem value="confirmed">확인됨</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-muted-foreground">{invoice.issued_at}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      onClick={() => handleCopyLink(invoice.public_token)}
                      title="공개 링크 복사"
                    >
                      <Copy className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      asChild
                      title="공개 페이지 열기"
                    >
                      <a
                        href={`/invoice/${invoice.public_token}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
