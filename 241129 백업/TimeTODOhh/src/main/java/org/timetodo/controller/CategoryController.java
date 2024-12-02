package org.timetodo.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.timetodo.dto.CategoryRequestDto;
import org.timetodo.dto.CategoryResponseDto;
import org.timetodo.service.CategoryService;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    private Long getUserIdFromCookies(HttpServletRequest request) {
        Cookie userCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "userId".equals(cookie.getName()))
                .findAny()
                .orElse(null);
        if (userCookie == null) {
            throw new IllegalStateException("로그인되지 않은 사용자입니다.");
        }
        return Long.valueOf(userCookie.getValue());
    }

    // 카테고리 추가
    @PostMapping("/add")
    public ResponseEntity<String> addCategory(@RequestBody CategoryRequestDto categoryDto, HttpServletRequest request) {
        Long userId = getUserIdFromCookies(request);
        categoryService.createCategory(categoryDto, userId);
        return ResponseEntity.ok("카테고리 생성 성공");
    }

    // 특정 사용자의 모든 카테고리 조회
    @GetMapping("/all")
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories(HttpServletRequest request) {
        Long userId = getUserIdFromCookies(request);
        List<CategoryResponseDto> categories = categoryService.getCategoriesByUser(userId);
        return ResponseEntity.ok(categories);
    }

    // 특정 카테고리 업데이트
    @PutMapping("/update/{id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(@PathVariable Long id,
                                                              @RequestBody CategoryRequestDto categoryDto,
                                                              HttpServletRequest request) {
        Long userId = getUserIdFromCookies(request);
        CategoryResponseDto updatedCategory = categoryService.updateCategory(id, categoryDto, userId);
        return ResponseEntity.ok(updatedCategory);
    }

    // 특정 카테고리 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id, HttpServletRequest request) {
        Long userId = getUserIdFromCookies(request);
        categoryService.deleteCategoryById(userId, id);
        return ResponseEntity.ok("카테고리 삭제 성공");
    }

    // 카테고리 이름으로 검색
    @GetMapping("/search")
    public ResponseEntity<CategoryResponseDto> searchCategoryByName(@RequestParam String categoryName,
                                                                    HttpServletRequest request) {
        Long userId = getUserIdFromCookies(request);
        CategoryResponseDto category = categoryService.getCategoryByName(userId, categoryName);
        return ResponseEntity.ok(category);
    }
}
