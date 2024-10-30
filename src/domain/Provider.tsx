import { createContext, h } from 'preact'
import { UserProvider } from './user/userProvider'

export function AppProvider({ children }: { children: preact.ComponentChildren }) {
	// 사용자 상태
	return <UserProvider>{children}</UserProvider>
}
