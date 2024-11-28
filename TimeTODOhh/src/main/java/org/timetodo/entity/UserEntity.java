package org.timetodo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Table(name = "user_entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    // Constructors, Getters and Setters
    @Column(name = "user_id") // 기본 키 컬럼 이름 설정
    @Id //기본 키임을 알려줌
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 설정 (PK)
    private Long userId; // 사용자 고유 ID (Primary Key)

    @Column(nullable = false, unique = true, length = 50)
    private String username; // 사용자 이름

    @Column(nullable = false)
    private String password; // 사용자 비밀번호

    @Column(nullable = false, unique = true)
    private String email; // 사용자 이메일

    //@JoinColumn(name = "preferences_id") // Preferences의 기본 키를 외래 키로 설정
    @OneToOne // 1:1 관계, 연결된 엔티티도 같이 저장/삭제
    private PreferencesEntity preferences; // Foreign Key (외래 키)

    @OneToMany(mappedBy = "userId")
    @ToString.Exclude
    private List<TaskEntity> tasks;

    @OneToMany(mappedBy = "userId")
    @ToString.Exclude
    private List<CategoryEntity> categories;

    @OneToMany(mappedBy = "userId")
    @ToString.Exclude // Lombok 사용 시 순환 참조 방지
    private List<CalendarEntity> calendars;
}
