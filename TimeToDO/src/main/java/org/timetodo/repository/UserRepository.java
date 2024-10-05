package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.timetodo.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자 이름으로 검색
    Optional<User> findByUsername(String username);

    // 사용자 이메일로 검색
    Optional<User> findByEmail(String email);
}
