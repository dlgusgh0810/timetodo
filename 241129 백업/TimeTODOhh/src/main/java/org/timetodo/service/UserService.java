package org.timetodo.service;

import org.timetodo.dto.UserDTO;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.UserRepository;

public interface UserService {

//    void saveUser(UserEntity userEntity);
    void registerUser(UserDTO userDTO);

    UserEntity authenticateUser(String username, String password);

}
