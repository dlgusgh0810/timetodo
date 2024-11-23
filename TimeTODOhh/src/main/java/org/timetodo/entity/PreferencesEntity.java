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

    @Column(nullable = false, length = 20)
    private String theme;

    //@JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    @OneToOne
    private UserEntity userEntity;
}
