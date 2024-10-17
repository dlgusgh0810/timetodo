package org.timetodo.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId; // 카테고리 고유 ID (Primary Key)

    @ManyToOne // 여러 Category가 하나의 User와 연관 (N:1 관계)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private User userId; // 사용자 ID (Foreign Key)

    @Column(nullable = false, length = 50)
    private String categoryName; // 카테고리 이름

    @Column(nullable = false, length = 20)
    private String color; // 카테고리 색상

    @OneToMany(mappedBy = "category")
    private List<Calendar> calendars; // 카테고리에 속한 일정들 (1:N 관계)

    @OneToMany(mappedBy = "category")
    private List<Task> tasks; // 카테고리에 속한 할 일들 (1:N 관계)

    // Constructors, Getters and Setters
}
