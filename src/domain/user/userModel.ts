import { signal } from '@preact/signals-core'
import { FigmaUser } from '../types'

/** signal 이지만 이름이 겹쳐서 아톰으로 함 */

export const userAtom = signal<FigmaUser>({
	uuid: '',
	name: '',
})
