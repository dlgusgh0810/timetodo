package org.timetodo.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class CategoryRequestDto {
    @NotBlank(message = "카테고리 이름은 필수입니다.")
    private String categoryName;

    @NotBlank(message = "카테고리 색상은 필수입니다.")
    private String color;

    private Long categoryId; // 카테고리 ID (삭제 시 필요)

    private Long userId;
}
