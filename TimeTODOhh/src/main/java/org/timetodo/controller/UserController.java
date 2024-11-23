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
<<<<<<< HEAD
        // DTO를 엔티티로 변환하여 사용자 생성
        /*UserEntity newUserEntity = new UserEntity(
                userDTO.getUserId(),
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getEmail()
        );

        // 서비스에서 사용자 저장
        userService.saveUser(newUserEntity);*/
=======
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)

        userService.registerUser(userDTO);// DTO를 서비스 계층에서 엔티티로 변환 및 저장
        return ResponseEntity.ok("UserEntity registered successfully");
    }

    // 로그인 엔드포인트 추가
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        UserEntity authenticatedUser = userService.authenticateUser(userDTO.getUsername(), userDTO.getPassword());
        //Cookie userId = new Cookie("userId", String.valueOf(authenticatedUser.getUserId()));
        //userId.setSecure(false); //오답
        //userId.setHttpOnly(true); //오답
        response.setHeader("Set-Cookie", "userId=" + authenticatedUser.getUserId() + "; Path=/; HttpOnly; SameSite=None; Secure"); //정답 : 포트번호가 달라져서 안보내질때 SameSite 사용!!
        log.info("쿠키에 저장한 UserId : {} ", authenticatedUser.getUserId());
        //response.addCookie(userId); //오답
//        if (authenticatedUser != null) {
//            session.setAttribute("userId", authenticatedUser.getUserId()); // 세션에 userId 저장
//            log.info("세션정보 userId : {}", session.getAttribute("userId")); //현재 세션정보 로그
            return ResponseEntity.ok("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화하여 모든 사용자 정보 삭제
        return ResponseEntity.ok("Logout successful");
    }

    // 추가 기능 필요 시 여기에 작성 (예: 로그인, 사용자 정보 조회 등)
}
