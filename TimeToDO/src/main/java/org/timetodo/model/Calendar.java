package org.timetodo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity(name = "calender")
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "calendar_id")
    private Long calendarId; // 캘린더 고유 ID (Primary Key)

    @NonNull
    @ManyToOne // 여러 Calendar가 하나의 User와 연관 (N:1 관계)
    //@JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User userId; // 사용자 ID (Foreign Key)

    @NonNull
    @Column(nullable = false, length = 100)
    private String title; // 일정 제목

    @Column(columnDefinition = "TEXT")
    private String description; // 일정 설명

    @NonNull
    @Column(nullable = false)
    private LocalDateTime startTime; // 일정 시작 시간

    @NonNull
    @Column(nullable = false)
    private LocalDateTime endTime; // 일정 종료 시간

    @NonNull
    @Column(nullable = false, length = 100)
    private String location; // 일정 장소

    @Column(nullable = true)
    private String repeatType; // 반복 일정 유형 (예: daily, weekly)

    @ManyToOne // 여러 Calendar가 하나의 Category와 연관 (N:1 관계)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = true)
    private Category category; // Foreign Key (외래 키) - Category 클래스와 연관


    // Constructors, Getters and Setters
    public Calendar() {};

    public Calendar(User userId, String title, String description) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.startTime = LocalDateTime.now();
        this.endTime = LocalDateTime.now();
        this.location = location;
        this.repeatType = "";
        this.category = null;
    }
}
