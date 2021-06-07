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

> 메뉴 구분에서 `-`는 메뉴에서 직접 들어갈 수 없는 경우

[User]

| 주소             | 컴포넌트           | 메뉴 구분 | 비고                                                         |
| ---------------- | ------------------ | --------- | ------------------------------------------------------------ |
| /ask             | Ask                | 커뮤니티  | 문의사항                                                     |
| /book            | Book               | 예매      | 예매                                                         |
| /event           | Event              | 커뮤니티  | 이벤트                                                       |
| /faq             | FAQ                | 커뮤니티  | FAQ                                                          |
| /login           | Login              | 서브메뉴  | 로그인                                                       |
| /main            | Main               | -         | 메인 페이지                                                  |
| /movie/:movie_id | MovieList          | 영화      | movie_id가 없다면 목록 페이지<br />movie_id가 있다면 상세 페이지 |
| /mymovie         | MyMovie            | 커뮤니티  | 내가 본 영화                                                 |
| /mypage          | Mypage             | 서브메뉴  | 마이페이지                                                   |
| /notice          | Notice             | 커뮤니티  | 공지사항                                                     |
| /pay             | Pay                | -         | 결제                                                         |
| /point           | PointDescription   | 커뮤니티  | 등급별 설명 페이지                                           |
| /signup          | SignUp             | 서브메뉴  | 회원가입                                                     |
| /store           | Store              | 스토어    | 상품                                                         |
| /theater         | TheaterDescription | 커뮤니티  | 영화관설명                                                   |
| /error           | Error              | -         | 에러                                                         |
|                  |                    |           |                                                              |

<br>

[Admin]

| 주소       | 컴포넌트        | 메뉴 구분 | 비고             |
| ---------- | --------------- | --------- | ---------------- |
| /admin     | AdminAdmin      | 영화관    | 직원 관리        |
| /ask       | AdminAsk        | 커뮤니티  | 문의사항 관리    |
| /blacklist | AdminBlackList  | 운영      | 블랙리스트 관리  |
| /book      | AdminBookRecord | 운영      | 예매현황 조회    |
| /event     | AdminEvent      | 커뮤니티  | 이벤트 관리      |
| /faq       | AdminFAQ        | 커뮤니티  | FAQ 관리         |
| /genre     | AdminGenre      | 영화관    | 장르 관리        |
| /hall      | AdminHall       | 영화관    | 상영관 관리      |
| /home      | AdminHome       |           |                  |
| /main      | AdminMain       | -         | 메인 페이지      |
| /movie     | AdminMovie      | 영화관    | 영화 관리        |
| /notice    | AdminNotice     | 커뮤니티  | 공지사항 관리    |
| /pay       | AdminPay        | 운영      | 결제 내역 조회   |
| /people    | AdminPeolple    | 영화관    | 인물 관리        |
| /sales     | AdminSales      | 운영      | 매출 관리        |
| /showsch   | AdminShowSCH    | 영화관    | 상영 일정 관리   |
| /store     | AdminStore      | 스토어    | 상품 관리        |
| /theater   | AdminTheater    | 커뮤니티  | 영화관 설명 관리 |
| /error     | AdminError      | -         | 에러             |



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