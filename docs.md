# 필독

- [히스토리](history.md)에 자세한 변경 사항 기록할 것
- adapter 가 단순한 것은 의도 됨
- payload action 등을 통해 복잡하게 구성할 수도 있지만 그러지 않도록 데이터를 파편화하는 것을 전재로 함

# 기능 정의

## 기본 기능

- 섹션 추적: 현재 유저가 선택한 노드가 위치한 섹션이랑 페이지 기반으로 주소를 흭득
- 메모: 전체 메모에서 추적된 섹션 링크에 해당하는 메모를 제공
- 카테고리: 업무 플로우 상 공유되야할 것
- 섹션: 기능 명세서 상 경로 정의
- 링크: 링크와 컴포넌트간의 연결
- 컴포넌트 메모: 뷰에 대한 설명
- 필터: 보여질 메모에 대한 포커스 수준 결정

## 사용되는 규칙

- 카테고리 상에서 Plan > Design > Develop > Deploy > Test , Sprint(pin) 은 업무 플로우를 나타내기 위함
  - 카테고리가 더 고정적이기 때문에 상단 카테고리가 카테고리로 구성되었음
- 섹션은 `메모/메모 추가 모달` 처럼 기능 명세서 상의 구조도를 나타내기 위해 정의되었음
- 같은 섹션 구조는 서로 공유됨 페이지 위치에 관계 없이
  - 하위 섹션도 같이 조회되서 화면에 보여짐

## 필터 기능

- 전체 메모를 볼 것인지 여부 (기본 값 : false)
- 유지할 최대 섹션 수 > 섹션 기준으로 포커스 필터링 되는 구조에서 메모를 얼마나 볼 것인지 (기본 값 : 1) , (0 : 비활성)
- 선택된 것을 기준으로 하위 섹션이 보여지게 할 것인지 여부
- 제목 검색
- 작성자 검색? UUID만 저장하고 있어서 성능 부하 있을 듯 > UUID 리스트에서 찾아서 매칭해서 찾아야하는 구조라..
  - 작성자를 선택하게 해서 정확한 이름으로만 찾게 하는 것이 성능적으로 좋아보임
-

- 메모 뷰어 자체가 화면의 현재 위치가 가지는 섹션 정보에 해당하는 메모만 보여주기 떄문에 카테고리를 상단 탭에 두는 구조가 성립할 수 있다고 생각했음
  - 섹션 길이가 더 길어서 ...
  - 섹션 리스트 뷰를 만드는 것도 좋은 생각..

## 기능 변경 사항

- 세션 포커스 기능 필터에 포함

# 사용 예시

![alt text](image-1.png)

[Types/Spec](#Types/Spec) 에서  
개발하고자하는 서비스에서 도메인을 위해 정의되는 데이터에 대한 타입 정의를 한다

지금 프로젝트의 경우  
main 또는 ui 를 위한 인터페이스를 만들고

메세지 프로토콜을 위한 이벤트 리스너를 생성한다  
이벤트 리스너 자체가 어떤 행동이 발생하기 위한 조건을 담고 있는 경우가 많다  
그렇기에 추상화된 행동을 정의하며 [Adapter](#adapter) 에 작서할 수 있다

- 리스너 또는 이미터 선언 로직을 담으면 된다
- 프로토콜 관련된 타입도 이곳에

[Adapter](#adapter) 를 트리거로 하거나 [Adapter](#adapter) 로 인한 데이터 변경을 트리거로 [Service](#service) 를 실행 시킬 수 있다  
[Service](#service) 는 [Repository](#repository) 를 통해 [Model](#model) 에서 데이터를 받거나  
[Adapter](#adapter) 가 받아온 데이터를 기반으로 수행하고자하는 로직을 처리한 후

다음 동작으로 연결 시킨다 [View](#view) 나 [Repository](#repository) 로 연결하거나 다른 [Service](#service) 도 가능

# Logic

이번에 시도해볼 아키텍처 구성 특징은
일단 어뎁터, 서비스, 레포지토리, 모델 , view 로 용도분리를 하고
도메인이 분리되있으면 보기 힘드니 데이터를 도메인으로 잡고 도메인 단위로 묶어서 구성했음

## Types/Spec

- 모든 레이어가 공유하는 인터페이스와 타입 정의

## Adapter

- 외부 시스템과의 통합 구현
- 주로 post 메세지 처리 할 것임
- 특정 [Service](#service) 를 실행시키기 위한 트리거로도 동작

## Service

- 핵심 비즈니스 로직 구현
- 트랜잭션 처리
- [Repository](#repository) 와 [Adapter](#adapter) 조합

## Repository

- 데이터 접근 추상화
- [Model](#model) 을 사용해서 데이터에 접근하는 것
- 입/출력 처리

## Model

- 도메인 엔티티와 값 객체
- 비즈니스 규칙과 제약조건들
- 직접적인 데이터 처리 로직
- 스토어가 하나인 상황에서 제약조건으로 락킹 분리하는 목적으로 쓰는게 목적

# View

## apps

- 배포 폴더로 사용
- ui.tsx 랑 main.tsx

## pages

- 페이지 컴포넌트 분리용

## components

- 리엑트 컴포넌트들

## controller

- 주로 데이터 핸들링하는 로직들

# 적용 예시

```ts
import { on, EventHandler } from '@create-figma-plugin/utilities'

interface adapterSampleHandler extends EventHandler {
	name: 'SAMPLE'
	handler: (count: number) => void
}

// 어뎁터는 한 번 또는 n번 선언
// 이벤트 리스너에 이벤트가 등록되는 개념이고 메세지가 오면 키 기반으로 payload 랑 함수를 실행하는 개념
// 양방향인데 선언하는 함수가 컴파일 시점에 전송대상이 정해지는 건지가 불분명함
// 전송 주체 기준으로 figma <=> ui 가 능동적임

export type HandlerParameters<T extends EventHandler> = Parameters<T['handler']>
export type Handler<T extends EventHandler> = (...args: HandlerParameters<T>) => void

type parametersType = HandlerParameters<adapterSampleHandler>
type handlerType = Handler<adapterSampleHandler>

/**
 * 데이터 실제 저장 로직 (reducer)
 * 리엑트의 경우.. 사용해봐야 알 것 같음
 */
export const model = (value: string) => {
	figma.root.setPluginData('main', value)
}

/**
 * 데이터 쓰기 로직 ( 읽기 쓰기, 선택 등 )
 */
export const repository = (obj: Object) => {
	const value = JSON.stringify(obj)
	model(value)
}

/**
 * 구현해야되는 비즈니스 로직
 */
export const service: handlerType = (count) => {
	const data = {
		hello: 'world',
		count: count,
	}
}

/**
 * 저장하는 adapter main에는 adapter 만 넣어야 함
 * 실행 한 번에 리스너 등록 한 번
 */
export const adapter = () => {
	on<adapterSampleHandler>('SAMPLE', service)
}
```
