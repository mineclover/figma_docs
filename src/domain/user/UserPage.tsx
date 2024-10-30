import { h } from 'preact'
import { useUser } from './userProvider'

function UserPage() {
	const user = useUser()
	return (
		<div>
			<span>{user.name}</span>
			<span>{user.uuid}</span>
		</div>
	)
}

export default UserPage
