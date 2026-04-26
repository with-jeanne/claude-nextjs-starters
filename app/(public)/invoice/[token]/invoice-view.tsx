'use client'

/**
 * 견적서 공개 뷰 컴포넌트 (클라이언트)
 * PRD: F004, F005
 * - 견적서 내용 렌더링
 * - PDF 다운로드 버튼 (window.print() 방식, MVP 1단계)
 */
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Download, Printer } from 'lucide-react'

interface InvoiceViewProps {
  token: string
}

// TODO: 실제 구현 시 Supabase에서 조회한 데이터로 교체
const MOCK_INVOICE = {
  title: '웹사이트 개발 견적서',
  client_name: '홍길동',
  issued_at: '2026-04-26',
  total_amount: 5500000,
  status: 'sent' as const,
  issuer: {
    name: '김개발',
    company: '개발스튜디오',
    email: 'dev@studio.com',
  },
  items: [
    { description: '기획 및 디자인', quantity: 1, unit_price: 1000000, amount: 1000000 },
    { description: '프론트엔드 개발', quantity: 1, unit_price: 3000000, amount: 3000000 },
    { description: '백엔드 개발', quantity: 1, unit_price: 1500000, amount: 1500000 },
  ],
}

export function InvoiceView({ token: _token }: InvoiceViewProps) {
  const invoice = MOCK_INVOICE

  const handlePrint = () => {
    window.print()
  }

  const formatKRW = (amount: number) =>
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)

  return (
    <>
      {/* 인쇄 시 숨길 액션 영역 */}
      <div className="print:hidden border-b bg-muted/30 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <p className="text-sm text-muted-foreground">
            견적서를 확인하고 PDF로 저장하세요
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 size-4" />
              인쇄
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="mr-2 size-4" />
              PDF 저장
            </Button>
          </div>
        </div>
      </div>

      {/* 견적서 본문 */}
      <main className="mx-auto max-w-3xl px-6 py-10 print:px-0 print:py-0">
        {/* 헤더 */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{invoice.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">발행일: {invoice.issued_at}</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">{invoice.issuer.company}</p>
            <p>{invoice.issuer.name}</p>
            <p>{invoice.issuer.email}</p>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* 수신인 정보 */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">수신</p>
          <p className="mt-1 text-lg font-semibold">{invoice.client_name} 귀중</p>
        </div>

        {/* 항목 테이블 */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left font-medium text-muted-foreground">항목</th>
                <th className="pb-3 text-right font-medium text-muted-foreground">수량</th>
                <th className="pb-3 text-right font-medium text-muted-foreground">단가</th>
                <th className="pb-3 text-right font-medium text-muted-foreground">소계</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{formatKRW(item.unit_price)}</td>
                  <td className="py-3 text-right font-medium">{formatKRW(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 합계 */}
        <div className="flex justify-end">
          <div className="w-64">
            <Separator className="mb-3" />
            <div className="flex justify-between text-base font-bold">
              <span>합계</span>
              <span>{formatKRW(invoice.total_amount)}</span>
            </div>
            <p className="mt-1 text-right text-xs text-muted-foreground">VAT 포함</p>
          </div>
        </div>

        {/* 안내 문구 */}
        <div className="mt-12 rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground print:hidden">
          <p>이 견적서는 고유 링크로 공유된 문서입니다.</p>
          <p>PDF 저장 버튼을 클릭하거나 브라우저 인쇄 기능을 사용하세요.</p>
        </div>
      </main>
    </>
  )
}
