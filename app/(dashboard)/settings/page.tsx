import { SettingsContent } from './settings-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '설정 — StarterKit',
}

export default function SettingsPage() {
  return <SettingsContent />
}
