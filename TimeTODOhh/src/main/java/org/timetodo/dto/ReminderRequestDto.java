package org.timetodo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReminderRequestDto {

    private Long reminderId; // Primary Key (기본 키)

    private boolean notificationsEnabled; // 알림 설정 여부 (True/False)

    private int timeBefore; // 알림 시작 시간 (분 단위)

    private boolean repeats; // 알림 반복 여부

    private Long taskId;

    private Long calendarId;

}
