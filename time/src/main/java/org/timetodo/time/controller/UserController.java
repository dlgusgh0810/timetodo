package org.timetodo.time.controller;

import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.service.UserService;

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

}

