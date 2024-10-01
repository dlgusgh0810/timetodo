package com.timetodo.entity;
import java.util.List;
import jakarta.persistence.*;
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Calendar> calendars;

    // Getters, Setters, etc.
}