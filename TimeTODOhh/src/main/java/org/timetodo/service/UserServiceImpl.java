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

    // 추가 기능들: 사용자 검색, 삭제 등
}
