package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.ReminderEntity;

import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderEntity,Long> {

    @Query("SELECT r FROM reminder_entity r WHERE r.taskId.taskId = :taskId")
    List<ReminderEntity> findByTaskId(@Param("taskId") Long taskId);

    @Query("SELECT r FROM reminder_entity r WHERE r.calenderId.calendarId = :calendarId")
    List<ReminderEntity> findByCalendarId(Long calendar);

}
