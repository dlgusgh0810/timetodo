package org.timetodo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreferencesDTO {
    private Long preferencesId; // 사용자 설정 ID
    private String theme;       // 사용자 테마 (예: "light", "dark")
    private Long userId;        // 사용자 ID (UserEntity와의 관계를 ID로 표현)
}