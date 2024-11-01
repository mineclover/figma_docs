import { createContext, h } from 'preact'
import { useContext } from 'preact/hooks'
import { useUser_Adapter } from './userAdapter'
import { FigmaUser } from '../types'

// 프로바이더 컨텍스트로 상태 관리 예시
// 시그널이 더 좋아서 안쓰게 됨
export const UserContext = createContext<FigmaUser>({
	uuid: '',
	name: '',
})

export function UserProvider({ children }: { children: preact.ComponentChildren }) {
	// 사용자 상태
	const user = useUser_Adapter()
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
	const context = useContext(UserContext)

	if (!context) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context
}
