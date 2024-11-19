package org.timetodo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "reminder_entity")
public class ReminderEntity {

    //@Column(name = "reminder_id", unique = true, nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reminderId; // Primary Key (기본 키)

    @Column(nullable = false)
    private boolean notificationsEnabled; // 알림 설정 여부 (True/False)

    private int timeBefore; // 알림 시작 시간 (분 단위)

    //@Column(nullable = false)
    private boolean repeats; // 알림 반복 여부

    @ManyToOne(fetch = FetchType.LAZY) // 여러 Reminder가 하나의 Task와 연관 (N:1 관계)
    private TaskEntity taskId;//taskMTOreminder; // Foreign Key (외래 키)

    @ManyToOne(fetch = FetchType.LAZY) // 여러 Reminder가  하나의 Calendar와 연관 (N:1 관계)
    private CalendarEntity calenderId; //calendarMTOreminder; // Foreign Key (외래 키)


}
