import { DuplexConcatStrings, DataHandler, DuplexDataHandler, SignalHandler, DuplexSignalHandler } from './interface'
import { FigmaUser, Memo, Section, SectionList } from './types'
import { on, once, emit, EventHandler, getTotalUseCountAsync } from '@create-figma-plugin/utilities'
import { UserAtom } from './user/userAdapter'
import { Signal } from '@preact/signals-core'
import { HotTopicListAtom, SectionAtom, SectionListAtom } from './section/sectionAdapter'
import { MemoAtom, MemoListAtom, MemosAtom } from './memo/memoAdapter'

/** 이 타입이 중앙 관제 타입 v1 */
// export const duplexKeysV1 = {
// 	user: 'user',
// 	memo: 'memo',
// 	section: 'section',
// 	sectionList: 'SectionList',
// } as const

/** 이 타입이 중앙 관제 타입 v2
 * 시그널 데이터를 매핑해서 공수를 줄이고 확장성을 높임
 */
export const duplexKeysAndSignal = {
	user: UserAtom,
	memo: MemoAtom,
	memos: MemosAtom,
	memoList: MemoListAtom,
	section: SectionAtom,
	sectionList: SectionListAtom,

	hotTopicList: HotTopicListAtom,
} as const

/** 이 타입이 중앙 관제 타입 v2 의 키 타입 */
export type DuplexKeysType = keyof typeof duplexKeysAndSignal

/**
 * 실제 선언에 종속적인 타입 추론 구조
 * duplexKeysAndSignal 기반으로 타입 자동 추론
 * Extract<DuplexType<T>, { key: T }>['data'] 대체하려고 만듬
 */
export interface DynamicDuplexType<T extends DuplexKeysType> {
	key: T
	data: (typeof duplexKeysAndSignal)[T] extends Signal<infer T> ? T : never
}

export interface DuplexType<T extends DuplexKeysType> {
	key: T
	data: (typeof duplexKeysAndSignal)[T] extends Signal<infer T> ? T : never
}

const test2: DuplexType<'user'> = {
	key: 'user',
	data: {
		uuid: '',
		name: '',
	},
}

// export interface UserDuplex2 extends DynamicDuplexType {
// 	key: 'user'
// }

// const test: UserDuplex2 = {
// 	key: 'user',
// 	data: {
// 		uuid: '',
// 		name: '',
// 	},
// }
