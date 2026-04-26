'use client'

/**
 * Notion 동기화 버튼 컴포넌트
 * PRD: F001 - Notion 데이터 동기화
 * - 클릭 시 Notion API 수동 호출 및 Supabase 데이터 갱신
 */
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function SyncButton() {
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      // TODO: POST /api/notion/sync 호출
      await new Promise((resolve) => setTimeout(resolve, 1500)) // 임시 딜레이
      toast.success('Notion 동기화가 완료되었습니다')
    } catch {
      toast.error('동기화에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
      <RefreshCw className={`mr-2 size-4 ${isSyncing ? 'animate-spin' : ''}`} />
      {isSyncing ? '동기화 중...' : 'Notion 동기화'}
    </Button>
  )
}
