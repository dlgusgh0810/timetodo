package org.timetodo.controller;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.ReminderRequestDto;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.service.ReminderService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/reminder")
@RequiredArgsConstructor
public class ReminderController {

    private final ReminderService reminderService;

    private static final Logger log = LoggerFactory.getLogger(ReminderController.class);

    /**
     * 알림 생성 또는 업데이트
     * @param reminderRequestDto 알림 요청 데이터
     * @param request HttpServletRequest (사용자 식별용 쿠키 포함)
     * @return 생성된 알림 정보
     */
    @PostMapping("/add")
    public ResponseEntity<ReminderEntity> addReminder(
            @RequestBody ReminderRequestDto reminderRequestDto,
            HttpServletRequest request) {
        // 쿠키에서 userId 추출
        Long userId = extractUserIdFromCookies(request);
        log.info("알림 설정 요청: User ID = {}, Request DTO = {}", userId, reminderRequestDto);

        //알림 생성 또는 업데이트
        ReminderEntity reminder = reminderService.createOrUpdateReminder(userId, reminderRequestDto);
        return ResponseEntity.ok(reminder);
    }

    /**
     * 사용자에 대한 모든 알림 조회
     * @param request HttpServletRequest (사용자 식별용 쿠키 포함)
     * @return 알림 목록
     */
    @GetMapping
    public ResponseEntity<List<ReminderEntity>> getReminders(HttpServletRequest request) {
        Long userId = extractUserIdFromCookies(request);
        List<ReminderEntity> reminders = reminderService.getRemindersByUserId(userId);
        return ResponseEntity.ok(reminders);
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

    /**
     * 쿠키에서 사용자 ID 추출
     * @param request HttpServletRequest
     * @return 사용자 ID
     */
    private Long extractUserIdFromCookies(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("userId"))
                .findAny()
                .map(cookie -> Long.valueOf(cookie.getValue()))
                .orElseThrow(() -> new RuntimeException("User ID not found in cookies"));
    }
}
