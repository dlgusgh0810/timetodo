package org.timetodo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreferencesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long preferencesId; // 선호 설정의 고유 ID (Primary Key)

<<<<<<< HEAD
    @Column(nullable = false)
    private boolean notificationsEnabled; // 알림 설정 여부 (True/False)

//    @Column(nullable = false, length = 20)
    @Column(nullable = false)
    private String theme; // 사용자 테마 설정 (예: light, dark)

//    @Column(nullable = false, length = 50)
    @Column(nullable = false)
    private String viewFormat; // 일정/할일 보기 형식 (예: 일간, 주간, 월간)

    @OneToOne(mappedBy = "preferences") // User와의 양방향 관계 설정
    private UserEntity userEntity; // Foreign Key (외래 키) - UserEntity 클래스에서 참조
=======
    @Column(nullable = false, length = 20)
    private String theme;

    //@JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    @OneToOne
    private UserEntity userEntity;
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
}
