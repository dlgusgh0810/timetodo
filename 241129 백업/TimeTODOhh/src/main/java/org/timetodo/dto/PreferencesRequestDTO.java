package org.timetodo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreferencesRequestDTO {
    private String theme;  // 사용자 테마 (예: "light", "dark")
}
