package com.timetodo.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String event;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Calendar와 User는 Many-to-One 관계
    // Getters, Setters, etc.
}
