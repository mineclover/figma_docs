import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'
import { SectionListAtom } from './sectionAdapter'
import { dataEmitList } from './sectionAdapter'
import { DuplexDataHandler } from '../interface'

function SectionPage() {
	const sectionList = useSignal(SectionListAtom)
	const [sections, setSections] = useState<string[]>(sectionList)
	const [newSection, setNewSection] = useState<string>('')

	useEffect(() => {
		setSections(sectionList)
	}, [sectionList])

	const handleSectionUpdate = () => {
		dataEmitList('DATA_sectionList', sections)
	}

	const handleAddSection = () => {
		if (newSection.trim()) {
			setSections([...sections, newSection.trim()])
			setNewSection('')
		}
	}

	return (
		<div>
			<h1>섹션 목록</h1>
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
				{sections.map((sectionId, index) => (
					<div key={sectionId}>
						<input
							type="text"
							value={sectionId}
							onChange={(e) => {
								const newSections = [...sections]
								newSections[index] = e.currentTarget.value
								setSections(newSections)
							}}
						/>
						<button
							onClick={() => {
								const newSections = sections.filter((_, i) => i !== index)
								setSections(newSections)
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
