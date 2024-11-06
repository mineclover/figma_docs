import { signal } from '@preact/signals-core'
import { MemoCategoryList } from '../types'

export const categoryAtom = signal<MemoCategoryList>([])
