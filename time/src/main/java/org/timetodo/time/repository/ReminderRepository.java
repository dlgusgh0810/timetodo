package org.timetodo.time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.time.entity.ReminderEntity;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderEntity,Long> {
}
