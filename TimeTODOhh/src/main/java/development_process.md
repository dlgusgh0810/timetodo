# 현재까지 개발 과정

---
***

## 백엔드 

---

### User
1. 회원가입기능 DTO를 엔티티로 변환하여 사용자 생성
2. 로그인기능 

---
### Task
1. 할일 추가페이지 GET 요청으로 렌더링
2. 새로운 할 일 추가
3. 모든 할 일 조회
4. 특정 할 일 업데이트
5. 특정 할 일 삭제

#### TaskController 흐름 요약
- 할 일 추가: POST /task/add → 사용자가 보낸 할 일을 추가.
- 모든 할 일 조회: GET /task/all → 모든 할 일을 조회하고 반환.
- 할 일 업데이트: PUT /task/update/{id} → 특정 할 일을 수정하고 업데이트.
- 할 일 삭제: DELETE /task/delete/{id} → 특정 할 일을 삭제.

---

### Calendar
1. 일정 추가 페이지 GET 요청으로 렌더링
2. 새로운 일정 추가
3. 모든 일정 조회
4. 특정 일정을 업데이트
5. 특정 일정을 삭제
6. 반복 일정을 추가 _(11/3)_
7. 제목, 설명, 카테고리 ID, 시작 시간으로 일정을 검색, 클라이언트에서 입력받은 검색조건을 바탕으로 일정목록을 필터링하여 변환. _(11/3)_
8. 기타 : 기능확인용 html페이지 만듦 (resources > test_Calendar.html) , WebConfig에서 (.allowedOriginPatterns("*") 써서 로컬파일로 확인함) _(11/3)_

확인해볼사항 : 새로운 일정 추가 기능이랑 반복 일정 추가 기능이랑 겹쳐서 그냥 합쳐야될듯?

#### CalendarController 흐름 요약
- 일정 추가: POST /calendar/add → 사용자가 보낸 일정을 추가.
- 모든 일정 조회: GET /calendar/all → 모든 일정을 조회하고 반환.
- 일정 업데이트: PUT /calendar/update/{id} → 특정 일정을 수정하고 업데이트.
- 일정 삭제: DELETE /calendar/delete/{id} → 특정 일정을 삭제.
- 반복 일정 추가 : GET /calendar/search  _(11/3)_
- 일정 검색 : POST /calendar/addRepeatingEvent _(11/3)_