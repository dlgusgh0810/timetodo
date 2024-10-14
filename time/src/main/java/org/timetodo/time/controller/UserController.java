package org.timetodo.time.controller;

import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.entity.UserEntity;
import org.timetodo.time.service.UserService;
import org.timetodo.time.service.UserServiceImpl;

import java.util.List;

//@RestController
@Controller
@RequiredArgsConstructor //final로 할때
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/register")
    public String registerUser() {
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute RequestUserDto requestUserDto) {
        System.out.println("requestUserDto: " + requestUserDto);
        userService.registerUser(requestUserDto);
        return "index";
    }

    @GetMapping("/registerInfo")
    public String registerInfo(Model model){
        //DB에서 회원 데이터를 가져와서 registerInfo.html에 보여준다
        List<RequestUserDto> requestUserDtoList = userService.findUser();
        model.addAttribute("requestUserDtoList", requestUserDtoList);
        return "registerInfo";
    }

    /*@PostMapping("/register")
    public ResponseEntity<UserEntity> registerUser(@RequestBody RequestUserDto requestUserDto) {
        UserEntity newUser = new UserEntity(requestUserDto.getUsername(), requestUserDto.getPassword(), requestUserDto.getEmail(), null);
        UserEntity savedUser = userService.registerUser(newUser);
        return ResponseEntity.ok(savedUser);
    }*/

//    @PostMapping("/register")
//    public String registerUser(RequestUserDto requestUserDto) {
//        System.out.println("Registering user: " + requestUserDto);
//        return "registerInfo";
//    }
}

