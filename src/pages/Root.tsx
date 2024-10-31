import UserPage from '@/domain/user/UserPage'
import { h } from 'preact'
import styles from './root.module.css'

function Root() {
	return (
		<div className={styles.root}>
			ㅁㄴㅇㄹ
			<UserPage></UserPage>
		</div>
	)
}

export default Root
