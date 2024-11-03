import { render, TabsOption, Tabs, useWindowResize } from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useState } from 'preact/hooks'

import { NonNullableComponentTypeExtract } from '../../types/utilType'

import { emit } from '@create-figma-plugin/utilities'
import { ResizeWindowHandler } from '../adapter/types'
import Root from '@/pages/Root'
import { AppProvider } from '@/domain/Provider'
import { Parent } from '@/pages/Test'
import UserPage from '@/domain/user/UserPage'
import SectionPage from '@/domain/section/SectionPage'

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
	const nav = ['preact demo', 'user', 'section', 'section']

	const options: Array<TabsOption> = [
		{
			children: <Parent />,
			value: nav[0],
		},
		{
			children: <UserPage />,
			value: nav[1],
		},
		{
			children: <SectionPage />,
			value: nav[2],
		},
	] as const
	const [value, setValue] = useState<string>(nav[1])

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
