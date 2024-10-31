import { render, TabsOption, Tabs, useWindowResize } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'

import { NonNullableComponentTypeExtract } from '../../types/utilType'

import { emit } from '@create-figma-plugin/utilities'
import { ResizeWindowHandler } from '../adapter/types'
import Root from '@/pages/Root'
import { AppProvider } from '@/domain/Provider'
import { Parent } from '@/pages/Test'

const fn = async (files: Array<File>) => {
	const text = await files[0].text()
}

function Plugin() {
	function onWindowResize(windowSize: { width: number; height: number }) {
		emit<ResizeWindowHandler>('RESIZE_WINDOW', windowSize)
	}
	useWindowResize(onWindowResize, {
		maxHeight: 1080,
		maxWidth: 1920,
		minHeight: 120,
		minWidth: 120,
		resizeBehaviorOnDoubleClick: 'minimize',
	})
	const nav = ['SVG 생성기', '변수 추출', 'SVG 정보 자동완성']

	const options: Array<TabsOption> = [
		{
			children: <Root />,
			value: nav[0],
		},
		{
			children: <Parent />,
			value: nav[1],
		},
		{
			children: 'SVG 정보 자동완성',
			value: nav[2],
		},
	] as const
	const [value, setValue] = useState<string>('SVG 생성기')

	function handleChange(
		//  event: NonNullableComponentTypeExtract<typeof Tabs, 'onChange'>
		event: Parameters<NonNullableComponentTypeExtract<typeof Tabs, 'onChange'>>[0]
	) {
		const newValue = event.currentTarget.value
		setValue(newValue)
	}
	return (
		<AppProvider>
			<Tabs onChange={handleChange} options={options} value={value} />
		</AppProvider>
	)
}

export default render(Plugin)
