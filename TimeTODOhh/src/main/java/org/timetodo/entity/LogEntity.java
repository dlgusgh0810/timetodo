package org.timetodo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity(name = "log")
@NoArgsConstructor
@AllArgsConstructor
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String inputText;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String openaiResponse;

    @Column(columnDefinition = "TEXT")
    private String processedResult;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
