package org.timetodo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    private String title;
    private LocalDateTime dueDate;
    private String priority; // 높음, 중간, 낮음
    private String status; // 진행 중, 완료, 미완료
    private String repeatType; // 반복 일정 여부
    private Long categoryId; // Category와의 관계
    private Long userId; // User와의 관계
}