package com.timetodo.entity;

import jakarta.persistence.*;

import java.util.List;      // List 임포트

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "preferences_id", referencedColumnName = "id")
    private Preferences preferences;  // 이 Preferences는 직접 정의한 엔티티로 수정해야 합니다.

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;  // 이 Task도 직접 정의한 엔티티로 수정해야 합니다.

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calendar> calendars;  // 이 Calendar도 직접 정의한 엔티티로 수정해야 합니다.

    // Getters and Setters
}
