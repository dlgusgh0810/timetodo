package org.timetodo.service;

import org.timetodo.entity.UserEntity;
import org.timetodo.repository.UserRepository;

public interface UserService {

//    void saveUser(UserEntity userEntity);

    UserEntity authenticateUser(String username, String password);

}
