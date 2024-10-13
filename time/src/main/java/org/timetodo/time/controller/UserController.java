package org.timetodo.time.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.entity.UserEntity;
import org.timetodo.time.service.UserService;
import org.timetodo.time.service.UserServiceImpl;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

//@Controller
@RestController
//@RequiredArgsConstructor //final로 할때
@RequestMapping("/api/users/registerInfo")
public class UserController {

//    private final UserService userService;

    @Autowired
    private UserService userService;

    @PostMapping("/user/registerInfo")
    public ResponseEntity<UserEntity> registerUser(@RequestBody RequestUserDto requestUserDto) {
        UserEntity newUser = new UserEntity(requestUserDto.getUsername(), requestUserDto.getPassword(), requestUserDto.getEmail(), null);
        UserEntity savedUser = userService.registerUser(newUser);
        return ResponseEntity.ok(savedUser);
    }
}

