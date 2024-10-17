package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 필요한 경우 커스텀 쿼리 메소드 추가 가능
}
