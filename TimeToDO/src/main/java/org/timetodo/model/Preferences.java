package org.timetodo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "preferences") // 데이터베이스의 preferences 테이블과 매핑
public class Preferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 생성 전략 설정
    @Column(name = "preferences_id")
    private Long preferencesId; // 선호 설정의 고유 ID (Primary Key)

    @OneToOne(mappedBy = "preferences") // User와의 양방향 관계 설정
    private User userId; // Foreign Key (외래 키) - User 클래스에서 참조

    @Column(nullable = false)
    private boolean notificationsEnabled; // 알림 설정 여부 (True/False)

    @Column(nullable = false, length = 20)
    private String theme; // 사용자 테마 설정 (예: light, dark)

    @Column(nullable = false, length = 50)
    private String viewFormat; // 일정/할일 보기 형식 (예: 일간, 주간, 월간)

    // 기본 생성자
    public Preferences() {}

    // 파라미터를 받는 생성자
    public Preferences(boolean notificationsEnabled, String theme, String viewFormat) {
        this.notificationsEnabled = notificationsEnabled;
        this.theme = theme;
        this.viewFormat = viewFormat;
    }

    // Getter 및 Setter 메서드
    public Long getPreferencesId() {
        return preferencesId;
    }

    public void setPreferencesId(Long preferencesId) {
        this.preferencesId = preferencesId;
    }

    public boolean isNotificationsEnabled() {
        return notificationsEnabled;
    }

    public void setNotificationsEnabled(boolean notificationsEnabled) {
        this.notificationsEnabled = notificationsEnabled;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getViewFormat() {
        return viewFormat;
    }

    public void setViewFormat(String viewFormat) {
        this.viewFormat = viewFormat;
    }
}
