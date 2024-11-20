package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import org.timetodo.JWT.JwtService;
import org.timetodo.dto.ReminderRequestDto;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.service.ReminderService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/reminder")
@RequiredArgsConstructor
public class ReminderController {

    private final ReminderService reminderService;
    //private final JwtService jwtService;

    /**
     * 알림 생성 또는 업데이트
     * @param reminderRequestDto 알림 요청 데이터
     * @return 생성된 알림 정보
     */
    @PostMapping("/addTask")
    public ResponseEntity<String> createTaskReminder(
            @RequestBody ReminderRequestDto reminderRequestDto/*,
            @RequestHeader("Authorization") String token*/) {

        // TaskId JWT에서 추출
        //Long taskId = jwtService.extractId(token, "taskId");

        Long taskId = reminderRequestDto.getTaskId();

        log.info("createTaskReminder 메소드의 taskId : {} ", taskId);

        // Reminder 생성
        reminderService.createTaskReminder(reminderRequestDto, taskId);

        return ResponseEntity.ok("Task Reminder created successfully");
    }

    @PostMapping("/addCalendar")
    public ResponseEntity<String> createCalendarReminder(
            @RequestBody ReminderRequestDto reminderRequestDto/*,
            @RequestHeader(value = "Authorization", required = false) String token*/) {

        /*log.info("createCalendarReminder 메소드 , Authorization Token : " + token);
        // CalendarId JWT에서 추출
        Long calendarId = jwtService.extractId(token, "calendarId");*/

        Long calendarId = reminderRequestDto.getCalendarId();

        log.info("createCalendarReminder 메소드의 calendarId: {}", calendarId);

        // Reminder 생성
        reminderService.createCalendarReminder(reminderRequestDto, calendarId);

        return ResponseEntity.ok("Calendar Reminder created successfully");

    }

    /**
     * 사용자에 대한 모든 알림 조회
     * @return 알림 목록
     */
    @GetMapping("/findTask")
    public List<ReminderEntity> getTaskReminders(@RequestBody ReminderRequestDto reminderRequestDto/*@RequestHeader("Authorization") String token*/) {
        //Long taskId = jwtService.extractId(token,"taskId");
        Long taskId = reminderRequestDto.getTaskId();
        return reminderService.getReminderByTaskId(taskId);
    }

    @GetMapping("/findCalendar")
    public List<ReminderEntity> getCalendarsReminders(@RequestBody ReminderRequestDto reminderRequestDto/*@RequestHeader("Authorization") String token*/) {
        //Long calendarId = jwtService.extractId(token,"calendarId");
        Long calendarId = reminderRequestDto.getCalendarId();
        return reminderService.getReminderByCalendarId(calendarId);
    }

    /**
     * 알림 삭제
     * @param reminderId 알림 ID
     * @return 성공 응답
     */
    @DeleteMapping("/{reminderId}")
    public ResponseEntity<String> deleteReminder(@PathVariable Long reminderId) {
        reminderService.deleteReminder(reminderId);
        return ResponseEntity.ok("알림 삭제 성공");
    }

}

/*
흐름 요약
addTask 및 addCalendar:

Task 또는 Calendar 생성.
생성된 ID(TaskId 또는 CalendarId)로 JWT 생성.
생성된 JWT를 HTTP 응답 헤더에 포함시켜 클라이언트에 전달.
createTaskReminder 및 createCalendarReminder:

클라이언트에서 Authorization 헤더를 통해 전달된 JWT에서 ID를 추출.
추출된 ID(TaskId 또는 CalendarId)를 기반으로 Reminder 생성.
------------------------------------------------------------
클라이언트 처리
클라이언트는 다음과 같은 흐름으로 작동해야 합니다:

Task/Calendar 생성:

/addTask 또는 /addCalendar를 호출하여 JWT를 응답 헤더에서 저장.
Reminder 생성:

저장된 JWT를 Authorization 헤더에 포함하여 /addTask 또는 /addCalendar를 호출.
 */