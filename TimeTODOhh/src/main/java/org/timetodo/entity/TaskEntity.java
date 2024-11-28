package org.timetodo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.timetodo.entity.UserEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity(name = "task_entity")
@NoArgsConstructor
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //@Column( unique = true, nullable = false)
    private Long taskId; //Primary Key (기본키)

    //    @Column(nullable = false, length = 100)
    @Column(nullable = false)
    private String title; // 할 일 제목

    @Column(nullable = false)
    private LocalDateTime dueDate; // 할 일 마감 기한

    //    @Column(nullable = false, length = 10)
    @Column(nullable = false)
    private String priority; // 우선순위 (높음, 중간, 낮음)

    //    @Column(nullable = false, length = 10)
    @Column(nullable = false)
    private String status; // 진행 상태 (진행 중, 완료, 미완료)

    @Column(nullable = true)
    private String repeatType; // 반복 일정 여부

    //@JoinColumn(name = "category_id")
    @ManyToOne // 여러 Task가 하나의 Category와 연관 (N:1 관계)
    private CategoryEntity categoryId;//categoryMTOtask; // Foreign Key (외래 키)

    //@JoinColumn(name = "user_id")
    @ManyToOne //여러 Task가 하나의 User와 연관 (N:1 관계)
    @JsonIgnore
    private UserEntity userId; //Foreign Key (외래 키)

    @OneToMany(mappedBy = "taskId")
    @JsonIgnore
    private List<ReminderEntity> reminderId;
}


