package org.timetodo.service;

import org.timetodo.entity.UserEntity;

public interface UserService {

    void saveUser(UserEntity userEntity);

    UserEntity authenticateUser(String username, String password);

}
