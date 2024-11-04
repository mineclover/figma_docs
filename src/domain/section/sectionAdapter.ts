import { on, once, emit } from '@create-figma-plugin/utilities'

import { signal } from '@preact/signals-core'
import { CurrentSectionInfo, FigmaUser, MEMO_KEY, Section, SectionList } from '../types'

import { createDataHandlers, DuplexDataHandler, DuplexSignalHandler, signalReceiving } from '../interface'
import {
	getAllSectionDataModel,
	clearAllSectionListModel,
	setSectionListModel,
	setSectionModel,
	getSectionListModel,
	getCurrentSelection,
	getCurrentSectionModel,
} from './sectionModel'

/** duplex 데이터 전송 핸들러 예시 */
type DataSectionHandler = DuplexDataHandler<'section'>
/** duplex 신호 전송 핸들러 예시 */
type SignalSectionHandler = DuplexSignalHandler<'section'>

export const { dataOn, dataOnce, dataEmit, signalOn, signalOnce, signalEmit } = createDataHandlers<'section'>()
export const {
	dataOn: dataOnList,
	dataOnce: dataOnceList,
	dataEmit: dataEmitList,
	signalOn: signalOnList,
	signalOnce: signalOnceList,
	signalEmit: signalEmitList,
} = createDataHandlers<'sectionList'>()

export const {
	dataOn: dataOnCurrentSection,
	dataOnce: dataOnceCurrentSection,
	dataEmit: dataEmitCurrentSection,
	signalOn: signalOnCurrentSection,
	signalOnce: signalOnceCurrentSection,
	signalEmit: signalEmitCurrentSection,
} = createDataHandlers<'currentSection'>()

// 단순 데이터 처리 이외에 처리 위임 형태를 만드는게 진짜기 때문에 빠르게 작업하고 넘어갈 것

// 섹션은 원하는 위치에 메모데이터를 넣는 역할임

/**
 * main 이벤트 핸들러
 * 저장과 응답 코드 처리
 * 여기도 처리 로직이 비슷함
 * 비교 처리를 모듈로 받아서 처리하면 ui에서 시그널에 위임한 것 처럼 간소화 됨
 * 섹션 정보 핸들링
 */
export const mainSection_Adapter = () => {
	dataOn('DATA_section', async (section) => {
		const sectionItems = Object.entries(section)
		for (const [key, value] of sectionItems) {
			setSectionModel(key, value)
		}
		// 변경 사항 전송
		// TODO: 변경 반영 측면에서 좀 애매함
		dataEmit('DATA_section', section)
	})
	signalOn('SIGNAL_section', async (key) => {
		/** 모델 코드임 */
		// const user = await getUserModel()
		// 전체 섹션 전송하는 게 컨벤션 고로 전부 보냄

		const section = getAllSectionDataModel()
		signalReceiving('section', key)(section)
	})
}

/**
 * 섹션 리스트 정보 핸들링
 */
export const mainSectionList_Adapter = () => {
	dataOnList('DATA_sectionList', async (sectionList) => {
		// 삭제하고 싶으면 key : '' 로 처리
		// 추가나 수정은 값을 넣거나 배열을 넣어서 처리 함
		// 기본적으로 모든 값을 접근해서 수정하지 않음
		// 받은 모든 섹션 저장
		const newSectionList = setSectionListModel(sectionList)
		dataEmitList('DATA_sectionList', newSectionList)
	})
	signalOnList('SIGNAL_sectionList', async (key) => {
		const sectionList = getSectionListModel()
		signalReceiving('sectionList', key)(sectionList)
	})
}

// 일방적으로 전송하는 형태
export const selectMainCurrentSection_Adapter = () => {
	const node = getCurrentSelection()
	if (node) {
		const section = getCurrentSectionModel(node)
		if (section) {
			dataEmitCurrentSection('DATA_currentSection', section)
		}
	}
}

export const pageMainCurrentSection_Adapter = () => {
	const page = figma.currentPage
	const section = getCurrentSectionModel(page)
	if (section) {
		dataEmitCurrentSection('DATA_currentSection', section)
	}
}

/**
 * 섹션 아이디 리스트 조회
 * 아이디에서 메모 아이디로 메모 조회
 * 섹션 키 기반으로 전체 메모들이 저장되어있는 걸 가지고 있음
 * 조회를 줄여야하면 일단 이름으로 필터링하고
 * 섹션 아톰 역할은?
 * 전체 섹션 리스트 저장하기
 *
 */
export const SectionAtom = signal<Section>({})
export const SectionListAtom = signal<SectionList>([])

/**
 * 핫토픽은 섹션과 구조가 같으나 처리 로직이 다름
 * 시간을 기준으로 섹션이 정렬되고
 * 기존 메모를 핫토픽에도 복제해서 보여주는 개념으로 동작
 */
export const HotTopicListAtom = signal<MEMO_KEY[]>([])

/**
 * 현재 섹션 정보
 * */
export const CurrentSectionAtom = signal<CurrentSectionInfo[]>([])
