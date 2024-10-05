package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.timetodo.model.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // 특정 사용자 ID로 모든 할 일 조회
    List<Task> findAllByUserId(String userId);

    // 특정 카테고리 ID로 모든 할 일 조회
    List<Task> findAllByCategoryId(Long categoryId);
}
