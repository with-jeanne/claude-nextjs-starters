/**
 * Notion API 응답 타입 정의
 * @notionhq/client API 응답 구조 기반
 * Invoice 매핑에 필요한 최소 타입만 정의
 */

/** Notion 페이지 객체 */
export interface NotionPageObject {
  object: 'page'
  id: string
  created_time: string
  last_edited_time: string
  created_by: NotionUser
  last_edited_by: NotionUser
  parent: NotionParent
  archived: boolean
  properties: Record<string, NotionProperty>
  url: string
  public_url: string | null
}

/** Notion 사용자 */
interface NotionUser {
  object: 'user'
  id: string
}

/** Notion 부모 참조 (데이터베이스) */
interface NotionParent {
  type: 'database_id'
  database_id: string
}

/** Notion 데이터베이스 쿼리 응답 */
export interface NotionDatabaseResponse {
  object: 'list'
  results: NotionPageObject[]
  next_cursor: string | null
  has_more: boolean
  type: 'page_or_database'
  page_or_database: Record<string, never>
}

/** Notion 속성 - Union 타입 */
export type NotionProperty =
  | NotionTitleProperty
  | NotionRichTextProperty
  | NotionNumberProperty
  | NotionSelectProperty
  | NotionDateProperty
  | NotionRelationProperty

/** Notion Title 속성 (견적서 제목) */
export interface NotionTitleProperty {
  id: string
  type: 'title'
  title: NotionRichText[]
}

/** Notion Rich Text 속성 (클라이언트명, 설명) */
export interface NotionRichTextProperty {
  id: string
  type: 'rich_text'
  rich_text: NotionRichText[]
}

/** Notion Number 속성 (금액, 수량, 단가) */
export interface NotionNumberProperty {
  id: string
  type: 'number'
  number: number | null
}

/** Notion Select 속성 (상태) */
export interface NotionSelectProperty {
  id: string
  type: 'select'
  select: NotionSelectOption | null
}

export interface NotionSelectOption {
  id: string
  name: string
  color: string
}

/** Notion Date 속성 (발행일) */
export interface NotionDateProperty {
  id: string
  type: 'date'
  date: NotionDateValue | null
}

export interface NotionDateValue {
  start: string
  end: string | null
  time_zone: string | null
}

/** Notion Relation 속성 (Invoice Items와의 관계) */
export interface NotionRelationProperty {
  id: string
  type: 'relation'
  relation: Array<{ id: string }>
}

/** Rich Text 객체 */
export interface NotionRichText {
  type: 'text' | 'mention' | 'equation'
  text?: NotionTextObject
  plain_text: string
  href: string | null
  annotations: NotionAnnotations
}

interface NotionTextObject {
  content: string
  link: { url: string } | null
}

interface NotionAnnotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

/**
 * Notion 페이지에서 Invoice 데이터 추출 헬퍼 타입
 * Task 011에서 실제 매핑 함수 구현 시 사용
 */
export interface NotionInvoiceMappingContext {
  pageId: string
  titlePropertyName: string // 실제값: '견적서 제목'
  descriptionPropertyName: string // 실제값: '견적서 설명'
  clientNamePropertyName: string // 실제값: '클라이언트명'
  totalAmountPropertyName: string // 실제값: '합계 금액'
  statusPropertyName: string // 실제값: '상태'
  issuedAtPropertyName: string // 실제값: '발행일'
  itemsPropertyName: string // 실제값: '항목'
}

/**
 * 실제 Notion DB 속성명 상수
 * 컬럼명 변경 시 이 상수만 수정하면 됨
 */
export const NOTION_INVOICE_PROPERTY_NAMES = {
  title: '견적서 제목',
  description: '견적서 설명',
  clientName: '클라이언트명',
  totalAmount: '합계 금액',
  status: '상태',
  issuedAt: '발행일',
  items: '항목',
} as const

export const NOTION_ITEM_PROPERTY_NAMES = {
  description: '항목 설명',
  invoice: 'Invoice',
  amount: '금액',
  unitPrice: '단가',
  quantity: '수량',
} as const

/**
 * Notion Select 상태값(한국어) → InvoiceStatus(영문) 매핑
 * Notion DB에서 조회한 status 값을 앱 enum으로 변환하는 데 사용
 */
export const NOTION_STATUS_MAP = {
  '초안': 'draft',
  '발송됨': 'sent',
  '확인됨': 'confirmed',
} as const satisfies Record<string, 'draft' | 'sent' | 'confirmed'>
