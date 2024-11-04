import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'
import { CurrentSectionAtom, SectionListAtom } from './sectionAdapter'
import { dataEmitList } from './sectionAdapter'
import { DuplexDataHandler } from '../interface'
import { CurrentSectionInfo, SectionList } from '../types'

function SectionPage() {
	const sectionList = useSignal(SectionListAtom)
	const currentSection = useSignal(CurrentSectionAtom)

	const [newSection, setNewSection] = useState<string>('')

	const handleSectionUpdate = () => {
		dataEmitList('DATA_sectionList', [...sectionList, newSection.trim()])
	}

	const handleCurrentSectionUpdate = (input: SectionList) => {
		dataEmitList('DATA_sectionList', input)
	}

	const handleAddSection = () => {
		if (newSection.trim()) {
			handleSectionUpdate()
			setNewSection('')
		}
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
				<button onClick={handleAddSection}>추가</button>
			</div>
			<button onClick={handleSectionUpdate}>저장</button>
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
