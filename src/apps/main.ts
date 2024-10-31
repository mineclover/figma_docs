import { on, once, showUI } from '@create-figma-plugin/utilities'
import { adapterSampleHandler, CloseHandler, ResizeWindowHandler } from '../adapter/types'
import { mainUser_Adapter } from '@/domain/user/userAdapter'

export default function () {
	mainUser_Adapter()

	on<ResizeWindowHandler>('RESIZE_WINDOW', function (windowSize: { width: number; height: number }) {
		const { width, height } = windowSize
		figma.ui.resize(width, height)
	})

	once<adapterSampleHandler>('SAMPLE', function (count: number) {
		const nodes: Array<SceneNode> = []
		for (let i = 0; i < count; i++) {
			const rect = figma.createRectangle()
			rect.x = i * 150
			rect.fills = [
				{
					color: { b: 0, g: 0.5, r: 1 },
					type: 'SOLID',
				},
			]
			figma.currentPage.appendChild(rect)
			nodes.push(rect)
		}
		figma.currentPage.selection = nodes
		figma.viewport.scrollAndZoomIntoView(nodes)
		figma.closePlugin()
	})
	once<CloseHandler>('CLOSE', function () {
		figma.closePlugin()
	})
	showUI({
		height: 137,
		width: 240,
	})
}
