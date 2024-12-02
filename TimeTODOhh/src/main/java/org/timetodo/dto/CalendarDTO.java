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
public class CalendarDTO {
    private Long calendarId;        // 일정 ID
    private String title;           // 일정 제목
    private String description;     // 일정 설명
    private LocalDateTime startTime; // 일정 시작 시간

    @JsonProperty("end_time") // OpenAI JSON 키와 매핑
    private LocalDateTime endTime;   // 일정 종료 시간

    private String location;        // 일정 장소
    private String repeatType;      // 반복 일정 유형 (예: daily, weekly)

    private Long userId;            // 사용자 ID (UserEntity와의 관계를 ID로 표현)
    private Long categoryId;        // 카테고리 ID (CategoryEntity와의 관계를 ID로 표현)

    private List<Long> reminderIds; // Reminder 엔티티 ID 리스트 (연관된 리마인더 ID 리스트)
}

/*
CalendarRequestDto: 클라이언트 → 서버 (요청 데이터 전달)
CalendarDTO: 서버 → 클라이언트 (응답 데이터 전달)
*/
