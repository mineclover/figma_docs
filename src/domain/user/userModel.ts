import { generateRandomText2 } from '@/utils/textTools'
import { prefix } from '@/domain/interface'
import { FigmaUser } from '@/domain/types'

const generateUUID = () => {
	return prefix['user'] + generateRandomText2()
}

export const getUserModel = async () => {
	const nameR = await figma.clientStorage.getAsync('name')

	console.log(nameR, 'name')
	const name = nameR ?? ''
	const uuidR = await figma.clientStorage.getAsync('uuid')
	console.log(uuidR, 'uuid1')

	const uuid = uuidR ?? generateUUID()
	console.log(uuid, 'uuid2')
	return { name, uuid } as FigmaUser
}

export const setUserName = (name: string) => {
	return figma.clientStorage.setAsync('name', name)
}
