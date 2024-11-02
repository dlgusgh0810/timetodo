package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.UserEntity;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    // 필요한 경우 커스텀 쿼리 메소드 추가 가능

    // 사용자 이름으로 검색
    Optional<org.timetodo.entity.UserEntity> findByUsername(String username);

}
