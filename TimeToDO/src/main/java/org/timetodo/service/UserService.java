package org.timetodo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.model.User;
import org.timetodo.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 사용자 생성 (회원가입)
    public User registerUser(User user) {
        // 비밀번호 암호화, 데이터 검증 등의 로직을 추가 가능
        return userRepository.save(user);
    }

    // 사용자 이름으로 검색
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    /*// 모든 사용자 조회
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 사용자 생성
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // 사용자 업데이트
    public User updateUser(Long userId, User updatedUser) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setUsername(updatedUser.getUsername());
                    user.setEmail(updatedUser.getEmail());
                    return userRepository.save(user);
                }).orElse(null);
    }*/
}
