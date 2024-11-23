package org.timetodo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.CategoryRequestDto;
import org.timetodo.dto.CategoryResponseDto;
import org.timetodo.entity.UserEntity;
import org.timetodo.service.CategoryService;

import java.util.List;

@RestController
@RequiredArgsConstructor

@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    // 카테고리 추가
    @PostMapping("/add")
    public ResponseEntity<String> addCategory(@RequestBody CategoryRequestDto categoryDto,
                                              @RequestParam Long userId) {
        categoryService.createCategory(categoryDto, userId);
        return ResponseEntity.ok("카테고리 생성 성공");
    }

    // 특정 사용자의 모든 카테고리 조회
    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories(@RequestParam Long userId) {
        List<CategoryResponseDto> categories = categoryService.getCategoriesByUser(userId);
        return ResponseEntity.ok(categories);
    }

    // 특정 카테고리 업데이트
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable Long id,
                                                              @RequestBody CategoryRequestDto categoryDto,
                                                              @RequestParam Long userId) {
        CategoryResponseDto updatedCategory = categoryService.updateCategory(id, categoryDto, userId);
        return ResponseEntity.ok(updatedCategory);
    }

    // 특정 카테고리 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id, @RequestParam Long userId) {
        categoryService.deleteCategoryById(userId, id);
        return ResponseEntity.ok("카테고리 삭제 성공");
    }

    // 카테고리 이름으로 검색
    @GetMapping("/search")
    public ResponseEntity<CategoryResponseDto> searchCategoryByName(@RequestParam String categoryName,
                                                                    @RequestParam Long userId) {
        CategoryResponseDto category = categoryService.getCategoryByName(userId, categoryName);
        return ResponseEntity.ok(category);
    }
}