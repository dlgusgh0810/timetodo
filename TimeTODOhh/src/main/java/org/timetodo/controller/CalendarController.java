package org.timetodo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.service.CalendarService;

import java.time.LocalDateTime;
import java.util.List;

//@RestController // 이 클래스는 REST API 요청을 처리하는 컨트롤러임을 나타냅니다.
@RestController // HTML 템플릿을 렌더링
@RequiredArgsConstructor // final 필드로 선언된 의존성(서비스)을 자동으로 주입하는 생성자를 생성해줍니다.
@RequestMapping("/api/calendar") // 이 컨트롤러의 모든 엔드포인트는 "/calendar" 경로로 시작됩니다.
public class CalendarController {

    private final CalendarService calendarService; // CalendarService를 주입받아 사용합니다.

    /*// 기본 확인용 엔드포인트 (홈 페이지와 연동)
    @GetMapping
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Calendar API Home");
    }*/

    // 일정 추가 페이지를 GET 요청으로 렌더링
    @GetMapping("/add")
    public String showAddCalendarForm() {
        return "calendarForm"; // calendarForm.html을 반환
    }

    // 새로운 일정을 추가하는 엔드포인트
    @PostMapping("/add")
    public ResponseEntity<CalendarEntity> addCalendar(@RequestBody CalendarRequestDto calendarRequestDto) {
        // 사용자가 보낸 일정 데이터를 CalendarService로 넘겨 새로운 일정을 추가하고,
        // 그 결과를 응답으로 반환합니다.
        CalendarEntity newCalendar = calendarService.addCalendar(calendarRequestDto);
        return ResponseEntity.ok(newCalendar); // 성공 시 추가된 일정을 반환
    }

    // 모든 일정을 조회하는 엔드포인트
    @GetMapping("/all")
    public ResponseEntity<List<CalendarEntity>> getAllCalendars() {
        // CalendarService를 통해 저장된 모든 일정을 조회하고,
        // 그 결과를 응답으로 반환합니다.
        List<CalendarEntity> calendars = calendarService.getAllCalendars();
        return ResponseEntity.ok(calendars); // 성공 시 일정 목록을 반환
    }

    // 특정 일정을 업데이트하는 엔드포인트
    @PutMapping("/update/{id}")
    public ResponseEntity<CalendarEntity> updateCalendar(@PathVariable Long id, @RequestBody CalendarRequestDto calendarRequestDto) {
        // 경로 변수로 전달된 id에 해당하는 일정을 찾아,
        // 사용자가 보낸 데이터로 업데이트하고 그 결과를 반환합니다.
        CalendarEntity updatedCalendar = calendarService.updateCalendar(id, calendarRequestDto);
        return ResponseEntity.ok(updatedCalendar); // 성공 시 업데이트된 일정을 반환
    }

    // 특정 일정을 삭제하는 엔드포인트
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCalendar(@PathVariable Long id) {
        // 경로 변수로 전달된 id에 해당하는 일정을 삭제합니다.
        calendarService.deleteCalendar(id);
        return ResponseEntity.noContent().build(); // 성공 시 응답 본문 없이 204 상태코드 반환
    }

    // 일정 검색 엔드포인트
    @GetMapping("/search")
    public ResponseEntity<List<CalendarEntity>> searchEvents(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam Long categoryId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime) {
        List<CalendarEntity> events = calendarService.searchEvents(title, description, categoryId, startTime);
        return ResponseEntity.ok(events);
    }

    // 반복 일정 추가 엔드포인트
    @PostMapping("/addRepeatingEvent")
    public ResponseEntity<CalendarEntity> addRepeatingEvent(@RequestBody CalendarRequestDto request) {
        CalendarEntity event = calendarService.addRepeatingEvent(request);
        return ResponseEntity.ok(event);
    }

}

/*
CalendarController 흐름 요약
일정 추가: POST /calendar/add → 사용자가 보낸 일정을 추가.
모든 일정 조회: GET /calendar/all → 모든 일정을 조회하고 반환.
일정 업데이트: PUT /calendar/update/{id} → 특정 일정을 수정하고 업데이트.
일정 삭제: DELETE /calendar/delete/{id} → 특정 일정을 삭제.
*/

/*
addRepeatingEvent: 반복 일정을 추가합니다. CalendarRequestDto를 통해 반복 주기(repeatType)가 설정된 일정을 추가합니다.
search: 제목, 설명, 카테고리 ID, 시작 시간으로 일정을 검색합니다. 클라이언트에서 입력받은 검색 조건을 바탕으로 일정 목록을 필터링하여 반환합니다.
    주의사항
    React 프론트엔드에서 이 컨트롤러의 API를 사용할 때, 날짜와 시간(startTime) 형식은 ISO_DATE_TIME 형식으로 전달해야 합니다. 예를 들어, "2023-12-01T10:15:30"와 같은 형식입니다.
*/