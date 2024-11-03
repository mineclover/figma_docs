export type UUID = string
export type MEMO_KEY = string
/**
 * 섹션 고유 식별 아이디
 * 계층 구조적 주소를 아이디로 씀
 *
 */
export type SectionID = string

export type FigmaUser = {
	uuid: UUID
	name: string
}

export type Memo = {
	writer: UUID
	key: MEMO_KEY
	url: string
	sectionBackLink: string[]
	componentLink: string[]
	cartagory: string
	title: string
	created: number
	modified: number
	description: string
}
/**
 * 고유하게 전체 메모 리스트를 저장
 * 1.1.1 : [memokey1, memokey2]
 * 처럼 존재한다는 것을 알 수 있음
 */
export type MemoList = MEMO_KEY[]

export type Memos = Record<MEMO_KEY, Memo>

/**
 * 1.1.1 : [memokey1, memokey2]
 * 처럼 존재한다는 것을 알 수 있음
 */
export type Section = Record<SectionID, MEMO_KEY[]>

/**
 * 아이디 리스트를 저장
 * [1.1.1, 1.1.2]
 */
export type SectionList = SectionID[]
