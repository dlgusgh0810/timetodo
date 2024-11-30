package org.timetodo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    private Long taskId;               // 할 일 고유 ID
    private String title;              // 할 일 제목
    private LocalDateTime dueDate;     // 할 일 마감 기한
    private String priority;           // 우선순위 (높음, 중간, 낮음)
    private String status;             // 진행 상태 (진행 중, 완료, 미완료)
    private String repeatType;         // 반복 일정 유형

    private Long userId;               // UserEntity의 ID (외래 키 대신 ID 참조)
    private Long categoryId;           // CategoryEntity의 ID (외래 키 대신 ID 참조)
    private List<Long> reminderIds;    // ReminderEntity의 ID 리스트
}