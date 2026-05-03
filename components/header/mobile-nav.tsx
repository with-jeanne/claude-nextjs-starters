'use client'

/**
 * 모바일 네비게이션 컴포넌트
 * 햄버거 버튼을 눌러 사이드 시트로 메뉴를 표시합니다.
 * - 비로그인: 로그인 / 회원가입 버튼
 * - 로그인: 사용자 이메일 표시 + 로그아웃 버튼
 * TODO: Phase 3 - isLoggedIn을 실제 Supabase 세션으로 교체
 */

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, LogOut, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/components/header/nav-config'

interface MobileNavProps {
  /**
   * 로그인 여부 (더미 상태)
   * TODO: Phase 3 - 실제 Supabase 세션 기반으로 교체
   */
  isLoggedIn?: boolean
}

/** 더미 사용자 이메일 (Phase 3에서 실제 인증 사용자로 교체) */
const MOCK_USER_EMAIL = 'user@example.com'

export function MobileNav({ isLoggedIn = false }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="메뉴 열기">
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-72 flex-col">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>

        {/* 주요 네비게이션 링크 */}
        <nav className="mt-6 flex flex-col gap-1" aria-label="모바일 네비게이션">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* 하단 인증 영역 (flex-1로 밀어냄) */}
        <div className="mt-auto flex flex-col gap-3">
          <Separator />

          {isLoggedIn ? (
            /* 로그인 상태: 사용자 정보 + 로그아웃 */
            <div className="flex flex-col gap-2">
              {/* 사용자 이메일 표시 */}
              <p className="truncate px-1 text-xs text-muted-foreground">
                {/* TODO: Phase 3 - 실제 사용자 이메일로 교체 */}
                {MOCK_USER_EMAIL}
              </p>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setOpen(false)
                  // TODO: Phase 3 - 실제 로그아웃 로직 구현 (Supabase signOut)
                }}
                aria-label="로그아웃"
              >
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                로그아웃
              </Button>
            </div>
          ) : (
            /* 비로그인 상태: 로그인 + 회원가입 버튼 */
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
                  로그인
                </Link>
              </Button>
              <Button asChild className="w-full" onClick={() => setOpen(false)}>
                <Link href="/register">
                  <UserPlus className="mr-2 h-4 w-4" aria-hidden="true" />
                  회원가입
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
