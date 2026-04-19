import Link from 'next/link'
import { Code2, Heart, Inbox } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-foreground">StarterKit</p>
              <p className="mt-2 text-sm text-muted-foreground">
                모던 Next.js 스타터킷으로 빠르게 웹 개발을 시작하세요.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Product</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Resources</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://nextjs.org/docs" className="hover:text-foreground transition-colors">
                    Next.js Docs
                  </a>
                </li>
                <li>
                  <a href="https://ui.shadcn.com" className="hover:text-foreground transition-colors">
                    shadcn/ui
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} StarterKit. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Code2 className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Social"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="Contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Inbox className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
