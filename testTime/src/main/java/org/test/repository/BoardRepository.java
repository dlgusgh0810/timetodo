package org.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.test.entity.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity,Long> {
}
