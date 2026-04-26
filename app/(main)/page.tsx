/**
 * 홈 페이지 (랜딩)
 * 비로그인 접근 가능
 * 로그인 상태: 대시보드로 유도
 * 비로그인 상태: 로그인 페이지로 유도
 */
import Link from 'next/link'
import { ArrowRight, FileText, Link2, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Section } from '@/components/layout/section'
import { Container } from '@/components/layout/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invoice — Notion 연동 견적서 공유 서비스',
  description: 'Notion에 입력한 견적서를 클라이언트에게 고유 링크로 공유하고 PDF로 저장하세요.',
}

const features = [
  {
    icon: FileText,
    title: 'Notion 데이터 동기화',
    description: 'Notion 데이터베이스에 입력한 견적서를 버튼 하나로 동기화합니다.',
  },
  {
    icon: Link2,
    title: '고유 링크 생성',
    description: '견적서마다 추측 불가능한 UUID 토큰 기반 공개 링크를 자동 생성합니다.',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description: '클라이언트가 링크에 접속하여 바로 PDF로 저장할 수 있습니다.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* 히어로 섹션 */}
      <Section className="text-center">
        <Container>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            Notion 견적서를 클라이언트에게<br />바로 공유하세요
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            이메일 첨부 방식은 그만. Notion에 입력한 견적서를 고유 링크로 공유하고
            클라이언트가 PDF로 저장할 수 있게 합니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">
                시작하기 <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">
                대시보드 보기
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* 기능 소개 */}
      <Section className="bg-muted/30">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">어떻게 동작하나요?</h2>
            <p className="mt-3 text-muted-foreground">
              3단계로 견적서를 클라이언트에게 전달합니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, idx) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step {idx + 1}
                  </p>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div className="rounded-2xl bg-primary px-8 py-16 text-center text-primary-foreground">
            <h2 className="text-3xl font-bold tracking-tight">지금 바로 시작하세요</h2>
            <p className="mt-4 text-primary-foreground/80">
              Notion 연동만 하면 견적서 공유 준비 완료.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-8">
              <Link href="/login">무료로 시작하기</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
