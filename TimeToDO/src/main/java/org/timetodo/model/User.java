package org.timetodo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    // Constructors, Getters and Setters
    @Setter
    @Getter
    @Id //기본 키임을 알려줌
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 전략 설정 (PK)
    @Column(name = "user_id") // 기본 키 컬럼 이름 설정
    private Long userId; // 사용자 고유 ID (Primary Key)

    @Setter
    @Getter
    @Column(nullable = false, unique = true, length = 50)
    private String username; // 사용자 이름

    @Setter
    @Getter
    @Column(nullable = false)
    private String password; // 사용자 비밀번호

    @Setter
    @Getter
    @Column(nullable = false, unique = true)
    private String email; // 사용자 이메일

    // 외래 키를 통한 Preferences와의 관계 설정
    @OneToOne(cascade = CascadeType.ALL) // 1:1 관계, 연결된 엔티티도 같이 저장/삭제
    @JoinColumn(name = "preferences_id", referencedColumnName = "preferences_id") // Preferences의 기본 키를 외래 키로 설정
    private Preferences preferences; // Foreign Key (외래 키)


}
