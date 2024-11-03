package org.timetodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.UserDTO;
import org.timetodo.entity.UserEntity;
import org.timetodo.service.UserServiceImpl;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        // DTO를 엔티티로 변환하여 사용자 생성
        UserEntity newUserEntity = new UserEntity(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getEmail(),
                null // Preferences가 필요할 경우 추가 가능
        );

        // 서비스에서 사용자 저장
        userService.saveUser(newUserEntity);
        return ResponseEntity.ok("UserEntity registered successfully");
    }

    // 로그인 엔드포인트 추가
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO userDTO) {
        UserEntity authenticatedUser = userService.authenticateUser(userDTO.getUsername(), userDTO.getPassword());

        if (authenticatedUser != null) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    // 추가 기능 필요 시 여기에 작성 (예: 로그인, 사용자 정보 조회 등)
}
