import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'

import { DuplexDataHandler, prefix } from '../interface'
import { CurrentSectionInfo, SectionList } from '../types'
import { categoryAtom, hotTopic } from './categoryModel'
import { addLayer } from '@/components/modal/Modal'

// 이름 추천 받아요

// 카테고리 페이지가 거의 루트 페이지라고 할 수 있음

function CategoryPage() {
	const category = useSignal(categoryAtom)
	const [selectedCategory, setSelectedCategory] = useState<string>('fix')
	const menus = {
		fix: hotTopic.fix,
		...category,
		setting: hotTopic.setting,
	}
	// 섹션 정보 얻고
	// 얻은 카테고리에 따라 메모 필터링해서 각 카테고리에 전달

	const handleCategoryClick = (category: string) => {
		setSelectedCategory(category)
	}

	return (
		<div>
			<header>
				<button>검색</button>
				<div>project name</div>
				<div>카테고리 추가 버튼</div>
			</header>
			<aside>
				{Object.entries(menus).map(([key, value]) => (
					<button key={key} onClick={() => handleCategoryClick(key)}>
						{key}
					</button>
					// 설명 추가할 자리가 애매하다
				))}
			</aside>

			<main>
				<div>{menus[selectedCategory as keyof typeof menus]}</div>
			</main>
			<button
				onClick={() => {
					addLayer('hello', <div>test</div>)
				}}
			>
				asdf
			</button>
		</div>
	)
}

export default CategoryPage
