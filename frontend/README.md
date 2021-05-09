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



## 라우팅

URL별로 연결되는 라우팅 컴포넌트에 대해 정리

[User]

| 주소             | 컴포넌트           | 비고                                                         |
| ---------------- | ------------------ | ------------------------------------------------------------ |
| /ask             | Ask                | 문의사항                                                     |
| /book            | Book               | 예매                                                         |
| /event           | Event              | 이벤트                                                       |
| /faq             | FAQ                | FAQ                                                          |
| /login           | Login              | 로그인                                                       |
| /main            | Main               | 메인 페이지                                                  |
| /movie/:movie_id | MovieList          | movie_id가 없다면 목록 페이지<br />movie_id가 있다면 상세 페이지 |
| /mymovie         | MyMovie            | 내가 본 영화                                                 |
| /mypage          | Mypage             | 마이페이지                                                   |
| /notice          | Notice             | 공지사항                                                     |
| /pay             | Pay                | 결제                                                         |
| /point           | PointDescription   | 등급별 설명 페이지                                           |
| /signup          | SignUp             | 회원가입                                                     |
| /store           | Store              | 상품                                                         |
| /theater         | TheaterDescription | 영화관설명                                                   |
| /error           | Error              | 에러                                                         |
|                  |                    |                                                              |



## scss 사용방법

* base : scss 사용할 변수나 기본 사항 저장 => 다른 파일에서 import 해서 사용됨
  * _font.scss : font 폴더에 있는 font를 import해서 사용하기 좋게 조작
  * _mixin.scss : 반응형 디자인 쉽게 조장
  * _reset.scss : 초기 css 세팅
  * _variable.scss : 사용할 공통 변수 저장
* component : 컴포넌트와 1:1 대응
* pages : page 컴포넌트와 1:1 대응 



## 프론트끼리의 규칙

* material UI 라이브러리의 컴포넌트는 필요 시에만 사용 (div => Grid 와 같은 남용적 사용 x)
* css name은 -로 잇기 `ex_) class-name`