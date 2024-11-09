import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { Axis, rectToStyle, rectToStyleOffset, BaseProps, clc } from './utils'
import styles from './modal.module.css'
import { deleteLayer } from './Modal'

type DivType = BaseProps['div']

export interface ClientModalProps extends DivType {
	/** 필수 */
	modalKey: string
	/** 외부 영역 클릭 시 모달 닫힘 여부 */
	outsideDismiss?: boolean
	/** Esc 클릭 시 모달 닫힘 */
	escapeActive?: boolean
	/** 닫힐 때 실행할 함수 넣고 싶으면 */
	onCloseTrigger?: () => void
	/**
	 * 모달 활성화 시 스크롤 안되게 막을지 여부
	 * 보류
	 */
	// freeze?: boolean
}

const ClientModal = ({
	children,
	outsideDismiss = true,
	className,
	onCloseTrigger,
	escapeActive = false,
	modalKey,

	...props
}: ClientModalProps) => {
	const [closing, setClosing] = useState(false)

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (escapeActive && event.code === 'Escape') {
				setClosing(true)
				deleteLayer(modalKey)
			}
		}
		window.addEventListener('keydown', handleKeyPress)

		return () => {
			setClosing(false)

			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [])

	function onDismiss() {
		if (outsideDismiss) {
			setClosing(true)
			deleteLayer(modalKey)
		}
	}

	return (
		<div
			{...props}
			className={clc(styles.modal_backdrop, className as string, closing && styles.close)}
			onClick={(e) => {
				if (e.currentTarget === e.target) {
					onDismiss()
					onCloseTrigger && onCloseTrigger()
					props.onClick && props.onClick(e)
				}
			}}
			onTouchEnd={(e) => {
				if (e.currentTarget === e.target) {
					onDismiss()
					onCloseTrigger && onCloseTrigger()
					props.onTouchEnd && props.onTouchEnd(e)
				}
			}}
		>
			{children}
		</div>
	)
}

export default ClientModal
