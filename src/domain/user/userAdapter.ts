import { on, once, emit, EventHandler } from '@create-figma-plugin/utilities'

import { useState, useEffect } from 'react'
import { FigmaUser } from '../types'
import { DataUserHandler, SignalUserHandler } from './user'
import { ActionHandler, concatWithType2, concatWithType3, OnceHandler, prefix } from '../interface'
import { duplexKeys } from '../duplex'
import { getUserModel, setUserName } from './userModel'

/**
 * 데이터 전송 어댑터
 */
export const mainUser_Adapter = () => {
	on<DataUserHandler>('DATA_User', async (user) => {
		const originUser = await getUserModel()
		if (originUser.name !== user.name) {
			setUserName(user.name)
			const emitKey = concatWithType3('data', 'user')
			// 변경 시 전송
			emit<ActionHandler>(emitKey, user)
		}
	})
	on<SignalUserHandler>('SIGNAL_User', async (key) => {
		const user = await getUserModel()
		const emitKey = concatWithType3('data', 'user')
		if (key) {
			emit<ActionHandler>(emitKey, user)
		} else {
			emit<ActionHandler>(emitKey + key, user)
		}
	})
}

/**
 * 한 번만 호출해서 쓸 것
 * 귀찮으면 provider 로 넘겨서 사용하는 걸 추천
 */
export const useUser_Adapter = () => {
	const [user, setUser] = useState<FigmaUser>()
	useEffect(() => {
		// 항상 열려있는 인터페이스
		const dataKey = concatWithType3('data', 'user')
		const event = on<DataUserHandler>(dataKey, (user) => {
			setUser(user)
		})
		// 공식 루트
		// 받을 키로 전달해서 값을 받게 함
		emit<SignalUserHandler>('SIGNAL_User')
		return () => {
			event()
		}
	}, [])
	return user
}
