package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
//import org.timetodo.JWT.JwtService;
import org.timetodo.dto.TaskDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.TaskEntity;
import org.timetodo.service.TaskService;

import java.util.Arrays;
import java.util.List;

@Slf4j
@Controller // HTML 템플릿을 렌더링
@RequiredArgsConstructor // final 필드로 선언된 의존성(서비스)을 자동으로 주입하는 생성자를 생성해줍니다.
@RequestMapping("/api/task") // 이 컨트롤러의 모든 엔드포인트는 "/task" 경로로 시작됩니다.
public class TaskController {

    private final TaskService taskService; // TaskService를 주입받아 사용합니다.
    //private final JwtService jwtService;


    // 새로운 할 일을 추가하는 엔드포인트
    @PostMapping("/add")
    public ResponseEntity<String> addTask(
            @RequestBody TaskRequestDto taskRequestDto,
            HttpServletRequest request,
            HttpServletResponse response) {
        // 사용자가 보낸 할 일 데이터를 TaskService로 넘겨 새로운 할 일을 추가하고,
        // 그 결과를 응답으로 반환합니다.
        Long userId = 0L;
        try {
            Cookie userCookie = Arrays.stream(request.getCookies())
                    .filter(cookie -> cookie.getName().equals("userId"))
                    .findAny()
                    .orElse(null);
            userId = Long.valueOf(userCookie.getValue());
            log.info("세션에서 가져온 UserId : {}", userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Task 생성
        taskRequestDto.setUserId(userId);
        TaskDto task = taskService.addTask(taskRequestDto, userId);

       /* // JWT 생성
        String token = jwtService.createToken("taskId", task.getTaskId());

        // 클라이언트로 JWT 응답
        response.setHeader("Authorization", "Bearer " + token);*/

        return ResponseEntity.ok("할 일 생성 성공");


    }

    // 특정 user 의 모든 할 일을 조회하는 엔드포인트
    @GetMapping("/find")
    public List<TaskEntity> getUserTasks(HttpServletRequest request) {
        Long userId = 0L;
        Cookie userCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("userId"))
                .findAny()
                .orElse(null);
        userId = Long.valueOf(userCookie.getValue());
        // TaskService를 통해 저장된 모든 할 일을 조회하고,
        // 그 결과를 응답으로 반환합니다.
        return taskService.getTasksByUserId(userId); // 성공 시 할 일 목록을 반환
    }

    // 특정 할 일을 업데이트하는 엔드포인트
    @PutMapping("/update/{id}")
    public ResponseEntity<TaskEntity> updateTask(@PathVariable Long id, @RequestBody TaskRequestDto taskRequestDto) {
        // 경로 변수로 전달된 id에 해당하는 할 일을 찾아,
        // 사용자가 보낸 데이터로 업데이트하고 그 결과를 반환합니다.
        TaskEntity updatedTask = taskService.updateTask(id, taskRequestDto);
        return ResponseEntity.ok(updatedTask); // 성공 시 업데이트된 할 일을 반환
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