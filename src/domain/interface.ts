import { on, once, emit, EventHandler } from '@create-figma-plugin/utilities'
import { generateRandomText2 } from '../utils/textTools'

/**
 * 데이터인터페이스 제너레이터
 */
export interface OnceHandler<T extends Array<any>> extends EventHandler {
	name: string
	handler: (...args: T) => void
}

/**
 * 데이터 인터페이스
 */
export interface ActionHandler extends EventHandler {
	name: string
	handler: (args: any) => void
}

/**
 * 시그널 인터페이스
 */
export interface SignalHandler extends EventHandler {
	name: string
	handler: (random?: string) => void
}

export const rejectSymbol = Symbol('once reject')

export const rejectCheck = <T>(value: T | typeof rejectSymbol): value is T => {
	return value !== rejectSymbol
}

/** 데이터에 고유 식별 걸어주는게 좋지 않을까 */

// 키벨류 key value

// 같은 이름으로 처리하는게 왜 위험하냐면
// 데이터 전송할 때랑 데이터 요청할 때 키가 같아버리면 양방향에서 데이터 처리가 안됨

/**
 * {prefix}_{Data_Key} , {randomKey}
 * 요청은 시그널로 응답은 data로 시그널로 데이터 요청해서 받는 로직이고
 * random은 일회용 신호를 위해 준비됨
 * 데이터는 입력할 때 {prefix}_{key} 데이터로 보낸다
 * generateRandomText2 쓰지 않는 기본 리스너는 on으로 정의해서 항상 받도록 구성
 */
export const prefix = {
	/** 데이터 요청
	 * 받는 곳에서 똑같이 처리해주면 됨
	 */
	signal: 'SIGNAL_',
	/** 데이터 응답 */
	data: 'DATA_',
	memo: 'MEMO_',
}

/**
 * 일회용 호출
 * 저장하는 adapter main에는 adapter 만 넣어야 함
 * 호출 키랑 응답 값이 다름
 * 호출 어뎁터랑 응답 어뎁터가 달라서 실별자 정의 해야함
 */
export const asyncEmit = <T extends Record<'key' | 'data', any>>(handlerKey: T['key'], delay?: number) =>
	new Promise<T['data'] | typeof rejectSymbol>((resolve, reject) => {
		const random = generateRandomText2()
		const signalKey = prefix['signal'] + handlerKey
		const dataKey = prefix['data'] + handlerKey
		const delay2 = delay ?? 1000
		const event = once<ActionHandler>(dataKey + random, (args) => {
			resolve(args)
		})

		emit<SignalHandler>(signalKey, random)

		setTimeout(() => {
			event()
			reject(rejectSymbol)
		}, delay2)
	})
