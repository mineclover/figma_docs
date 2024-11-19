import { EventHandler } from '@create-figma-plugin/utilities'

export interface adapterSampleHandler extends EventHandler {
	name: 'SAMPLE'
	handler: (count: number) => void
}

export interface CloseHandler extends EventHandler {
	name: 'CLOSE'
	handler: () => void
}

export interface ResizeWindowHandler extends EventHandler {
	name: 'RESIZE_WINDOW'
	handler: (windowSize: { width: number; height: number }) => void
}

export interface NodeZoomHandler extends EventHandler {
	name: 'NODE_ZOOM'
	handler: ({ pageId, nodeId }: { pageId: string; nodeId: string }) => void
}
