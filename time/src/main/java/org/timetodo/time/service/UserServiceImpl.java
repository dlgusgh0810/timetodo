package org.timetodo.time.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.timetodo.time.entity.UserEntity;
import org.timetodo.time.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /*@Override
    public void createUser(RequestUserDto dto) {

        UserEntity userEntity = new UserEntity(dto);
        userRepository.save(userEntity);
    }*/

    @Override
    public UserEntity registerUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

}
