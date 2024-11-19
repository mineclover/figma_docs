import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'

import { DuplexDataHandler, prefix, signalEmit } from '../interface'
import { CurrentSectionInfo, Memo, Memos, SectionList } from '../types'
import { categoryAtom, currentCategoryAtom, hotTopic } from './categoryModel'
import { addLayer } from '@/components/modal/Modal'
import SectionPage from '../section/SectionPage'

import styles from './category.module.css'
import { clc } from '@/components/modal/utils'
import SearchIcon from '@/icon/SearchIcon'
import PlusIcon from '@/icon/PlusIcon'
import CategoryModal, { AddCategoryKey, RemoveCategoryKey } from './CategoryModal'
import SettingIcon from '@/icon/SettingIcon'
import Setting from '@/components/page/Setting'
import MemoModal from '../memo/MemoModal'
import MemoPage from '../memo/MemoPage'
import { memosAtom } from '../memo/memoModel'
import { memoListAtom } from '../memo/memoModel'

// 이름 추천 받아요

// 카테고리 페이지가 거의 루트 페이지라고 할 수 있음

function CategoryPage() {
	const memos = useSignal(memosAtom)
	const memoList = useSignal(memoListAtom)
	const category = useSignal(categoryAtom)
	const selectedCategory = useSignal(currentCategoryAtom)
	const all = Object.values(memos)
	const other = Object.keys(category).reduce(
		(acc, cur) => {
			acc[cur] = all.filter((memo) => memo.category === cur) as Memo[]
			return acc
		},
		{} as Record<string, Memo[]>
	)

	const allMemo = { ...other, all }

	const setSelectedCategory = (category: string) => {
		currentCategoryAtom.value = category
	}

	const menus = {
		// fix: hotTopic.fix,
		...category,
		...hotTopic,
		// setting: hotTopic.setting,
	}
	// 섹션 정보 얻고
	// 얻은 카테고리에 따라 메모 필터링해서 각 카테고리에 전달

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category)
	}

	useEffect(() => {
		// 카테고리 탭 바꿀 때 pub 조회

		signalEmit('SIGNAL_pub')
	}, [selectedCategory])
	console.log('memos', memos)

	return (
		<div>
			<header>
				<button>
					<SearchIcon></SearchIcon>
				</button>
				<div>project name</div>
				<div>카테고리 추가 버튼</div>
			</header>
			<aside className={styles.tabs}>
				{Object.entries(menus).map(([key, value]) => {
					const active = selectedCategory === key
					if (key === 'fix')
						return (
							<button
								className={clc(styles.fix, active && styles.active)}
								key={key}
								onClick={() => handleCategoryClick(key)}
							>
								{key}
								<div className={clc(styles.badge, styles.pinned)}>123</div>
							</button>
						)

					// if (key === 'setting')
					// 	return (
					// 		<button
					// 			className={clc(styles.setting, active && styles.active)}
					// 			key={key}
					// 			onClick={() => handleCategoryClick(key)}
					// 		>
					// 			<SettingIcon />
					// 		</button>
					// 	)

					if (key === 'setting')
						return (
							<button
								className={styles.menu}
								key={key}
								onClick={() => {
									handleCategoryClick(key)
									// addLayer(AddKey, <CategoryModal.AddModal />)
								}}
							>
								<SettingIcon />
							</button>
						)

					if (key === 'add')
						return (
							<button
								className={styles.menu}
								key={key}
								onClick={() => {
									addLayer(AddCategoryKey, <MemoModal.AddModal />)
								}}
							>
								<PlusIcon />
							</button>
						)

					return (
						<button
							className={clc(styles.tab, active && styles.active)}
							key={key}
							onClick={() => {
								handleCategoryClick(key)
							}}
							onContextMenu={(e) => {
								console.log('Category onContextMenu', e)
								addLayer(RemoveCategoryKey, <CategoryModal.RemoveModal target={key} />)
							}}
						>
							<div className={clc(styles.badge, styles.normal)}>123</div>
							{key}
						</button>
					)
					// 설명 추가할 자리가 애매하다
				})}
			</aside>

			<main>
				<div>{menus[selectedCategory as keyof typeof menus]}</div>
				{selectedCategory === 'setting' ? (
					<Setting />
				) : (
					<MemoPage memos={allMemo[selectedCategory as keyof typeof allMemo]} />
				)}
			</main>
			<button
				onClick={() => {
					addLayer('hello', <div>test</div>)
				}}
			></button>
		</div>
	)
}

export default CategoryPage
