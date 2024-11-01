import { ConcatStrings2, DataHandler, DataHandler2, SignalHandler, SignalHandler2 } from './interface'
import { FigmaUser, Memo, Section, SectionList } from './types'
import { on, once, emit, EventHandler, getTotalUseCountAsync } from '@create-figma-plugin/utilities'
import { UserAtom } from './user/userAdapter'
import { Signal } from '@preact/signals-core'

/** 이 타입이 중앙 관제 타입 v1 */
export const duplexKeysV1 = {
	user: 'user',
	memo: 'memo',
	section: 'section',
	sectionList: 'SectionList',
} as const

/** 이 타입이 중앙 관제 타입 v2
 * 시그널 데이터를 매핑해서 공수를 줄이고 확장성을 높임
 */
export const duplexKeys = {
	user: UserAtom,
	memo: UserAtom,
	section: UserAtom,
	sectionList: UserAtom,
} as const

/** 이 타입이 중앙 관제 타입 v2 의 키 타입 */
export type DuplexKeysType = keyof typeof duplexKeys

/** 실제 선언에 종속적인 타입 추론 구조 */
export interface DynamicDuplexType {
	key: DuplexKeysType
	data: (typeof duplexKeys)[DuplexKeysType] extends Signal<infer T> ? T : never
}

export interface DuplexType<T extends DuplexKeysType> {
	key: T
	data: (typeof duplexKeys)[T] extends Signal<infer T> ? T : never
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
