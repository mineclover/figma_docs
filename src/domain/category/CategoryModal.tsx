import { ComponentChildren, Fragment, h } from 'preact'
import { useState } from 'preact/hooks'

import styles from './category.module.css'
import { dataCategoryEmit } from './categoryAdapter'
import { MemoCategoryList } from '../types'
import { categoryAtom } from './categoryModel'
import { useSignal } from '@/hooks/useSignal'

function AddModal() {
	const category = useSignal<MemoCategoryList>(categoryAtom)

	const [inputCategory, setCategory] = useState<string>('')
	const [description, setDescription] = useState<string>('')

	return (
		<form
			className={styles.modal}
			onSubmit={(e) => {
				e.preventDefault()
				console.log(e, inputCategory, description)
				dataCategoryEmit('DATA_category', {
					...category,
					[inputCategory]: description,
				})
			}}
		>
			<span className={styles.header}>카테고리 추가</span>

			<input
				type="text"
				value={inputCategory}
				className={styles.main}
				placeholder="추가할 카테고리 제목"
				onInput={(e) => setCategory(e.currentTarget.value)}
			/>
			<input
				type="text"
				className={styles.description}
				value={description}
				placeholder="카테고리 설명"
				onInput={(e) => setDescription(e.currentTarget.value)}
			/>
			<button className={styles.submit}>추가</button>
		</form>
	)
}

export const AddKey = 'AddKey'
export const RemoveKey = 'RemoveKey'

function RemoveModal({ target }: { target: string }) {
	const category = useSignal<MemoCategoryList>(categoryAtom)

	return (
		<form
			className={styles.modal}
			onSubmit={(e) => {
				e.preventDefault()

				const newCategory = { ...category }
				delete newCategory[target]
				dataCategoryEmit('DATA_category', newCategory)
			}}
		>
			<span className={styles.header}>카테고리 삭제</span>
			<span className={styles.main}>{target}</span>
			<button className={styles.delete}>삭제 확인</button>
		</form>
	)
}

export default { AddModal, RemoveModal }
