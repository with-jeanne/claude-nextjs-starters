/**
 * 견적서 공개 링크 오류 페이지
 * 잘못된 토큰 또는 존재하지 않는 견적서 접근 시 표시
 * PRD: F004 - 토큰 무효 시 오류 페이지로 리디렉션
 */

import Link from 'next/link'
import { Link2Off, Home, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function InvoiceNotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      {/* 링크 오류 아이콘 */}
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
      >
        <Link2Off className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      </div>

      {/* 오류 제목 */}
      <div className="mb-4 space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          유효하지 않은 링크
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          견적서를 찾을 수 없습니다
        </h1>
      </div>

      {/* 안내 메시지 */}
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        요청하신 견적서 링크가 유효하지 않거나 만료되었습니다.
        링크를 다시 확인하거나 견적서를 보낸 담당자에게 문의하세요.
      </p>

      {/* 구분선 */}
      <div className="mb-6 w-full max-w-xs">
        <Separator />
      </div>

      {/* 안내 정보 */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border bg-muted/50 px-4 py-3 text-left max-w-sm">
        <FileText
          className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <p className="text-xs font-medium text-foreground">
            이 링크에 문제가 있나요?
          </p>
          <p className="text-xs text-muted-foreground">
            견적서 발행인에게 새로운 링크를 요청하거나,
            이메일로 받은 원본 링크를 다시 확인해보세요.
          </p>
        </div>
      </div>

      {/* 액션 버튼 */}
      <Button asChild aria-label="홈 페이지로 이동">
        <Link href="/">
          <Home className="mr-2 h-4 w-4" aria-hidden="true" />
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  )
}
