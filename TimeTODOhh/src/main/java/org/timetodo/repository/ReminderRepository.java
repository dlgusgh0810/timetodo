package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.TaskEntity;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderEntity,Long> {
<<<<<<< HEAD
=======
    List<ReminderEntity> findByTaskId(TaskEntity taskId);

    List<ReminderEntity> findByCalendarId(CalendarEntity calendarId);
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
}
