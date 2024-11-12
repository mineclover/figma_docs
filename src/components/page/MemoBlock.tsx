import { h } from 'preact'
import { useSignal } from '@/hooks/useSignal'
import { useEffect, useState } from 'preact/hooks'

import { DuplexDataHandler, prefix } from '../../domain/interface'
import { CurrentSectionInfo, Memo, SectionList } from '../../domain/types'
import { hotTopic } from '../../domain/category/categoryModel'
import PinIcon from '@/icon/PinIcon'
import GithubIcon from '@/icon/GithubIcon'
import NotionIcon from '@/icon/NotionIcon'
import FigmaIcon from '@/icon/FigmaIcon'
import LinkIcon from '@/icon/LinkIcon'

type LinkType = 'figma' | 'notion' | 'github' | 'github code' | 'unknown'

function parseGithubUrl(url: string) {
	try {
		// GitHub URL 기본 패턴 검사
		const githubPattern = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)$/
		const match = url.match(githubPattern)

		if (!match) {
			throw new Error('Invalid GitHub URL format')
		}

		// 매칭된 그룹 분해
		const [fullUrl, userId, projectName, branch, filePath] = match

		// 결과 객체 반환
		return {
			type: 'github code',
			userId,
			projectName,
			branch,
			filePath,
		}
	} catch (error) {
		return null
	}
}

type CurrentMemoPageProps = {
	// 이름 얻기
	name: string
	value: string
}

const linkSwitch = (link: string) => {
	if (link.startsWith('https://www.figma.com/design/')) {
		return 'figma'
	}

	if (link.startsWith('https://www.notion.so/')) {
		return 'notion'
	}
	if (link.startsWith('https://github.com/')) {
		return 'github'
	}
	return 'unknown'
}
const linkObject = (type: string, url: string) => {
	if (type === 'github') {
		// https://github.com/{org}/{projectName}/blob/{branch}/{...filePath}
		// 이 구조에서 branch나 이름에 / 가 들어가 있는 것을 구분하지 못함
		// 컨벤션을 부여해야할 것으로 보임
		return parseGithubUrl(url)
	}
	return null
}

function CurrentMemoPage({ title, url }: Memo) {
	// 섹션 정보 얻고
	// 얻은 카테고리에 따라 메모 필터링해서 각 카테고리에 전달
	const linkType = linkSwitch(url)
	const linkInfo = linkObject(linkType, url)

	const type = linkInfo ? linkInfo.type : linkType

	return (
		<article>
			<div>
				{type === 'github' && <GithubIcon />}
				{type === 'github code' && <GithubIcon />}
				{type === 'notion' && <NotionIcon />}
				{type === 'figma' && <FigmaIcon />}
				{type === 'unknown' && <LinkIcon />}
			</div>

			<span>{title}</span>
		</article>
	)
}

export default CurrentMemoPage
