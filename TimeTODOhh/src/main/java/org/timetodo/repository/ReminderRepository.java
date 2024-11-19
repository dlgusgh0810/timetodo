package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.TaskEntity;

import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderEntity,Long> {

    List<ReminderEntity> findByTaskId(Long task);
    List<ReminderEntity> findByCalendarId(Long calendar);

}
