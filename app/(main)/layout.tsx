/**
 * 메인 영역 레이아웃
 * 헤더 + 콘텐츠 + 푸터 구조
 * TODO: Phase 3 - isLoggedIn을 Supabase 세션 기반 실제 인증 상태로 교체
 */

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  // TODO: Phase 3 - Supabase 서버 세션 조회 후 isLoggedIn 결정
  // const { data: { session } } = await supabase.auth.getSession()
  // const isLoggedIn = !!session
  const isLoggedIn = false

  return (
    <div className="flex flex-col flex-1">
      <Header isLoggedIn={isLoggedIn} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
