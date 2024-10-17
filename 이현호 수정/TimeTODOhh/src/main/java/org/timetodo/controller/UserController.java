package org.timetodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.UserDTO;
import org.timetodo.model.User;
import org.timetodo.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        // DTO를 엔티티로 변환하여 사용자 생성
        User newUser = new User(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getEmail(),
                null // Preferences가 필요할 경우 추가 가능
        );

        // 서비스에서 사용자 저장
        userService.saveUser(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    // 추가 기능 필요 시 여기에 작성 (예: 로그인, 사용자 정보 조회 등)
}
