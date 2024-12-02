package org.timetodo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CalendarRequestDto {
    private Long calendarId;          // 캘린더 고유 ID
    private String title;             // 일정 제목
    private String description;       // 일정 설명
    private LocalDateTime startTime;  // 일정 시작 시간

    @JsonProperty("end_time") // OpenAI JSON 키와 매핑
    private LocalDateTime endTime;    // 일정 종료 시간

    private String location;          // 일정 장소
    private String repeatType;        // 반복 일정 유형 (예: daily, weekly)

    private Long categoryId;          // Category의 ID (Foreign Key 대신 ID 참조)
    private Long userId;              // User의 ID (Foreign Key 대신 ID 참조)

    private List<Long> reminderId;   // Reminder 엔티티의 ID 리스트
}

/*
CalendarRequestDto: 클라이언트 → 서버 (요청 데이터 전달)
CalendarDTO: 서버 → 클라이언트 (응답 데이터 전달)
*/