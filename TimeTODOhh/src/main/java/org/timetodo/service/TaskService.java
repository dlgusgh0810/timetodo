package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.TaskEntity;
import org.timetodo.repository.TaskRepository;

import java.util.List;

@Service
@RequiredArgsConstructor // 의존성 주입을 위한 생성자 자동 생성
public class TaskService{

    @Autowired
    private final TaskRepository taskRepository; // TaskRepository 주입

    public TaskEntity addTask(TaskRequestDto taskRequestDto) {
        // DTO로부터 받은 데이터를 TaskEntity로 변환하여 저장
        TaskEntity task = new TaskEntity();
        task.setTitle(taskRequestDto.getTitle());
        task.setDueDate(taskRequestDto.getDueDate());
        task.setPriority(taskRequestDto.getPriority());
        task.setStatus(taskRequestDto.getStatus());
        task.setRepeatType(taskRequestDto.getRepeatType());
        // Category 및 User는 따로 설정 필요
        return taskRepository.save(task); // 저장 후 반환
    }


    public List<TaskEntity> getAllTasks() {
        // 저장된 모든 할 일 조회
        return taskRepository.findAll();
    }

    public TaskEntity updateTask(Long id, TaskRequestDto taskRequestDto) {
        // 기존 할 일 조회
        TaskEntity existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 할 일이 없습니다."));

        // 기존 할 일을 새로운 데이터로 업데이트
        existingTask.setTitle(taskRequestDto.getTitle());
        existingTask.setDueDate(taskRequestDto.getDueDate());
        existingTask.setPriority(taskRequestDto.getPriority());
        existingTask.setStatus(taskRequestDto.getStatus());
        existingTask.setRepeatType(taskRequestDto.getRepeatType());

        return taskRepository.save(existingTask); // 업데이트 후 저장
    }

    public void deleteTask(Long id) {
        // 특정 할 일 삭제
        taskRepository.deleteById(id);
    }
}
