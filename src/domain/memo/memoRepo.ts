import { generateRandomText2 } from '@/utils/textTools'
import { prefix } from '@/domain/interface'
import { FigmaUser, Memo, MEMO_KEY, Memos, SectionID, SectionList } from '@/domain/types'
import { getSectionModel } from '../section/sectionRepo'

/** 다른 키 없이 빈 메모 */
type NullMemo = { key: MEMO_KEY }

export const getMemoModel = (key: MEMO_KEY) => {
	const data = figma.root.getPluginData(key)

	try {
		const memo = JSON.parse(data)
		return memo as Memo
	} catch (error) {
		return ''
	}
}

/**
 * 메모가 제대로 온 경우 true
 * @param memo
 * @returns
 */
export const memoCheck = (memo: Memo | NullMemo | ''): memo is Memo => {
	if (memo === '') {
		return false
	}
	if ('key' in memo && Object.keys(memo).length === 1) {
		return false
	}
	return true
}

// 여기서 의문 섹션을 지우면 모든 메모에서 특정 백링크 삭제를 해야하는건데
// 이걸 구현하려하게되면 전체 조회 삭제를 해야함
// 이 리스트들 전부를 들고 있는 ui 메모에서 본인의 백링크를 삭제하는 것이 최소 접근이라 생각함
// 다수 접속 사용시 정합성이 깨지는 문제는
// 핀 포인트 수정으로 메모 내에 섹션백링크 리스트 검증 로직 넣으면 안전하게 구성가능할 듯

/**
 * 메모 삭제의 경우 메모 삭제기 때문에 무조건 섹션 리스트에서 삭제가 발생하므로 전체 섹션에서 특정 메모 삭제
 * 단일 대상 제어
 * 섹션 backLink에 최소 한개 이상 들어갈 거라 생각하는데...
 * 아직 구성이 애매하고 한 메모에 여러 색션이 들어가는 것에 대해 굳이 필요한지 의문
 *
 * @param key
 * @param memo
 * @returns 삭제된 섹션 리스트 반환
 */
export const setMemoModel = (key: MEMO_KEY, memo: Memo | NullMemo) => {
	const currentMemo = getMemoModel(key)
	const currentSection = currentMemo === '' ? [] : currentMemo.sectionBackLink

	if (memoCheck(memo)) {
		const removedSections = currentSection.filter((section) => !memo.sectionBackLink.includes(section))

		figma.root.setPluginData(key, JSON.stringify(memo))
		setMemoListModel([key], 'add')
		return removedSections
	} else {
		figma.root.setPluginData(key, '')
		setMemoListModel([key], 'remove')
		return currentSection
	}
}

/**
 * 전체 메모 리스트 조회
 * @returns
 */
export const getMemoListModel = () => {
	const memoList = figma.root.getPluginData(prefix.memoList)
	if (memoList === '') {
		return []
	}
	return JSON.parse(memoList) as MEMO_KEY[]
}

/**
 * 메모 리스트 수정
 * @param input 추가할 메모 리스트
 * @param action 추가 또는 삭제
 */
export const setMemoListModel = (input: MEMO_KEY[], action: 'add' | 'remove') => {
	const before = getMemoListModel()

	if (action === 'add') {
		const after = [...before, ...input].filter((item, index, self) => self.indexOf(item) === index)
		figma.root.setPluginData(prefix.memoList, JSON.stringify(after))
	} else if (action === 'remove') {
		const after = before.filter((item) => !input.includes(item))
		figma.root.setPluginData(prefix.memoList, JSON.stringify(after))
	}
}

/**
 * 메모리스트로 전체 메모 조회
 * 메모 생성은 UI에서 진행함
 * @returns
 */
export const getAllMemoListDataModel = () => {
	const memoList = getMemoListModel()
	return memoList
		.map((key) => getMemoModel(key))
		.filter((item) => item !== '')
		.reduce((acc, memo) => {
			return { ...acc, [memo.key]: memo }
		}, {}) as Memos
}

/**
 * 섹션아이디로 메모 리스트 조회
 * 섹션 단위로 업데이트함
 * @param key
 * @returns
 */
export const getSectionMemoListDataModel = (key: SectionID) => {
	const memoList = getSectionModel(key)
	if (memoList.length === 0 || memoList === '') {
		return []
	}
	return memoList.map((item) => getMemoModel(item)).filter((item) => item !== '')
}
