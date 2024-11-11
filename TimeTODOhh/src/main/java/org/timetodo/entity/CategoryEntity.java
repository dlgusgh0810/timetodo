package org.timetodo.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.timetodo.entity.UserEntity;


import java.util.List;

@Entity(name = "category_entity")
@Data
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long categoryId;

    // 카테고리 이름 중복 방지를 위해 unique 제약 조건 추가
    @Column(nullable = false, unique = true)
    private String categoryName;

    // 카테고리 색상 (필수)
    @Column(nullable = false)
    private String color;

    // N:1 관계 설정 및 외래 키 명시
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity users;


    @OneToMany(mappedBy = "categories", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<CalendarEntity> calendar;

    @OneToMany(mappedBy = "categories", cascade = CascadeType.PERSIST, orphanRemoval = false)
    private List<TaskEntity> tasks;

}
