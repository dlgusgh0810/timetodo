package org.timetodo.time.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name = "category_entity")
@Data
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "category_id", unique = true, nullable = false)
    private Long categoryId;

//    @Column(nullable = false, length = 50)
    @Column(nullable = false)
    private String categoryName;

//    @Column(nullable = false, length = 20)
    @Column(nullable = false)
    private String color;

//    @ManyToOne //여러 Category가 하나의 User와 연관 (N:1 관계)
    @ManyToOne
    //@JoinColumn(name = "user_id")
    private UserEntity users; //사용자 ID (Foreign Key)

    @OneToMany(mappedBy = "categories")
    private List<CalendarEntity> calendar;

    @OneToMany(mappedBy = "categories")
    private List<TaskEntity> tasks;
}
