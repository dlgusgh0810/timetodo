package org.timetodo.time.service;

import org.timetodo.time.dto.RequestUserDto;
import org.timetodo.time.entity.UserEntity;

import java.util.List;

public interface UserService {

//    void createUser(RequestUserDto dto);

    void registerUser(RequestUserDto requestUserDto);
    List<RequestUserDto> findUser();
}
