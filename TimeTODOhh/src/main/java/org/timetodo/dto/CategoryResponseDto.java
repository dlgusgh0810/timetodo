package org.timetodo.dto;


import lombok.Data;

@Data
public class CategoryResponseDto {
    private Long categoryId;
    private String categoryName;
    private String color;

    public CategoryResponseDto(Long categoryId, String categoryName, String color) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.color = color;
    }
}
