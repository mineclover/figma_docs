import { h } from 'preact'
import { CurrentSectionInfo, Memo, SectionList } from '../../domain/types'

import GithubIcon from '@/icon/GithubIcon'
import NotionIcon from '@/icon/NotionIcon'
import FigmaIcon from '@/icon/FigmaIcon'
import LinkIcon from '@/icon/LinkIcon'
import { dataMemosEmit } from '@/domain/memo/memoAdapter'
import styles from './memoBlock.module.css'
import { IconHyperlinkLinked32, IconLayerComponent16, IconTarget32, IconTrash32 } from '@create-figma-plugin/ui'
import { componentKeyParser } from '@/domain/interfaceBuilder'
import { NodeZoomHandler } from '@/figmaPluginUtils/types'
import { emit } from '@create-figma-plugin/utilities'

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
	console.log('link,', link)
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
/** 링크 정보 추출 */
const linkObject = (type: string, url: string) => {
	if (type === 'github') {
		// https://github.com/{org}/{projectName}/blob/{branch}/{...filePath}
		// 이 구조에서 branch나 이름에 / 가 들어가 있는 것을 구분하지 못함
		// 컨벤션을 부여해야할 것으로 보임
		return parseGithubUrl(url)
	}
	return null
}

const ComponentLink = ({ componentLink }: { componentLink: string }) => {
	const parsed = componentKeyParser(componentLink)
	if (!parsed) return null
	const { pageId, nodeId } = parsed
	return (
		<button className={styles.component} onClick={() => emit<NodeZoomHandler>('NODE_ZOOM', { pageId, nodeId })}>
			<IconLayerComponent16 />
		</button>
	)
}

const CurrentMemoPage = ({
	memoKey: key,
	title,
	url,
	category,
	componentLink,
	...props
}: Memo & { memoKey: string }) => {
	// 섹션 정보 얻고

	console.log(key, title, 'url::', url, category, props)
	// 얻은 카테고리에 따라 메모 필터링해서 각 카테고리에 전달
	const linkType = linkSwitch(url)
	const linkInfo = linkObject(linkType, url)

	const type = linkInfo ? linkInfo.type : linkType

	return (
		<article className={styles.memoBlock}>
			<button
				className={styles.link}
				onClick={() => {
					// remove
					window.open(url, '_blank')
				}}
			>
				{type === 'github' && <GithubIcon />}
				{type === 'github code' && <GithubIcon />}
				{type === 'notion' && <NotionIcon />}
				{type === 'figma' && <FigmaIcon />}
				{type === 'unknown' && <IconHyperlinkLinked32 />}
			</button>
			<div className={styles.wrapper}>
				<div className={styles.top}>
					<span className={styles.title}>{title}</span>
				</div>
				<div className={styles.bottom}>
					<div className={styles.componentLink}>
						{componentLink.map((item) => (
							<ComponentLink componentLink={item} />
						))}
					</div>
				</div>
			</div>
			<button className={styles.delete}>
				<IconTrash32 />
			</button>
		</article>
	)
}

export default CurrentMemoPage
