import { createContext, h } from 'preact'
// import { UserProvider } from './user/userProvider'
import { UserProvider } from './user/userProvider'
import { User_Adapter } from './user/userAdapter'

export function AppProvider({ children }: { children: preact.ComponentChildren }) {
	// 사용자 상태
	return <User_Adapter>{children}</User_Adapter>
}
