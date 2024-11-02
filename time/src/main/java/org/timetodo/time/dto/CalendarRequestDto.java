package org.timetodo.time.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequestDto {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String repeatType; // daily, weekly 등 반복 유형
    private Long categoryId; // Category와의 관계
    private Long userId; // User와의 관계
}
