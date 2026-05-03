'use client'

/**
 * 견적서 공개 뷰 컴포넌트 (클라이언트)
 * PRD: F004, F005
 * - 더미 데이터로 견적서 전체 레이아웃 렌더링
 * - PDF/인쇄 버튼 (window.print() 방식, MVP 1단계)
 * - 반응형 디자인 (모바일/태블릿/데스크탑)
 * - 인쇄 최적화 (print: 변형 클래스 사용)
 */

import { getMockInvoiceWithItems } from '@/lib/mock-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '@/components/invoice/status-badge'
import { Download, Printer, FileText, Building2, User } from 'lucide-react'

/** 발행인 더미 데이터 (실제 구현 시 사용자 프로필에서 조회) */
const MOCK_ISSUER = {
  name: '김민준',
  company: '코드스튜디오',
  email: 'contact@codestudio.kr',
  phone: '010-1234-5678',
  address: '서울시 강남구 테헤란로 123, 5층',
  businessNumber: '123-45-67890',
}

/**
 * 금액을 한국 원화(KRW) 형식으로 포맷
 * 예: 2500000 → ₩2,500,000
 */
function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

/**
 * 날짜 문자열을 한국어 형식으로 포맷
 * 예: '2024-04-20' → '2024년 4월 20일'
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * 발행일로부터 30일 후 만기일 계산
 */
function getDueDate(issuedAt: string): string {
  const date = new Date(issuedAt)
  date.setDate(date.getDate() + 30)
  return formatDate(date.toISOString().split('T')[0])
}

/**
 * 견적서 번호 포맷
 * 예: id '1' → '#INV-0001'
 */
function formatInvoiceNumber(id: string): string {
  const numericPart = id.replace(/\D/g, '') || id
  return `#INV-${numericPart.padStart(4, '0')}`
}

interface InvoiceViewProps {
  /** 공개 링크 토큰 (Phase 3에서 실제 데이터 조회에 사용) */
  token: string
}

