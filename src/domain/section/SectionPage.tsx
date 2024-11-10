import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useState } from 'preact/hooks'
import { currentSectionAtom, sectionListAtom } from './sectionModel'
import { dataEmitList } from './sectionAdapter'
import { SectionList } from '../types'
import { modalAlert } from '@/components/alert'

function SectionPage() {
	const sectionList = useSignal(sectionListAtom)
	const currentSection = useSignal(currentSectionAtom)

	const [newSection, setNewSection] = useState<string>('')

	const handleSectionUpdate = (newName: string) => {
		// 중복 체크 추가
		if (newName === '') {
			modalAlert('이름이 입력되지 않음')
			return
		}
		if (sectionList.includes(newName)) {
			modalAlert('이미 존재하는 섹션 명')
			return
		}
		console.log(newName, 'newName', newName, '<')

		dataEmitList('DATA_sectionList', [...sectionList, newName])
		setNewSection('')
	}

	const handleCurrentSectionUpdate = (input: SectionList) => {
		dataEmitList('DATA_sectionList', input)
	}

	return (
		<div>
			<h2>현재 섹션</h2>
			<div>{currentSection.map((section) => section.name).join('/')}</div>
			<div>{currentSection.map((section) => section.id).join('/')}</div>

			<h2>섹션 목록</h2>
			<div>
				<input
					type="text"
					value={newSection}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							console.log(sectionList)

							// 지연 발생은 함수 선언 시점 데이터가 과거라 생김
							// 실행되는 함수 자체가 과거의 거라서 업데이트가 안됨
							// 그래서 업데이트 방식을 바꿈
							handleSectionUpdate(e.currentTarget.value)
						}
					}}
					// onChange 의 반응 속도가 느리다
					onChange={(e) => setNewSection(e.currentTarget.value)}
					placeholder="새 섹션 이름 입력"
				/>
				<button
					onClick={() => {
						handleSectionUpdate(newSection)
					}}
				>
					추가
				</button>
			</div>

			<div>
				{sectionList.map((sectionId, index) => (
					<div key={sectionId}>
						<div>{sectionId}</div>

						<button
							onClick={() => {
								const newSections = sectionList.filter((_, i) => i !== index)
								handleCurrentSectionUpdate(newSections)
							}}
						>
							삭제
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default SectionPage
