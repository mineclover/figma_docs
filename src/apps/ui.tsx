import { render, useWindowResize } from '@create-figma-plugin/ui'
import { h } from 'preact'

import { emit } from '@create-figma-plugin/utilities'
import { ResizeWindowHandler } from '../adapter/types'

import { AppProvider } from '@/domain/Provider'
import CategoryPage from '@/domain/category/RootPage'

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

	return (
		<AppProvider>
			<CategoryPage />
		</AppProvider>
	)
}

export default render(Plugin)