export function InvoiceView({ token: _token }: InvoiceViewProps) {
  // TODO: Phase 3 - _token을 사용하여 Supabase에서 실제 견적서 데이터 조회
  // const invoiceData = await getInvoiceByToken(_token)
  // Phase 2 더미 단계: 첫 번째 더미 견적서 데이터 사용
  const invoiceData = getMockInvoiceWithItems('1')

  /** 인쇄/PDF 저장 실행 */
  const handlePrint = () => {
    // TODO: Phase 4 - @react-pdf/renderer 기반 서버 사이드 PDF 생성으로 교체 가능
    window.print()
  }

  if (!invoiceData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">견적서를 찾을 수 없습니다.</p>
        </div>
      </div>
    )
  }

  const { items, ...invoice } = invoiceData

  /** 소계: 모든 항목 금액 합산 */
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  /** 부가세: 소계의 10% */
  const tax = Math.round(subtotal * 0.1)
  /** 합계: 소계 + 부가세 */
  const total = subtotal + tax

  const invoiceNumber = formatInvoiceNumber(invoice.id)

  return (
    <div className="min-h-screen bg-muted/20 print:bg-white">
      {/* 상단 액션바: 인쇄 시 숨김 */}
      <div
        className="print:hidden sticky top-0 z-10 border-b bg-background/95 backdrop-blur-sm"
        aria-label="견적서 액션 영역"
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          {/* 로고/브랜딩 */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold text-foreground">Invoice</span>
          </div>

          {/* 액션 버튼 그룹 */}
          <div className="flex items-center gap-2">
            <p className="hidden text-sm text-muted-foreground sm:block">
              견적서를 확인하고 저장하세요
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              aria-label="견적서 인쇄"
            >
              <Printer className="mr-1.5 h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">인쇄</span>
              <span className="sm:hidden">인쇄</span>
            </Button>
            <Button
              size="sm"
              onClick={handlePrint}
              aria-label="PDF로 저장"
            >
              <Download className="mr-1.5 h-4 w-4" aria-hidden="true" />
              PDF 저장
            </Button>
          </div>
        </div>
      </div>

      {/* 견적서 문서 본문 */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 print:max-w-none print:px-0 print:py-0">
        <article
          aria-label={`견적서 ${invoiceNumber}`}
          className="rounded-xl border bg-card shadow-sm print:rounded-none print:border-0 print:shadow-none"
        >
          {/* ─────────────────────────────── 문서 헤더 ─────────────────────────────── */}
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8 print:p-8">
            {/* 제목 및 번호 */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                INVOICE
              </h1>
              <p className="mt-1 text-lg font-medium text-muted-foreground">
                {invoice.title}
              </p>
            </div>

            {/* 견적서 번호 + 상태 */}
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="text-xl font-semibold text-foreground">{invoiceNumber}</p>
              <StatusBadge status={invoice.status} />
            </div>
          </div>

          <Separator />

          {/* ─────────────────────────────── 발행인/수신인 ─────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 p-6 sm:p-8 md:grid-cols-2 print:p-8">
            {/* 발행인 정보 */}
            <Card className="border-border/60">
              <CardContent className="pt-4">
                <div className="mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    발행인
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{MOCK_ISSUER.company}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_ISSUER.name}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_ISSUER.email}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_ISSUER.phone}</p>
                  <p className="text-sm text-muted-foreground">{MOCK_ISSUER.address}</p>
                  <p className="text-xs text-muted-foreground/70">
                    사업자등록번호: {MOCK_ISSUER.businessNumber}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 수신인 정보 */}
            <Card className="border-border/60">
              <CardContent className="pt-4">
                <div className="mb-3 flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    수신인
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{invoice.client_name} 귀중</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    아래와 같이 견적서를 제출합니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ─────────────────────────────── 메타 정보 ─────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4 border-y bg-muted/30 px-6 py-4 sm:grid-cols-3 sm:px-8 print:bg-white print:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                발행일
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {formatDate(invoice.issued_at)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                만기일
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {getDueDate(invoice.issued_at)}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                결제 조건
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">발행 후 30일 이내</p>
            </div>
          </div>

          {/* ─────────────────────────────── 품목 테이블 ─────────────────────────────── */}
          <div className="px-6 py-6 sm:px-8 sm:py-8 print:px-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              견적 항목
            </h2>
            <div className="overflow-x-auto rounded-lg border print:overflow-visible print:border-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead
                      scope="col"
                      className="w-[50%] py-3 pl-4 font-semibold"
                    >
                      항목 설명
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="py-3 text-right font-semibold"
                    >
                      수량
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="hidden py-3 text-right font-semibold sm:table-cell print:table-cell"
                    >
                      단가
                    </TableHead>
                    <TableHead
                      scope="col"
                      className="py-3 pr-4 text-right font-semibold"
                    >
                      소계
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="py-3 pl-4 font-medium">
                        {item.description}
                      </TableCell>
                      <TableCell className="py-3 text-right text-muted-foreground">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="hidden py-3 text-right text-muted-foreground sm:table-cell print:table-cell">
                        {formatKRW(item.unit_price)}
                      </TableCell>
                      <TableCell className="py-3 pr-4 text-right font-medium">
                        {formatKRW(item.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ─────────────────────────────── 합계 영역 ─────────────────────────────── */}
          <div className="flex justify-end px-6 pb-6 sm:px-8 sm:pb-8 print:px-8 print:pb-8">
            <div className="w-full max-w-xs rounded-lg border bg-muted/30 p-4 print:border-border">
              {/* 소계 */}
              <div className="flex items-center justify-between py-1.5">
                <span className="text-sm text-muted-foreground">소계</span>
                <span className="text-sm font-medium tabular-nums">{formatKRW(subtotal)}</span>
              </div>
              {/* 부가세 */}
              <div className="flex items-center justify-between py-1.5">
                <span className="text-sm text-muted-foreground">부가세 (10%)</span>
                <span className="text-sm font-medium tabular-nums">{formatKRW(tax)}</span>
              </div>
              <Separator className="my-2" />
              {/* 합계 */}
              <div className="flex items-center justify-between py-1">
                <span className="text-base font-bold">합계</span>
                <span className="text-base font-bold tabular-nums">{formatKRW(total)}</span>
              </div>
              <p className="mt-1 text-right text-xs text-muted-foreground">
                부가세 포함 금액
              </p>
            </div>
          </div>

          {/* ─────────────────────────────── 비고 ─────────────────────────────── */}
          {invoice.description && (
            <div className="border-t px-6 py-6 sm:px-8 print:px-8">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                비고
              </h2>
              <p className="text-sm text-foreground/80">{invoice.description}</p>
            </div>
          )}

          {/* ─────────────────────────────── 안내 문구 (인쇄 시 숨김) ─────────────────────────────── */}
          <div className="print:hidden border-t bg-muted/20 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                이 견적서는 고유 링크로 공유된 문서입니다.
              </p>
              <p className="text-sm text-muted-foreground">
                상단의 &apos;PDF 저장&apos; 버튼을 클릭하거나 브라우저 인쇄 기능(Ctrl+P / Cmd+P)을
                이용하면 PDF로 저장할 수 있습니다.
              </p>
            </div>
          </div>

          {/* ─────────────────────────────── 문서 하단 (인쇄 전용) ─────────────────────────────── */}
          <div className="hidden print:block border-t px-8 py-4">
            <p className="text-center text-xs text-muted-foreground">
              본 견적서는 {MOCK_ISSUER.company}가 발행한 공식 문서입니다. 문의: {MOCK_ISSUER.email}
            </p>
          </div>
        </article>

        {/* 하단 여백 (모바일 스크롤 편의) */}
        <div className="h-8 print:hidden" aria-hidden="true" />
      </main>
    </div>
  )
}
