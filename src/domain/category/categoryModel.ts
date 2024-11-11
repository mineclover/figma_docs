import { signal } from '@preact/signals-core'
import { MemoCategoryList } from '../types'

export const categoryAtom = signal<MemoCategoryList>({})

export const hotTopic = {
	fix: '핀 고정 메뉴',
	add: '메뉴 추가',
	setting: '설정 창',
} as const
