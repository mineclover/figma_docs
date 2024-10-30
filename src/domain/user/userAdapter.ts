import { on, once, emit, EventHandler } from '@create-figma-plugin/utilities'

import { useState, useEffect } from 'preact/hooks'
import { FigmaUser } from '../types'

import { DataHandler2, SignalHandler2, userDataOn, userSignalEmit, userDataEmit, signalReceiving } from '../interface'
import { getUserModel, setUserName } from './userModel'

type DataUserHandler = DataHandler2<'User'>
type SignalUserHandler = SignalHandler2<'User'>

/**
 * 데이터 전송 어댑터
 */
export const mainUser_Adapter = () => {
	userDataOn('DATA_User', async (user) => {
		const originUser = await getUserModel()
		if (originUser.name !== user.name) {
			setUserName(user.name)

			// 변경 시 전송
			userDataEmit('DATA_User', user)
		}
	})
	on<SignalUserHandler>('SIGNAL_User', async (key) => {
		const user = await getUserModel()

		signalReceiving('User', key)(user)
	})
}
//

export const sampleDataEmit = emit<DataHandler2<'User'>>

/**
 * 한 번만 호출해서 쓸 것
 * 귀찮으면 provider 로 넘겨서 사용하는 걸 추천
 */
export const useUser_Adapter = () => {
	const [user, setUser] = useState<FigmaUser>({
		uuid: '',
		name: '',
	})
	useEffect(() => {
		// 항상 열려있는 인터페이스
		// 공식 루트
		const event = userDataOn('DATA_User', (user) => {
			setUser(user)
		})
		// 시그널도 열어야하는 값은 아닌 거 같음
		// 받을 키로 전달해서 값을 받게 함
		userSignalEmit('SIGNAL_User')

		return () => {
			event()
		}
	}, [])
	return user
}
