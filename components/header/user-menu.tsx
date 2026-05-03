'use client'

/**
 * 사용자 드롭다운 메뉴 컴포넌트
 * 로그인 상태에서 헤더 우측에 표시
 * - 대시보드 링크
 * - 로그아웃
 * TODO: Phase 3 - 실제 사용자 정보(이메일, 이름) 연동
 */

import Link from 'next/link'
import { LogOut, LayoutDashboard, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

/** 더미 사용자 정보 (Phase 3에서 실제 인증 사용자로 교체) */
const MOCK_USER = {
  email: 'user@example.com',
  initial: 'U',
}

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="사용자 메뉴 열기"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              {MOCK_USER.initial}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* 사용자 정보 헤더 */}
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">내 계정</span>
          <span className="text-xs font-normal text-muted-foreground truncate">
            {/* TODO: Phase 3 - 실제 사용자 이메일로 교체 */}
            {MOCK_USER.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* 프로필 */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            프로필
          </Link>
        </DropdownMenuItem>

        {/* 대시보드 */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
            대시보드
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* 로그아웃 */}
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={() => {
            // TODO: Phase 3 - 실제 로그아웃 로직 구현 (Supabase signOut)
          }}
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
