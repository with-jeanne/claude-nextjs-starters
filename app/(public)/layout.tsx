/**
 * 공개 영역 레이아웃
 * 인증 불필요 - 고유 토큰으로 접근 제어
 * 헤더/사이드바 없이 미니멀 레이아웃 제공
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
