package org.timetodo.time.service;

import org.timetodo.time.entity.UserEntity;

public interface UserService {

//    void createUser(RequestUserDto dto);

    UserEntity registerUser(UserEntity user);
    UserEntity getUserByUsername(String username);
}
