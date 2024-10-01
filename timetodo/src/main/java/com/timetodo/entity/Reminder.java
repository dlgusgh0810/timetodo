package com.timetodo.entity;
import jakarta.persistence.*;
@Entity // Reminder 클래스가 데이터베이스 테이블과 매핑됨
public class Reminder {

    @Id // 기본 키 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동으로 값이 증가하는 기본 키
    private Long id;

    private int timeBefore; // 할 일 전에 알림이 울리는 시간 (예: 10분 전)
    private boolean repeat; // 알림이 반복되는지 여부

    @OneToOne // Reminder와 Task가 1:1 관계
    @JoinColumn(name = "task_id", referencedColumnName = "id") // 외래 키로 Task ID를 참조
    private Task task; // 이 리마인더가 연결된 할 일

    // Getters와 Setters는 데이터를 읽고 쓰는 데 필요
}