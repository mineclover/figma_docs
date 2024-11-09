import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { signal } from '@preact/signals-core'
import ClientModal, { ClientModalProps } from './ClientModal'
import { useSignal } from '@/hooks/useSignal'

type JSXModal = h.JSX.Element

type FunctionAtomProps = {
	addLayer: (key: string, jsx: JSXModal, props?: Omit<ClientModalProps, 'modalKey'>) => void
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
	addLayer: (key: string, jsx: JSXModal, props?: Omit<ClientModalProps, 'modalKey'>) => {
		const Temp = (
			<ClientModal key={key} {...props} modalKey={key}>
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

	// const setFunction = useSetAtom(modalFunctionAtom)

	useEffect(() => {
		// sort 새로 고침 등에서 사라지는 로직
		const layerKey = Object.keys(layer)
		const temp = layer

		layerKey.forEach((name) => {
			if (sort.includes(name)) return
			delete temp[name]
		})

		setLayer((state) => ({ ...state, ...temp }))
	}, [sort])

	// const target = document.getElementById('crew-root') ? document.getElementById('crew-root') : document.body!

	return <div>{sort.map((name) => layer[name])}</div>
}

export default ClientModalProvider
