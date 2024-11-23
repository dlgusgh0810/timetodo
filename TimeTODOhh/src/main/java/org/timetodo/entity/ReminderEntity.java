package org.timetodo.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "reminder_entity")
public class ReminderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "reminder_id", unique = true, nullable = false)
    private Long reminderId; // Primary Key (기본 키)

    private int timeBefore; // 알림 시작 시간 (분 단위)

    //@Column(nullable = false)
    private boolean repeats; // 알림 반복 여부

    @ManyToOne(fetch = FetchType.LAZY) // 여러 Reminder가 하나의 Task와 연관 (N:1 관계)
<<<<<<< HEAD
    private TaskEntity tasks;//taskMTOreminder; // Foreign Key (외래 키)

    @ManyToOne(fetch = FetchType.LAZY) // 여러 Reminder가  하나의 Calendar와 연관 (N:1 관계)
    private CalendarEntity calenders;//calendarMTOreminder; // Foreign Key (외래 키)
=======
    private TaskEntity taskId;//taskMTOreminder; // Foreign Key (외래 키)

    @ManyToOne(fetch = FetchType.LAZY) // 여러 Reminder가  하나의 Calendar와 연관 (N:1 관계)
    private CalendarEntity calendarId; //calendarMTOreminder; // Foreign Key (외래 키)


>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
}
