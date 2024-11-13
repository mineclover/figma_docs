/** 화면 이동 */
export type ViewMoveType = {
	pageId: string
	id: string
}

/** 메모 추가 */
export type AddMemoType = {
	url: string
	title: string
	description: string
	// ui 쪽에서 흭득
	cartagory: string
	sectionBackLink: string[]
	componentLink: string[]
	// main 쪽에서 생성
	// created: string
	// modified: string
	// writer: string
}
