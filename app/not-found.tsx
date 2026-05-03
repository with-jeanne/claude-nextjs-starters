/**
 * 전역 404 페이지
 * 존재하지 않는 경로 접근 시 표시
 * - 홈 또는 이전 페이지로 이동 유도
 */

import Link from 'next/link'
import { FileSearch, Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* 404 아이콘 */}
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
        aria-hidden="true"
      >
        <FileSearch className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      </div>

      {/* 404 코드 및 제목 */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          페이지 없음
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          404
        </h1>
        <p className="text-lg font-medium text-foreground">
          페이지를 찾을 수 없습니다
        </p>
      </div>

      {/* 안내 메시지 */}
      <p className="mb-8 max-w-sm text-sm text-muted-foreground">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
        URL을 다시 확인하거나 홈으로 돌아가세요.
      </p>

      {/* 액션 버튼 */}
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild aria-label="홈 페이지로 이동">
          <Link href="/">
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            홈으로 돌아가기
          </Link>
        </Button>
        <Button asChild variant="outline" aria-label="이전 페이지로 이동">
          {/* TODO: Phase 3 - router.back() 실제 뒤로 가기로 교체 */}
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            대시보드로 이동
          </Link>
        </Button>
      </div>
    </div>
  )
}
