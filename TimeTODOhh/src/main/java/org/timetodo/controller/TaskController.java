package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.TaskDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.dto.TaskStatusUpdateDto;
import org.timetodo.entity.TaskEntity;
import org.timetodo.service.TaskService;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController // HTML 템플릿을 렌더링
@RequiredArgsConstructor // final 필드로 선언된 의존성(서비스)을 자동으로 주입하는 생성자를 생성해줍니다.
@RequestMapping("/api/task") // 이 컨트롤러의 모든 엔드포인트는 "/task" 경로로 시작됩니다.
public class TaskController {

    private final TaskService taskService; // TaskService를 주입받아 사용합니다.
    //private final JwtService jwtService;


    @PostMapping("/add")
    public ResponseEntity<?> addTask(
            @RequestBody TaskRequestDto taskRequestDto,
            HttpServletRequest request) {
        Long userId = null;

        try {
            // 쿠키에서 userId 가져오기
            Cookie[] cookies = request.getCookies();
            if (cookies == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("쿠키가 존재하지 않습니다.");
            }

            // userId 쿠키 검색
            Cookie userCookie = Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName().equals("userId"))
                    .findAny()
                    .orElse(null);

            if (userCookie == null || userCookie.getValue() == null || userCookie.getValue().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("userId 쿠키가 없거나 비어 있습니다.");
            }

            // userId 파싱
            try {
                userId = Long.valueOf(userCookie.getValue());
            } catch (NumberFormatException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("userId 쿠키 값이 올바르지 않습니다.");
            }

            log.info("세션에서 가져온 UserId : {}", userId);
        } catch (Exception e) {
            log.error("쿠키 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("쿠키 처리 중 오류가 발생했습니다.");
        }

        try {
            // Task 생성
            taskRequestDto.setUserId(userId);
            Long categoryId = taskRequestDto.getCategoryId(); // 카테고리 아이디 설정

            // TaskService를 통해 새로운 할 일 생성
            TaskDto task = taskService.addTask(taskRequestDto, userId, categoryId);

            log.info("생성된 Task: {}", task);

            // 성공적으로 생성된 TaskEntity를 반환
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            log.error("할 일 생성 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("할 일 생성 중 오류가 발생했습니다.");
        }
    }


    // 특정 user 의 모든 할 일을 조회하는 엔드포인트
    @GetMapping("/find")
    public List<TaskDto> getUserTasks(HttpServletRequest request) {
        try {
            Cookie[] cookies = request.getCookies();
            if (cookies == null) {
                throw new IllegalStateException("쿠키가 존재하지 않습니다.");
            }

            // userId 쿠키 찾기
            Cookie userCookie = Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName().equals("userId"))
                    .findAny()
                    .orElse(null);

            if (userCookie == null || userCookie.getValue() == null || userCookie.getValue().isEmpty()) {
                throw new IllegalStateException("userId 쿠키가 없거나 비어 있습니다.");
            }

            Long userId = Long.parseLong(userCookie.getValue());
            log.info("UserId from cookie: {}", userId);

            // TaskService를 통해 저장된 모든 할 일을 조회하고 반환
            return taskService.getTasksByUserId(userId);
        } catch (Exception e) {
            log.error("Error in getUserTasks:", e);
            throw new RuntimeException("할 일 조회 중 오류가 발생했습니다.");
        }
    }


    // 특정 할 일을 업데이트하는 엔드포인트
    @PutMapping("/update")
    public ResponseEntity<TaskEntity> updateTask(
            @RequestBody TaskRequestDto taskRequestDto,
            @RequestParam Long categoryId) {
        // 경로 변수로 전달된 id에 해당하는 할 일을 찾아,
        // 사용자가 보낸 데이터로 업데이트하고 그 결과를 반환합니다.
        TaskEntity updatedTask = taskService.updateTask(taskRequestDto, categoryId);
        return ResponseEntity.ok(updatedTask); // 성공 시 업데이트된 할 일을 반환
    }


    @PutMapping("/updateStatus")
    public ResponseEntity<TaskEntity> updateTaskStatus(@RequestBody TaskStatusUpdateDto taskStatusUpdateDto) {
        taskService.updateTaskStatus(taskStatusUpdateDto.getTaskId(), taskStatusUpdateDto.getStatus());
        return ResponseEntity.ok().build(); // 상태 업데이트 완료 후 OK 응답
    }

    // 특정 할 일을 삭제하는 엔드포인트
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        // 경로 변수로 전달된 id에 해당하는 할 일을 삭제합니다.
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build(); // 성공 시 응답 본문 없이 204 상태코드 반환
    }
}

/*
TaskController 흐름 요약
할 일 추가: POST /task/add → 사용자가 보낸 할 일을 추가.
모든 할 일 조회: GET /task/all → 모든 할 일을 조회하고 반환.
할 일 업데이트: PUT /task/update/{id} → 특정 할 일을 수정하고 업데이트.
할 일 삭제: DELETE /task/delete/{id} → 특정 할 일을 삭제.
*/