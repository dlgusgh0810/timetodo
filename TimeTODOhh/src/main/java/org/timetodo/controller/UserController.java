package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.UserDTO;
import org.timetodo.entity.UserEntity;
import org.timetodo.entity.TaskEntity;
import org.timetodo.repository.TaskRepository;
import org.timetodo.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.http.HttpSession;


@Slf4j
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceImpl userService;


    @Autowired
    public UserController(UserServiceImpl userService, TaskRepository taskRepository) {
        this.userService = userService;

    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        userService.registerUser(userDTO);// DTO를 서비스 계층에서 엔티티로 변환 및 저장
        return ResponseEntity.ok("UserEntity registered successfully");
    }

    // 로그인 엔드포인트 추가
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO userDTO, HttpServletResponse response) {

        UserEntity authenticatedUser = userService.authenticateUser(userDTO.getUsername(), userDTO.getPassword());

        response.setHeader("Set-Cookie", "userId=" + authenticatedUser.getUserId() + "; Path=/; HttpOnly; SameSite=None; Secure"); //정답 : 포트번호가 달라져서 안보내질때 SameSite 사용!!
        log.info("쿠키에 저장한 UserId : {} ", authenticatedUser.getUserId());

            return ResponseEntity.ok("Login successful");

    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화하여 모든 사용자 정보 삭제
        return ResponseEntity.ok("Logout successful");
    }

    // 추가 기능 필요 시 여기에 작성 (예: 로그인, 사용자 정보 조회 등)
}
