### 프로젝트 개발 구조 및 설계

주어진 클래스 다이어그램과 릴레이션 스키마, 기능 목록을 바탕으로 프로젝트의 전체 개발 구조를 
제안하겠습니다. 이 구조는 웹 애플리케이션을 중심으로 각 모듈이 어떻게 상호작용하고, 
기능이 구현될지에 대한 로드맵을 포함합니다.

#### 1. **프로젝트 아키텍처 설계**

프로젝트는 아래와 같은 **3계층 구조 (Three-tier Architecture)**를 따릅니다:

1. **프레젠테이션 계층 (Presentation Layer)**:
    - 사용자가 웹 브라우저에서 상호작용하는 프론트엔드.
    - `Thymeleaf`나 `React.js`와 같은 템플릿 엔진 또는 프론트엔드 라이브러리를 사용하여 
    사용자 인터페이스를 구성.
    - **주요 기능**: 일정/할 일 조회, 추가, 수정, 삭제 및 챗봇 기능을 제공하는 대시보드 및 사용자 인터페이스.

2. **비즈니스 로직 계층 (Business Logic Layer)**:
    - 서비스 계층으로 불리며, 애플리케이션의 주요 로직을 처리.
    - **서비스 클래스** 및 **관리자 클래스**를 통해 캘린더, 할 일, 알림, 사용자 설정 등의 
   비즈니스 로직을 구현.
    - **주요 기능**: 일정 관리, 할 일 관리, 알림 기능 처리 및 챗봇과의 통합 로직 구현.

3. **데이터 액세스 계층 (Data Access Layer)**:
    - 데이터베이스와 상호작용하는 부분으로, `JPA Repository`를 사용하여 데이터를 관리.
    - **Entity 클래스**와 **Repository 인터페이스**를 통해 데이터베이스의 테이블과 연동.

#### 2. **패키지 구조**

다음은 각 계층별 패키지 구조의 예시입니다.

```
com.timetodo
├── config          # 프로젝트의 전역 설정 (보안, CORS 설정 등)
├── controller      # 프레젠테이션 계층 (RESTful API, Web Controller)
│   ├── CalendarController.java
│   ├── TaskController.java
│   ├── ReminderController.java
│   ├── UserController.java
├── service         # 비즈니스 로직 계층 (Service 클래스)
│   ├── CalendarService.java
│   ├── TaskService.java
│   ├── ReminderService.java
│   ├── UserService.java
├── model           # 데이터 모델 (Entity 클래스)
│   ├── Calendar.java
│   ├── Task.java
│   ├── Reminder.java
│   ├── User.java
│   ├── Preferences.java
│   ├── Category.java
├── repository      # 데이터 액세스 계층 (Repository 인터페이스)
│   ├── CalendarRepository.java
│   ├── TaskRepository.java
│   ├── ReminderRepository.java
│   ├── UserRepository.java
│   ├── CategoryRepository.java
├── dto             # 데이터 전송 객체 (DTO 클래스)
│   ├── CalendarDTO.java
│   ├── TaskDTO.java
│   ├── ReminderDTO.java
│   ├── UserDTO.java
├── chatbot         # 챗봇 관련 로직 (NLP 및 챗봇 API와의 통신)
│   ├── ChatbotService.java
│   ├── ChatbotController.java
├── util            # 공통 유틸리티 클래스 (보안, 인증, 데이터 변환 등)
└── application     # 애플리케이션 구동 클래스 (Spring Boot main 클래스)
    ├── TimeToDoApplication.java
```

#### 3. **주요 클래스 및 인터페이스**

##### 1) **`User` 클래스**
- 사용자 정보를 관리하는 모델 클래스.
- 사용자의 기본 정보(아이디, 비밀번호, 이메일)와 `Preferences`(사용자 선호 설정) 객체를 가집니다.
- 각 사용자마다 여러 개의 `Calendar`, `Task`, `Category`를 가질 수 있는 관계 설정.

