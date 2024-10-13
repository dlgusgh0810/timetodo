package org.timetodo.time.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity(name = "calenders")
@NoArgsConstructor
public class CalenderEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendarId", unique = true, nullable = false)
    private Long calendarId; // 캘린더 고유 ID (Primary Key)

    @ManyToOne // 여러 Calendar가 하나의 User와 연관 (N:1 관계)
    @JoinColumn(name = "userId")
    private UserEntity user; // 사용자 ID (Foreign Key)

    //@Column(nullable = false, length = 100)
    private String title; // 일정 제목

    //@Column(columnDefinition = "TEXT")
    private String description; // 일정 설명

    //@Column(nullable = false)
    private LocalDateTime startTime; // 일정 시작 시간

    //@Column(nullable = false)
    private LocalDateTime endTime; // 일정 종료 시간

    //@Column(nullable = false, length = 100)
    private String location; // 일정 장소

    //@Column(nullable = true)
    private String repeatType; // 반복 일정 유형 (예: daily, weekly)

    @ManyToOne // 여러 Calendar가 하나의 Category와 연관 (N:1 관계)
    @JoinColumn(name = "categoryId" )
    private CategoryEntity category; // Foreign Key (외래 키) - Category 클래스와 연관


}
