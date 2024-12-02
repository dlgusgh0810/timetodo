package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {

    // 특정 사용자의 일정만 조회 (userId로 조회)


    // 제목, 설명, 카테고리 ID, 날짜로 일정 검색
    List<CalendarEntity> findByTitleContainingAndDescriptionContainingAndCategoryIdAndStartTime(
            String title, String description, CategoryEntity categoryId, LocalDateTime startTime
    );

    List<CalendarEntity> findByUserId(UserEntity user);
}
