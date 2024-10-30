export type UUID = string
export type MEMO_KEY = string
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

export type Section = Record<SectionID, MEMO_KEY[]>

export type SectionList = SectionID[]
