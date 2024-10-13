package org.timetodo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;


@Entity
@Table(name = "task")
public class Task {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId; // Primary Key (기본 키)

    @NonNull
    @Setter
    @Getter
    @ManyToOne // 여러 Task가 하나의 User와 연관 (N:1 관계)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User userId; // Foreign Key (외래 키)

    @NonNull
    @Setter
    @Getter
    @Column(nullable = false, length = 100)
    private String title; // 할 일 제목

    @Setter
    @Getter
    @Column(columnDefinition = "TEXT")
    private String description; // 할 일 설명

    @NonNull
    @Setter
    @Getter
    @Column(nullable = false)
    private LocalDateTime dueDate; // 할 일 마감 기한

    @NonNull
    @Setter
    @Getter
    @Column(nullable = false, length = 10)
    private String priority; // 우선순위 (높음, 중간, 낮음)

    @NonNull
    @Setter
    @Getter
    @Column(nullable = false, length = 10)
    private String status; // 진행 상태 (진행 중, 완료, 미완료)

    @Setter
    @Getter
    @Column(nullable = true)
    private String repeatType; // 반복 일정 여부

    @Setter
    @Getter
    @ManyToOne // 여러 Task가 하나의 Category와 연관 (N:1 관계)
    @JoinColumn(name = "category_id", referencedColumnName = "category_id", nullable = true)
    private Category category; // Foreign Key (외래 키)

    // Constructors, Getters and Setters
    public Task() {};

    public Task(User userId, String title, String description, LocalDateTime dueDate, String priority, String status, String repeatType, Category category) {
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
        this.repeatType = repeatType;
        this.category = category;
    }
}
