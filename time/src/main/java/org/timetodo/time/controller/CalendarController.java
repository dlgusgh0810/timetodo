package org.timetodo.time.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.timetodo.time.dto.CalendarRequestDto;
import org.timetodo.time.entity.CalendarEntity;
import org.timetodo.time.service.CalendarService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.time.dto.RequestUserDto;

import java.util.List;

//@RestController // 이 클래스는 REST API 요청을 처리하는 컨트롤러임을 나타냅니다.
@Controller // HTML 템플릿을 렌더링
@RequiredArgsConstructor // final 필드로 선언된 의존성(서비스)을 자동으로 주입하는 생성자를 생성해줍니다.
@RequestMapping("/calendar") // 이 컨트롤러의 모든 엔드포인트는 "/calendar" 경로로 시작됩니다.
public class CalendarController {

    private final CalendarService calendarService; // CalendarService를 주입받아 사용합니다.

    // 일정 추가 페이지를 GET 요청으로 렌더링
    @GetMapping("/add")
    public String showAddCalendarForm() {
        return "calendarForm"; // calendarForm.html을 반환
    }

    // 새로운 일정을 추가하는 엔드포인트
    @PostMapping("/add")
    public ResponseEntity<CalendarEntity> addCalendar(@ModelAttribute CalendarRequestDto calendarRequestDto) {
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
    public ResponseEntity<CalendarEntity> updateCalendar(@PathVariable Long id, @ModelAttribute CalendarRequestDto calendarRequestDto) {
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

}

/*
CalendarController 흐름 요약
일정 추가: POST /calendar/add → 사용자가 보낸 일정을 추가.
모든 일정 조회: GET /calendar/all → 모든 일정을 조회하고 반환.
일정 업데이트: PUT /calendar/update/{id} → 특정 일정을 수정하고 업데이트.
일정 삭제: DELETE /calendar/delete/{id} → 특정 일정을 삭제.
*/