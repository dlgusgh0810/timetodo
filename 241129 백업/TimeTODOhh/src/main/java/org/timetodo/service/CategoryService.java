package org.timetodo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.CategoryRequestDto;
import org.timetodo.dto.CategoryResponseDto;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.CategoryRepository;
import org.timetodo.repository.UserRepository;

import java.util.List;
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    // 카테고리 생성
    public void createCategory(CategoryRequestDto categoryDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        CategoryEntity category = new CategoryEntity();
        category.setCategoryName(categoryDto.getCategoryName());
        category.setColor(categoryDto.getColor());
        category.setUsers(user);
        categoryRepository.save(category);
    }

    // 특정 사용자에 대한 카테고리 목록 조회
    public List<CategoryResponseDto> getCategoriesByUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        List<CategoryEntity> categories = categoryRepository.findByUsers(user);
        return categories.stream()
                .map(category -> new CategoryResponseDto(
                        category.getCategoryId(),
                        category.getCategoryName(),
                        category.getColor()
                ))
                .toList();
    }

    // 카테고리 업데이트
    public CategoryResponseDto updateCategory(Long id, CategoryRequestDto categoryDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        CategoryEntity category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

       

        category.setCategoryName(categoryDto.getCategoryName());
        category.setColor(categoryDto.getColor());
        categoryRepository.save(category);
        return new CategoryResponseDto(category.getCategoryId(), category.getCategoryName(), category.getColor());
    }

    public void deleteCategoryById(Long userId, Long categoryId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        // 카테고리 조회
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

        // 카테고리 삭제
        categoryRepository.delete(category);
    }

    public CategoryResponseDto getCategoryByName(Long userId, String categoryName) {
        // 사용자 조회
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        // 사용자와 카테고리 이름으로 카테고리 조회
        CategoryEntity category = categoryRepository.findByUsersAndCategoryName(user, categoryName);
        if (category == null) {
            throw new RuntimeException("해당 이름의 카테고리를 찾을 수 없습니다.");
        }

        // CategoryResponseDto로 변환하여 반환
        return new CategoryResponseDto(
                category.getCategoryId(),
                category.getCategoryName(),
                category.getColor()
        );
    }

}
