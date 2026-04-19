import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-6 text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">페이지를 찾을 수 없습니다</p>
      </div>
      <p className="max-w-sm text-muted-foreground">
        요청하신 페이지가 존재하지 않습니다. 다시 확인해주세요.
      </p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  )
}
