package org.timetodo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reminder")
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reminder_id")
    private Long reminderId; // Primary Key (기본 키)

    @ManyToOne // 여러 Reminder가 하나의 Task와 연관 (N:1 관계)
    @JoinColumn(name = "task_id", referencedColumnName = "task_id", nullable = false)
    private Task task; // Foreign Key (외래 키)

    @ManyToOne // 여러 Reminder가 하나의 Calendar와 연관 (N:1 관계)
    @JoinColumn(name = "calendar_id", referencedColumnName = "calendar_id", nullable = true)
    private Calendar calendar; // Foreign Key (외래 키)

    @Column(nullable = false)
    private int timeBefore; // 알림 시작 시간 (분 단위)

    @Column(nullable = false)
    private boolean repeat; // 알림 반복 여부

    // Constructors, Getters and Setters
}
