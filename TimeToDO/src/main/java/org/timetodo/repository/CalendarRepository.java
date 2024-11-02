package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.timetodo.model.Calendar;

import java.util.List;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {

    // 특정 사용자 ID로 모든 일정 조회
    List<Calendar> findAllByUserId(String userId);
}
