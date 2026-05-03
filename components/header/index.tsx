/**
 * 헤더 컴포넌트
 * (main) 레이아웃에서 사용되는 상단 네비게이션 바
 * - 비로그인: 로그인 / 회원가입 버튼 표시
 * - 로그인: 사용자 아바타 드롭다운 메뉴 표시
 * - 모바일: 햄버거 메뉴로 축소
 * TODO: Phase 3 - isLoggedIn을 Supabase 세션 기반으로 교체
 */

import Link from 'next/link'
import { LogIn, UserPlus } from 'lucide-react'
import { NavLinks } from '@/components/header/nav-links'
import { MobileNav } from '@/components/header/mobile-nav'
import { UserMenu } from '@/components/header/user-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  /**
   * 로그인 여부 (더미 상태)
   * TODO: Phase 3 - 실제 Supabase 세션으로 교체 (기본값: false)
   */
  isLoggedIn?: boolean
}

export function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground"
            aria-label="Invoice 홈으로 이동"
          >
            <span className="text-primary" aria-hidden="true">⬡</span>
            <span>Invoice</span>
          </Link>

          {/* 데스크탑 우측 메뉴 */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <NavLinks />
            <ThemeToggle />

            {isLoggedIn ? (
              /* 로그인 상태: 사용자 드롭다운 메뉴 */
              <UserMenu />
            ) : (
              /* 비로그인 상태: 로그인 + 회원가입 버튼 */
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" aria-label="로그인 페이지로 이동">
                  <Link href="/login">
                    <LogIn className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    로그인
                  </Link>
                </Button>
                <Button asChild size="sm" aria-label="회원가입 페이지로 이동">
                  <Link href="/register">
                    <UserPlus className="mr-1.5 h-4 w-4" aria-hidden="true" />
                    회원가입
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* 모바일 우측 메뉴 */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileNav isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </Container>
    </header>
  )
}
