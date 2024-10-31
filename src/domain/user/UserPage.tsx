import { h } from 'preact'
// import { useUser } from './userProvider'
import { userDataEmit } from '../interface'
import { useUser_Adapter } from './userAdapter'

function UserPage() {
	const user = useUser_Adapter()
	// const user = UserAtom.value
	return (
		<div>
			<span>{user.name}</span>
			<span>{user.uuid}</span>
			<button
				onClick={() =>
					userDataEmit('DATA_User', {
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
