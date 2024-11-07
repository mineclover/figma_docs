import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'

import { DuplexDataHandler, prefix } from '../interface'
import { CurrentSectionInfo, SectionList } from '../types'
import { hotTopic } from '../category/categoryModel'

type CurrentMemoPageProps = {
	// 이름 얻기
	name: string
	value: string
}

function CurrentMemoPage({ name, value }: CurrentMemoPageProps) {
	// 섹션 정보 얻고
	// 얻은 카테고리에 따라 메모 필터링해서 각 카테고리에 전달

	return (
		<main>
			<div>{name}</div>
			<div>{value}</div>
		</main>
	)
}

export default CurrentMemoPage
