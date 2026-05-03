/**
 * 견적서 공개 페이지
 * PRD: F001, F004, F005
 * - 고유 토큰으로 견적서 내용 렌더링
 * - PDF 다운로드 (window.print() + 인쇄 CSS, MVP 1단계)
 * - 인증 불필요 (비로그인 공개 접근)
 */
import type { Metadata } from 'next'
import { InvoiceView } from './invoice-view'

interface Props {
  params: Promise<{ token: string }>
}

export async function generateMetadata(_props: Props): Promise<Metadata> {
  // TODO: Phase 3 - Supabase에서 토큰으로 견적서 조회 후 실제 제목 반영
  return {
    title: '견적서 — Invoice',
    description: '견적서를 확인하고 PDF로 저장하세요.',
    // 검색 엔진 인덱싱 방지 (고유 링크 공유 문서)
    robots: { index: false, follow: false },
  }
}

export default async function InvoicePage({ params }: Props) {
  const { token } = await params

  // TODO: Phase 3 - Supabase에서 public_token으로 견적서 조회 후 실제 데이터 전달
  // const invoice = await getInvoiceByToken(token)
  // if (!invoice) notFound()
  // Phase 2 (더미 단계): 토큰 무관하게 더미 데이터 렌더링

  return <InvoiceView token={token} />
}
