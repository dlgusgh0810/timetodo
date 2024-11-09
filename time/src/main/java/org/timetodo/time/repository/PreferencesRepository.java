package org.timetodo.time.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.time.entity.PreferencesEntity;

@Repository
public interface PreferencesRepository extends JpaRepository<PreferencesEntity,Long> {
}
