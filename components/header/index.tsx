import Link from 'next/link'
import { NavLinks } from '@/components/header/nav-links'
import { MobileNav } from '@/components/header/mobile-nav'
import { UserMenu } from '@/components/header/user-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { Container } from '@/components/layout/container'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <span className="text-primary">⬡</span>
            <span>StarterKit</span>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <NavLinks />
            <ThemeToggle />
            <UserMenu />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}
