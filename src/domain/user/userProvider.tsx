import { createContext, h } from 'preact'
import { useContext } from 'preact/hooks'
import { useUser_Adapter } from './userAdapter'
import { FigmaUser } from '../types'

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
