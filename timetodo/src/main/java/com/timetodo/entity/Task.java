package com.timetodo.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Date dueDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;  // Task는 User와 N:1 관계입니다.

    @OneToOne(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private Reminder reminder;  // Task와 Reminder는 1:1 관계

    // 만약 카테고리가 필요하다면 추가
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;  // Task는 Category와 N:1 관계입니다.

    // Getters와 Setters
}