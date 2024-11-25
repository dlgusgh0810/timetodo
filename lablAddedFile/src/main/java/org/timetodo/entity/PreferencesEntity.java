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
    private Long preferencesId;

    @Column(nullable = false, length = 20)
    private String theme;

    @OneToOne
    //@JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private UserEntity userEntity;
}
