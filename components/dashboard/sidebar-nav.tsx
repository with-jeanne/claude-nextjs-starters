'use client'

/**
 * 대시보드 사이드바 네비게이션
 * Invoice MVP 메뉴 구조 반영
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: '견적서 관리', href: '/dashboard', icon: LayoutDashboard },
  { label: '설정', href: '/settings', icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            pathname === href
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          <Icon className="size-4" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
