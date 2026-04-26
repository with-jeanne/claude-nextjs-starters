/**
 * 견적서 공개 페이지
 * PRD: F001, F004, F005
 * - 고유 토큰으로 견적서 내용 렌더링
 * - PDF 다운로드 (window.print() + 인쇄 CSS, MVP 1단계)
 * - 인증 불필요
 */
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { InvoiceView } from './invoice-view'

interface Props {
  params: Promise<{ token: string }>
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  // TODO: Supabase에서 토큰으로 견적서 조회 후 제목 반영
  return {
    title: '견적서 — Invoice',
    description: '견적서를 확인하고 PDF로 저장하세요.',
    // 검색 엔진 인덱싱 방지 (공개 링크이지만 노출 불필요)
    robots: { index: false, follow: false },
  }
}

export default async function InvoicePage({ params }: Props) {
  const { token } = await params

  // 토큰 기본 유효성 검사 (UUID v4 형식)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(token)) {
    notFound()
  }

  // TODO: Supabase에서 public_token으로 견적서 조회
  // const invoice = await getInvoiceByToken(token)
  // if (!invoice) notFound()

  return <InvoiceView token={token} />
}
