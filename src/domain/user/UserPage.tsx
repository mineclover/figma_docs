import { h } from 'preact'
// import { useUser } from './userProvider'
import { userDataEmit } from '../interface'
import { UserAtom, useUser_Adapter } from './userAdapter'
import { useSignal } from '@/hooks/useSignal'

function UserPage() {
	// const user = useUser_Adapter()
	const user = useSignal(UserAtom)
	return (
		<div>
			<span>{user.name}</span>
			<span>{user.uuid}</span>
			<button
				onClick={() =>
					userDataEmit('DATA_user', {
						uuid: user.uuid,
						name: 'user',
					})
				}
			>
				전송
			</button>
		</div>
	)
}

export default UserPage
