import { ThemeToggle } from '@/components/theme-toggle'

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div></div>
        <ThemeToggle />
      </div>
    </header>
  )
}
