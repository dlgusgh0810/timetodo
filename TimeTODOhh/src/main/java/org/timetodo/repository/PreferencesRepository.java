package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.PreferencesEntity;

@Repository
public interface PreferencesRepository extends JpaRepository<PreferencesEntity,Long> {
}
