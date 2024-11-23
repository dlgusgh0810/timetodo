package org.timetodo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity(name = "calendar_entity")
@NoArgsConstructor
@AllArgsConstructor
public class CalendarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "calendar_id", unique = true, nullable = false)
    private Long calendarId; // 캘린더 고유 ID (Primary Key)

    //@Column(nullable = false, length = 100)
    @Column(nullable = false)
    private String title; // 일정 제목

    //@Column(columnDefinition = "TEXT")
    private String description; // 일정 설명

    @Column(nullable = false)
    private LocalDateTime startTime; // 일정 시작 시간

    @Column(nullable = false)
    private LocalDateTime endTime; // 일정 종료 시간

    //@Column(nullable = false, length = 100)
    @Column(nullable = false)
    private String location; // 일정 장소

    //@Column(nullable = true)
    private String repeatType; // 반복 일정 유형 (예: daily, weekly)

    //@JoinColumn(name = "category_id" )
    @ManyToOne // 여러 Calendar가 하나의 Category와 연관 (N:1 관계)
    private CategoryEntity categories;//categoryMTOcalendar; // Foreign Key (외래 키) - Category 클래스와 연관

//    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER) // 여러 Calendar가 하나의 User와 연관 (N:1 관계)
    @JsonIgnore
    private UserEntity users;//userMTOcalendar; // 사용자 ID (Foreign Key)

//<<<<<<< HEAD
//    @OneToMany(mappedBy = "calenders")
//=======
//    @OneToMany(mappedBy = "calendarId")
//>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
//    @JsonIgnore
//    private List<ReminderEntity> reminders;
}
