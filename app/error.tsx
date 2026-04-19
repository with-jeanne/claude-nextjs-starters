'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <div>
        <h1 className="text-6xl font-bold">500</h1>
        <p className="mt-2 text-lg text-muted-foreground">문제가 발생했습니다</p>
      </div>
      <p className="max-w-sm text-muted-foreground">
        요청을 처리하는 중에 예상치 못한 오류가 발생했습니다.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground">Error ID: {error.digest}</p>
      )}
      <Button onClick={reset}>다시 시도</Button>
    </div>
  )
}
