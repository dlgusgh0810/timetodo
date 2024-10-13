/*
package org.timetodo.time.controller;

import lombok.RequiredArgsConstructor;
import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.service.UserService;

@RestController
@RequiredArgsConstructor
public class testController {

    private final UserService userService;


    @PostMapping("/user")
    public String test2(@RequestBody RequestUserDto dto){
        userService.createUser(dto);
        return "success";
    }
}
*/
