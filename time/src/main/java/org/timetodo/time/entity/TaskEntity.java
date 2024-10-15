package org.timetodo.time.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity(name = "taskEntity")
@NoArgsConstructor
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", unique = true, nullable = false)
    private Long taskId; //Primary Key (기본키)

//    @Column(nullable = false, length = 100)
    private String title; // 할 일 제목

//    @Column(nullable = false)
    private LocalDateTime dueDate;
//    @Column(nullable = false) // 할 일 마    감 기한

    //    @Column(nullable = false, length = 10)
    private String priority; // 우선순위 (높음, 중간, 낮음)

    //    @Column(nullable = false, length = 10)
    private String status; // 진행 상태 (진행 중, 완료, 미완료)

    //    @Column(nullable = true)
    private String repeatType; // 반복 일정 여부

    @ManyToOne //여러 Task가 하나의 User와 연관 (N:1 관계)
    @JoinColumn(name = "user_id")
    private UserEntity userMTOtask; //Foreign Key (외래 키)

    @ManyToOne // 여러 Task가 하나의 Category와 연관 (N:1 관계)
    @JoinColumn(name = "category_id")
    private CategoryEntity categoryMTOtask; // Foreign Key (외래 키)

    @OneToMany(mappedBy = "taskMTOreminder")
    private List<ReminderEntity> reminders;
}