##### 2) **`Calendar` 클래스**
- 일정의 기본 정보를 저장하는 모델 클래스.
- 일정의 제목, 설명, 시작 및 종료 시간, 반복 설정, 카테고리 등의 속성 포함.
- `User`와 `Many-to-One` 관계로 설정되며, `Category`와도 `Many-to-One` 관계로 연결.

##### 3) **`Task` 클래스**
- 할 일 관리에 사용되는 모델 클래스.
- 할 일의 제목, 설명, 마감 기한, 우선순위, 진행 상태 등의 속성 포함.
- `User`와 `Many-to-One` 관계로 설정되며, `Reminder`와는 `One-to-Many` 관계로 연결.

##### 4) **`Category` 클래스**
- 일정 및 할 일을 분류하기 위한 카테고리 정보 저장.
- 카테고리 이름, 색상, 사용자 ID를 속성으로 가짐.
- `Calendar` 및 `Task`와 `Many-to-One` 관계.

##### 5) **`Reminder` 클래스**
- 알림 설정을 관리하는 모델 클래스.
- 일정 및 할 일에 대한 알림을 사전에 설정할 수 있음.
- `Task`와 `Many-to-One`, `Calendar`와 `Many-to-One` 관계로 설정.

#### 4. **서비스 계층 (Service Layer)**

- 각 엔티티 모델에 대응되는 서비스 클래스들을 생성하여 비즈니스 로직을 처리합니다.
- 예를 들어 `CalendarService` 클래스는 `Calendar` 객체의 CRUD 작업과 일정에 대한 
  검색 및 필터링 기능을 처리합니다.
- 각 서비스 클래스는 대응하는 Repository 인터페이스와 연동되어 데이터를 처리합니다.

```java
@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    public List<Calendar> getAllCalendarsByUser(String userId) {
        return calendarRepository.findAllByUserId(userId);
    }

    public Calendar createCalendar(Calendar calendar) {
        return calendarRepository.save(calendar);
    }

    public void deleteCalendar(String calendarId) {
        calendarRepository.deleteById(calendarId);
    }
}
```

#### 5. **컨트롤러 계층 (Controller Layer)**

- 프론트엔드와 백엔드 간의 통신을 담당하며, 각 요청을 처리하고 응답을 반환합니다.
- 예를 들어 `CalendarController`는 사용자로부터 캘린더 데이터를 받아와 `CalendarService`에 전달하고, 
  결과를 반환합니다.

```java
@RestController
@RequestMapping("/api/calendars")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Calendar>> getCalendars(@PathVariable String userId) {
        return ResponseEntity.ok(calendarService.getAllCalendarsByUser(userId));
    }

    @PostMapping
    public ResponseEntity<Calendar> createCalendar(@RequestBody Calendar calendar) {
        return ResponseEntity.ok(calendarService.createCalendar(calendar));
    }

    @DeleteMapping("/{calendarId}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable String calendarId) {
        calendarService.deleteCalendar(calendarId);
        return ResponseEntity.ok().build();
    }
}
```

#### 6. **챗봇 기능 통합**

- `ChatbotService`를 만들어서 사용자가 입력한 자연어를 해석하고, 일정 및 할 일과 연동되는 기능을 제공합니다.
- `openai-client` 또는 `spring-boot-starter-websocket`을 사용하여 AI 챗봇 기능과 통합할 수 있습니다.

#### 7. **데이터베이스 설계 및 매핑**

- `User`, `Calendar`, `Task`, `Category`, `Reminder`의 릴레이션 스키마를 기반으로 각 테이블을 매핑하고, 
  외래 키 및 관계를 설정합니다.
- **JPA 엔티티 매핑**을 통해 스키마와 애플리케이션 모델을 연결하고, 데이터베이스의 데이터 조작을 쉽게 할 수 있도록 합니다.

