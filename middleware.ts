import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // (auth) 그룹: 비로그인 전용
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    // 로그인 상태 체크 (Phase 3에서 Supabase 인증 추가)
    // 현재는 기본 구조만 유지
    return undefined
  }

  // (dashboard) 그룹: 로그인 필수
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) {
    // 로그인 상태 체크 필수
    // Phase 3: Supabase 인증 상태 확인
    // 비로그인 상태면 /login으로 리디렉션
    return undefined
  }

  // (public) 그룹: public_token 검증
  if (pathname.startsWith('/invoice/')) {
    // Phase 3: public_token 검증
    // 경로: /invoice/[token] 형식
    // 토큰 무효 시 404 페이지로 리디렉션
    return undefined
  }

  // (main) 그룹: 모두 접근 가능
  // URL 리마이트 처리 (선택사항)
  return undefined
}

export const config = {
  // 미들웨어 적용 경로 (정적 파일, API는 제외)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
