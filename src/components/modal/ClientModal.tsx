import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { BaseProps, clc } from './utils'
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
	close: boolean
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
	close,
	onCloseTrigger,
	escapeActive = false,
	modalKey,

	...props
}: ClientModalProps) => {
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (escapeActive && event.code === 'Escape') {
				deleteLayer(modalKey)
			}
		}
		window.addEventListener('keydown', handleKeyPress)

		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [])

	function onDismiss() {
		if (outsideDismiss) {
			deleteLayer(modalKey)
		}
	}

	return (
		<div
			{...props}
			className={clc(styles.modal_backdrop, className as string, close && styles.close)}
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
