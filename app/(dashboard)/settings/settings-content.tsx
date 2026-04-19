'use client'

import { Bell, Eye, Lock, User } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Container } from '@/components/layout/container'
import { PageHeader } from '@/components/layout/page-header'
import { toast } from 'sonner'

export function SettingsContent() {
  const { theme, setTheme } = useTheme()

  const handleSave = (tabName: string) => {
    toast.success(`${tabName} 설정이 저장되었습니다`)
  }

  return (
    <Container className="py-8">
      <PageHeader title="설정" description="계정 및 애플리케이션 설정을 관리하세요." />

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">프로필</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Eye className="size-4" />
            <span className="hidden sm:inline">외관</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="size-4" />
            <span className="hidden sm:inline">알림</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
              <CardDescription>개인 정보를 관리하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  defaultValue="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">회사</Label>
                <Input id="company" placeholder="Your Company" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">소개</Label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button onClick={() => handleSave('프로필')}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>외관 설정</CardTitle>
              <CardDescription>앱의 모양과 느낌을 커스터마이징하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">다크모드</Label>
                  <p className="text-sm text-muted-foreground">야간 모드를 활성화합니다</p>
                </div>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="language">언어</Label>
                <Select defaultValue="ko">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="언어 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ko">한국어</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="zh">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">시간대</Label>
                <Select defaultValue="asia-seoul">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="시간대 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-seoul">Asia/Seoul (UTC+9)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="america-newyork">America/New_York (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleSave('외관')}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>어떤 알림을 받을지 선택하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">이메일 알림</Label>
                  <p className="text-sm text-muted-foreground">중요한 업데이트를 이메일로 받습니다</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">마케팅 이메일</Label>
                  <p className="text-sm text-muted-foreground">새로운 기능과 프로모션 정보</p>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">푸시 알림</Label>
                  <p className="text-sm text-muted-foreground">브라우저 푸시 알림 활성화</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">주간 요약</Label>
                  <p className="text-sm text-muted-foreground">매주 월요일 아침에 요약 발송</p>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <Button onClick={() => handleSave('알림')}>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-4" />
            보안
          </CardTitle>
          <CardDescription>계정 보안 설정</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">비밀번호 변경</p>
              <p className="text-sm text-muted-foreground">마지막 변경: 3개월 전</p>
            </div>
            <Button variant="outline">변경</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">두 단계 인증</p>
              <p className="text-sm text-muted-foreground">추가 보안을 위해 활성화하세요</p>
            </div>
            <Button variant="outline">설정</Button>
          </div>
        </CardContent>
      </Card>
    </Container>
  )
}
