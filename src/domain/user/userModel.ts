import { generateRandomText2 } from '@/utils/textTools'
import { prefix } from '@/domain/interface'
import { FigmaUser } from '@/domain/types'

const generateUUID = () => {
	return prefix['user'] + generateRandomText2()
}

export const getUserModel = async () => {
	const nameR = await figma.clientStorage.getAsync('name')
	const name = nameR ?? ''
	const uuidR = await figma.clientStorage.getAsync('uuid')
	const uuid = uuidR ?? generateUUID()
	if (!uuidR) {
		figma.clientStorage.setAsync('uuid', uuid)
	}
	return { name, uuid } as FigmaUser
}

export const setUserName = (name: string) => {
	return figma.clientStorage.setAsync('name', name)
}
