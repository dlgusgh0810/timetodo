package org.timetodo.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReminderInputDataDTO {

    private String selection; // 선택된 Task나 Calendar 항목
    private Map<String, Object> reminderDetails; // 알림 설정 세부 데이터

}
