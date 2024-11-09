import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'
import { currentSectionAtom, sectionListAtom } from './sectionModel'
import { dataEmitList } from './sectionAdapter'
import { DuplexDataHandler } from '../interface'
import { CurrentSectionInfo, SectionList } from '../types'
import { modalAlert } from '@/components/alert'

function SectionPage() {
	const sectionList = useSignal(sectionListAtom)
	const currentSection = useSignal(currentSectionAtom)
	console.log('sectionList:', sectionList)

	const [newSection, setNewSection] = useState<string>('')

	const handleSectionUpdate = () => {
		const newName = newSection.trim()

		// 중복 체크 추가
		if (newName === '' || sectionList.includes(newName)) {
			console.log('이미 존재하는 섹션 명')
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
					onChange={(e) => setNewSection(e.currentTarget.value)}
					placeholder="새 섹션 이름 입력"
				/>
				<button onClick={handleSectionUpdate}>추가</button>
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
