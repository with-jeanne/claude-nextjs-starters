'use client'

/**
 * 전역 오류 페이지
 * Next.js App Router 에러 바운더리
 * - 예상치 못한 런타임 오류 발생 시 표시
 * - 오류 ID(digest) 표시로 디버깅 지원
 * - 다시 시도 및 홈으로 이동 옵션 제공
 */

import Link from 'next/link'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
  /** Next.js가 전달하는 오류 객체 */
  error: Error & { digest?: string }
  /** 컴포넌트 재렌더링을 시도하는 함수 */
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      role="alert"
      aria-live="assertive"
    >
      {/* 오류 아이콘 */}
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10"
        aria-hidden="true"
      >
        <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
      </div>

      {/* 오류 코드 및 제목 */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          오류 발생
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          500
        </h1>
        <p className="text-lg font-medium text-foreground">
          문제가 발생했습니다
        </p>
      </div>

      {/* 오류 안내 메시지 */}
      <p className="mb-8 max-w-sm text-sm text-muted-foreground">
        요청을 처리하는 중에 예상치 못한 오류가 발생했습니다.
        잠시 후 다시 시도하거나 홈으로 돌아가세요.
      </p>

      {/* 오류 ID (개발/디버깅용) */}
      {error.digest && (
        <p className="mb-6 rounded-md bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
          오류 ID: {error.digest}
        </p>
      )}

      {/* 액션 버튼 */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button
          onClick={reset}
          variant="default"
          aria-label="페이지 다시 시도"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          다시 시도
        </Button>
        <Button asChild variant="outline" aria-label="홈 페이지로 이동">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            홈으로 돌아가기
          </Link>
        </Button>
      </div>
    </div>
  )
}
