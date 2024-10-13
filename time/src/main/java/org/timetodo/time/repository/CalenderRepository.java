package org.timetodo.time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.time.entity.CalenderEntity;

@Repository
public interface CalenderRepository extends JpaRepository<CalenderEntity, Long> {
}
