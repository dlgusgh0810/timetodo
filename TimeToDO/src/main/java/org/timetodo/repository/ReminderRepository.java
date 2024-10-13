package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.model.Calendar;
import org.timetodo.model.Reminder;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

}
