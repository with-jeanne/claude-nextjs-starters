import Link from 'next/link'
import { ArrowRight, Zap, Shield, Palette, Code, Globe, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'StarterKit — 모던 Next.js 스타터킷',
  description: 'Next.js 16, TypeScript, TailwindCSS v4, shadcn/ui로 구성된 프로덕션 레벨 웹 스타터킷',
}

const features = [
  {
    icon: Zap,
    title: '빠른 성능',
    description: 'App Router와 Server Components로 최소한의 JS 번들.',
  },
  {
    icon: Palette,
    title: '다크모드',
    description: 'localStorage 지원 CSS 클래스 기반 다크모드.',
  },
  {
    icon: Shield,
    title: '타입 안전',
    description: 'TypeScript strict 모드로 완전한 타입 안전성.',
  },
  {
    icon: Code,
    title: 'shadcn/ui',
    description: '아름답고 접근성 좋은 UI 컴포넌트 라이브러리.',
  },
  {
    icon: Globe,
    title: 'SEO 최적화',
    description: 'Metadata API와 시맨틱 HTML로 기본 SEO 지원.',
  },
  {
    icon: Terminal,
    title: 'DX 중시',
    description: '경로 별칭, ESLint, 체계적인 구조.',
  },
]

export default function HomePage() {
  return (
    <>
      <Section className="text-center">
        <Container>
          <Badge variant="secondary" className="mb-4">
            v1.0 — 이제 사용 가능
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            모던 Next.js 스타터로 더 빠르게 구축하세요
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            필요한 모든 것이 준비되어 있습니다 — App Router, 다크모드, shadcn/ui 컴포넌트,
            TypeScript, 그리고 Tailwind CSS v4.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                대시보드 보기 <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">모든 것이 준비되어 있습니다</h2>
            <p className="mt-3 text-muted-foreground">
              신중하게 선별된 도구와 패턴의 완벽한 조합.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight">준비가 되셨나요?</h2>
            <p className="mt-4 text-primary-foreground/80">
              저장소를 복제하고 오늘 바로 다음 프로젝트를 시작하세요.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-8">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                시작하기
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
