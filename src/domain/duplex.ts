import { FigmaUser, Memo, Section, SectionList } from './types'

export const duplexKeys = {
	user: 'User',
	memo: 'Memo',
	section: 'Section',
	sectionList: 'SectionList',
} as const

export type UserDuplex = {
	key: typeof duplexKeys.user
	data: FigmaUser
}

export type MemoDuplex = {
	key: typeof duplexKeys.memo
	data: Memo
}

export type SectionDuplex = {
	key: typeof duplexKeys.section
	data: Section
}

export type SectionListDuplex = {
	key: typeof duplexKeys.sectionList
	data: SectionList
}

export type Duplex = UserDuplex | MemoDuplex | SectionDuplex | SectionListDuplex

export type DuplexKeysType = Duplex['key']
