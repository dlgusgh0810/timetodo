package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.ReminderEntity;

import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<ReminderEntity,Long> {
    List<ReminderEntity> findRemindersByUserId(Long userId);
}
