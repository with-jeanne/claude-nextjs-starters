'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-1">
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            pathname === href
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
