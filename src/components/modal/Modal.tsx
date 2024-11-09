import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'
import { signal } from '@preact/signals-core'
import ClientModal, { ClientModalProps } from './ClientModal'
import { useSignal } from '@/hooks/useSignal'

type CloseProps = { close: boolean; [key: string]: any }

type JSXModal = (props: CloseProps) => h.JSX.Element

type FunctionAtomProps = {
	addLayer: (key: string, jsx: h.JSX.Element, props?: Omit<ClientModalProps, 'modalKey'>) => void
	deleteLayer: Function
}

const layerAtom = signal<Record<string, JSXModal>>({})
const sortAtom = signal<string[]>([])
const setSort = (fn: (state: string[]) => string[]) => (sortAtom.value = fn(sortAtom.value))

const setLayer = (fn: (state: Record<string, JSXModal>) => Record<string, JSXModal>) =>
	(layerAtom.value = fn(layerAtom.value))

export const modalFunctionAtom = signal<FunctionAtomProps>({
	deleteLayer: (key: string) => {
		setSort((state) => state.filter((element) => element !== key))
	},
	addLayer: (key: string, jsx: h.JSX.Element, props?: Omit<ClientModalProps, 'modalKey'>) => {
		const Temp = (props: CloseProps) => (
			<ClientModal key={key} {...props} close={props.close} modalKey={key}>
				{jsx}
			</ClientModal>
		)

		setLayer((state) => ({ ...state, [key]: Temp }))

		setSort((state) =>
			[...state.filter((i) => i !== key), key].filter((value, index, self) => self.indexOf(value) === index)
		)
	},
})

export const { addLayer, deleteLayer } = modalFunctionAtom.value

const ClientModalProvider = () => {
	const layer = useSignal(layerAtom)
	const sort = useSignal(sortAtom)
	const removeList = useRef<string[]>([])

	// const setFunction = useSetAtom(modalFunctionAtom)

	useEffect(() => {
		// sort 새로 고침 등에서 사라지는 로직
		// 보이는 걸 먼저 없애고 삭제하는 구조
		// 이벤트가 발생하면 삭제 대상에게 close를 전달하고
		const layerKey = Object.keys(layer)
		const temp = layer

		layerKey.forEach((name) => {
			if (sort.includes(name)) return

			removeList.current = [...removeList.current, name]

			delete temp[name]
		})

		setTimeout(() => {
			// 없애는 정보 어떻게 전달할지..
			setLayer((state) => ({ ...state, ...temp }))
			// 리스트는 파악해서 값 넣는 구조니까
		}, 500)
	}, [sort])

	useEffect(() => {
		setTimeout(() => {
			removeList.current = []
			// 리스트는 파악해서 값 넣는 구조니까
		}, 500)
	}, [layer])

	// const target = document.getElementById('crew-root') ? document.getElementById('crew-root') : document.body!
	// 삭제 구현 ...

	const t = false
	return (
		<div>
			{sort.map((name) => {
				const Tag = layer[name]
				const close = removeList.current.includes(name)
				console.log(removeList.current, close)

				return <Tag close={close}></Tag>
			})}
		</div>
	)
}

export default ClientModalProvider
