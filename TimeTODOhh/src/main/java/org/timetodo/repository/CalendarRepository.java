package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CalendarEntity;

@Repository
public interface CalendarRepository extends JpaRepository<CalendarEntity, Long> {
}
