import { generateRandomText2 } from '@/utils/textTools'
import { prefix } from '@/domain/interface'
import { FigmaUser } from '@/domain/types'

const generateUUID = () => {
	return prefix['user'] + generateRandomText2()
}

export const getUserModel = async () => {
	const name = (await figma.clientStorage.getAsync('name')) ?? ''
	const uuid = (await figma.clientStorage.getAsync('uuid')) ?? generateUUID()
	return { name, uuid } as FigmaUser
}

export const setUserName = (name: string) => {
	return figma.clientStorage.setAsync('name', name)
}
