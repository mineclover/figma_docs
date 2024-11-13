import { userAtom } from './user/userModel'
import { Signal } from '@preact/signals-core'
import { currentSectionAtom, hotTopicListAtom, sectionAtom, sectionListAtom } from './section/sectionModel'
import { memoAtom, memoListAtom, memosAtom } from './memo/memoModel'
import { categoryAtom, currentCategoryAtom } from './category/categoryModel'

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
	user: userAtom,
	memo: memoAtom,
	memos: memosAtom,
	memoList: memoListAtom,
	section: sectionAtom,
	sectionList: sectionListAtom,
	hotTopicList: hotTopicListAtom,
	currentSection: currentSectionAtom,
	category: categoryAtom,
} as const

// duplexKeysAndSignal 는 아톰이 있는 구조에서 추론하는 거라 ..
// ui에서 가공된 데이터는 어떻게 처리할지..

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

// const test2: DuplexType<'user'> = {
// 	key: 'user',
// 	data: {
// 		uuid: '',
// 		name: '',
// 	},
// }

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
