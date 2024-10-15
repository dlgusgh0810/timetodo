package org.timetodo.time.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "categoryEntity")
@Data
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", unique = true, nullable = false)
    private Long categoryId;

//    @Column(nullable = false, length = 50)
    private String categoryName;

//    @Column(nullable = false, length = 20)
    private String color;

//    @ManyToOne //여러 Category가 하나의 User와 연관 (N:1 관계)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userMTOcatecory; //사용자 ID (Foreign Key)

    @OneToMany(mappedBy = "categoryMTOcalender")
    private List<CalenderEntity> calender;

    @OneToMany(mappedBy = "categoryMTOtask")
    private List<TaskEntity> tasks;
}
