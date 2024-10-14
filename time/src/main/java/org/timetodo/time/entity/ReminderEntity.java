package org.timetodo.time.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity(name = "reminder")
@NoArgsConstructor
public class ReminderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column(name = "reminder_id", unique = true, nullable = false)
    private Long reminderId; // Primary Key (기본 키)

    @ManyToOne // 여러 Reminder가 하나의 Task와 연관 (N:1 관계)
    @JoinColumn(name = "task_id")
//    @JsonIgnore
    private TaskEntity task; // Foreign Key (외래 키)

    @ManyToOne // 여러 Reminder가  하나의 Calendar와 연관 (N:1 관계)
    @JoinColumn(name = "calender_id")
    private CalenderEntity calender; // Foreign Key (외래 키)

//    @Column(nullable = false)
    private int timeBefore; // 알림 시작 시간 (분 단위)

//    @Column(nullable = false)
    private boolean repeat; // 알림 반복 여부

}
