package com.timetodo.entity;

import jakarta.persistence.*;



@Entity
public class Preferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean notificationsEnabled;
    private String theme;

    // Getters and Setters
}
