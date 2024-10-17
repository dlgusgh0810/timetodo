package org.timetodo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.UserDTO;
import org.timetodo.model.User;
import org.timetodo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입 API
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO userDTO) {
        // DTO를 Entity로 변환
        User newUser = new User(userDTO.getUsername(), userDTO.getPassword(), userDTO.getEmail(), null);
        User savedUser = userService.registerUser(newUser);
        return ResponseEntity.ok(savedUser);
    }
}
