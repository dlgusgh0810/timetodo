package org.timetodo.service;

import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.TaskEntity;

import java.util.List;

public interface TaskService {

    // 새로운 할 일 추가
    TaskEntity addTask(TaskRequestDto taskRequestDto);

    // 모든 할 일 조회
    List<TaskEntity> getAllTasks();

    // 특정 할 일 업데이트
    TaskEntity updateTask(Long id, TaskRequestDto taskRequestDto);

    // 특정 할 일 삭제
    void deleteTask(Long id);

}

/*
TaskService
addTask(): 새로운 할 일을 추가합니다. DTO에서 받은 데이터를 TaskEntity로 변환하여 저장합니다.
getAllTasks(): 저장된 모든 할 일을 조회합니다.
updateTask(): 특정 할 일을 업데이트합니다. 기존 데이터를 조회하고 새로운 데이터로 업데이트한 후 저장합니다.
deleteTask(): 특정 할 일을 삭제합니다.
*/