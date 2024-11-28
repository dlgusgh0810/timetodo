package org.timetodo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.timetodo.entity.CategoryEntity;

import org.timetodo.entity.UserEntity;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    // UserEntity를 받아야 합니다.
    List<CategoryEntity> findByUserId(UserEntity user);

    // 특정 사용자와 카테고리 이름으로 조회
    CategoryEntity findByUserIdAndCategoryName(UserEntity user, String categoryName);

    // 특정 사용자와 카테고리 ID로 삭제
    void deleteByCategoryIdAndUserId(Long categoryId, UserEntity user);

}
