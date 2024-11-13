import { ComponentChildren, Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

import styles from './memo.module.css'

import { Memo, MemoCategoryList } from '../types'

import { useSignal } from '@/hooks/useSignal'
import { clc } from '@/components/modal/utils'
import { deleteLayer } from '@/components/modal/Modal'
import { memoAtom } from './memoModel'
import { dataMemoEmit } from './memoAdapter'
import { SectionPath } from '../section/SectionPage'
import { currentSectionAtom } from '../section/sectionModel'
import { currentCategoryAtom } from '../category/categoryModel'
import { AddMemoType } from '../utils/featureType'
import { selectedType } from '../interface'
import { componentKeyBuilder } from './memoRepo'
import { getSectionKey } from '../section/sectionRepo'

function AddMemoModal() {
	const memo = useSignal<Memo>(memoAtom)
	const selectedCategory = useSignal(currentCategoryAtom)

	const currentSection = useSignal(currentSectionAtom)
	const pageId = currentSection.filter((section) => section.type === 'PAGE')[0]?.id ?? ''
	const nodeId = currentSection.filter((section) => section.type === selectedType)[0]?.id ?? ''

	const [inputUrl, setUrl] = useState<string>('')
	const [inputDescription, setDescription] = useState<string>('')
	const [inputTitle, setTitle] = useState<string>('')

	return (
		<form
			className={clc(styles.modal, styles.add)}
			onSubmit={(e) => {
				e.preventDefault()
				const newMemo = {
					url: inputUrl,
					title: inputTitle,
					description: inputDescription,
					cartagory: selectedCategory,
					sectionBackLink: [getSectionKey(currentSection, 'section')],
					componentLink: [componentKeyBuilder(pageId, nodeId)],
				} as AddMemoType

				console.log(e, newMemo)
			}}
		>
			<span className={styles.header}>메모 추가</span>
			<SectionPath className={styles.section} currentSection={currentSection} pageId={pageId} />
			<hr className={styles.divider} />
			<input
				type="text"
				className={styles.title}
				value={inputTitle}
				placeholder="메모 제목"
				onInput={(e) => setTitle(e.currentTarget.value)}
			/>
			<input
				type="text"
				value={inputUrl}
				className={styles.main}
				placeholder="메모 링크"
				onInput={(e) => setUrl(e.currentTarget.value)}
			/>

			<textarea
				type="text"
				className={styles.description}
				value={inputDescription}
				placeholder="메모 설명"
				onInput={(e) => setDescription(e.currentTarget.value)}
			/>
			<button className={styles.submit}>추가</button>
		</form>
	)
}

export const AddMemoKey = 'AddMemoKey'
export const RemoveMemoKey = 'RemoveMemoKey'

function RemoveMemoModal({ target }: { target: string }) {
	const memo = useSignal<Memo>(memoAtom)

	return (
		<form
			className={clc(styles.modal, styles.remove)}
			onSubmit={(e) => {
				e.preventDefault()

				const newMemo = { ...memo }
				delete newMemo[target as keyof Memo]
				dataMemoEmit('DATA_memo', newMemo)
				deleteLayer(RemoveMemoKey)
			}}
		>
			<span className={styles.header}>카테고리 삭제</span>
			<div className={styles.main}>
				<span className={styles.sub}>카테고리 명: </span>
				<span className={styles.text}>{target}</span>
			</div>
			<button className={styles.delete}>삭제 확인</button>
		</form>
	)
}

export default { AddModal: AddMemoModal, RemoveModal: RemoveMemoModal }
