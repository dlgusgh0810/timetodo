package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CategoryEntity;


@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
}
