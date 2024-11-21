import { ComponentChildren, Fragment, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import styles from './memo.module.css'

import { Memo, MemoCategoryList, MemoList } from '../types'

import { useSignal } from '@/hooks/useSignal'
import { clc } from '@/components/modal/utils'
import { addLayer, deleteLayer } from '@/components/modal/Modal'
import { memoAtom, memoListAtom, memosAtom } from './memoModel'
import { dataMemoEmit, dataMemosEmit } from './memoAdapter'
import { SectionPath } from '../section/SectionPage'
import { currentSectionAtom } from '../section/sectionModel'
import { currentCategoryAtom, hotTopic } from '../category/categoryModel'
import { AddMemoType } from '../utils/featureType'
import { selectedType, signalEmit } from '../interface'
import { generateMemoKey } from '../interfaceBuilder'
import { componentKeyBuilder } from '../interfaceBuilder'
import { getSectionKey } from '../section/sectionRepo'
import { userAtom } from '../user/userModel'
import MemoBlock from '@/components/page/MemoBlock'
import PlusIcon from '@/icon/PlusIcon'
import MemoModal, { AddMemoKey } from './MemoModal'
import { IconPlus32 } from '@create-figma-plugin/ui'

const options = Object.keys(hotTopic)

function MemoPage({
	memos,
	categoryName,
	categoryValue,
}: {
	memos?: Memo[]
	categoryName: string
	categoryValue: string
}) {
	const selectedCategory = useSignal(currentCategoryAtom)
	const currentUser = useSignal(userAtom)
	const [memoKey, setMemoKey] = useState<string>(generateMemoKey())
	const currentSection = useSignal(currentSectionAtom)
	const pageId = currentSection.filter((section) => section.type === 'PAGE')[0]?.id ?? ''
	const nodeId = currentSection.filter((section) => section.type === selectedType)[0]?.id ?? ''

	// 메모에서 조회하는게 빠른지 // 그냥 맵으로 전환해서 O(n) 하는게 빠른지
	// 일단 찾아서 내려주는 건 위에서 하는게 맞음

	if (!memos) return null

	const memoList = memos.map((item) => {
		console.log('memoPage:', item)
		return <MemoBlock memoKey={item.key} {...item} />
	})

	return (
		<div>
			{!options.includes(categoryName) && (
				<div className={styles.top}>
					<div className={styles.info}>
						<span className={styles.name}>{categoryName}</span>
						<span>{categoryValue}</span>
					</div>

					<button
						className={styles.menu}
						onClick={() => {
							addLayer(AddMemoKey, <MemoModal.AddModal />)
						}}
					>
						<IconPlus32 />
					</button>
				</div>
			)}

			{memoList}
		</div>
	)
}

export default MemoPage
