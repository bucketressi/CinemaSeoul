# Frontend

## 구조적 흐름

index.tsx => App.tsx => Provider.tsx => ViewModel.tsx, Model.tsx, Router.tsx

1. index.tsx가 index.html의 root div와 App.tsx를 이어주는 역할을 함
2. App.tsx는 최상위 리액트 컴포넌트로 Router를 사용할 수 있는 환경 설정만 함
3. Provider.tsx는 Router가 Model의 state를 쓸 수 있게 해주고, ViewModel의 state 변경 로직을 쓸 수 있게 Provider로 감싸줌
4. Router.tsx는 react-router-dom을 이용해서 들어오는 url에 따라 각각의 Page 컴포넌트로 분기해줌



* 개발 시

Model에 필요한 state Context로 정의 => Provider로 감싸진 컴포넌트는 모두 이 state를 useContext로 불러와서 사용할 수 있음 (전역 변수의 의미)

ViewModel에 필요한 state 관리 로직 정의 => Provider로 감싸진 컴포넌트는 모두 이 state를 useContext로 불러와서 사용할 수 있음 (전역 함수의 의미)





## 프론트끼리의 규칙

* material UI 라이브러리의 컴포넌트는 필요 시에만 사용 (div => Grid 와 같은 남용적 사용 x)
* css name은 -로 잇기 `ex_) class-name`