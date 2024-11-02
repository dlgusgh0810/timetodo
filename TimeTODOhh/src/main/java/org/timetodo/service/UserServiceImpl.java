package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.UserRepository;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    public void saveUser(UserEntity userEntity) {

        userRepository.save(userEntity);
    }

    @Override
    public UserEntity authenticateUser(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(user -> user.getPassword().equals(password)) // 평문 비교
                .orElse(null);  // 사용자 정보가 맞지 않으면 null 반환
    }

    // 추가 기능들: 사용자 검색, 삭제 등
}
