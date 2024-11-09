package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.CategoryEntity;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {

    // 제목, 설명, 카테고리 ID, 날짜로 일정 검색
    List<CalendarEntity> findByTitleContainingAndDescriptionContainingAndCategories_CategoryIdAndStartTime(
            String title, String description, Long categoryId, LocalDateTime startTime
    );

}
