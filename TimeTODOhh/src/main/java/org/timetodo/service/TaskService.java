package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.CalendarDTO;
import org.timetodo.dto.TaskDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.TaskEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.TaskRepository;
import org.timetodo.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor // 의존성 주입을 위한 생성자 자동 생성
public class TaskService{

    @Autowired
    private final TaskRepository taskRepository; // TaskRepository 주입

    @Autowired
    private final UserRepository userRepository;  // UserRepository 주입

    public TaskEntity addTask(TaskRequestDto taskRequestDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID(테스크서비스) : " + userId));
        log.info("TaskSevice > addTask메소드 > userId 정보 : " + userId); //로그

        // DTO로부터 받은 데이터를 TaskEntity로 변환하여 저장
        TaskEntity task = new TaskEntity();
        task.setTitle(taskRequestDto.getTitle());
        task.setDueDate(taskRequestDto.getDueDate());
        task.setPriority(taskRequestDto.getPriority());
        task.setStatus(taskRequestDto.getStatus());
        task.setRepeatType(taskRequestDto.getRepeatType());
        switch (taskRequestDto.getRepeatType()) {
            case "NONE":
                //반복없음
                break;
            case "DAILY":
                // 매일 반복 설정 로직 (예: 매일 일정 생성)
                break;
            case "WEEKLY":
                // 매주 반복 설정 로직
                break;
            case "MONTHLY":
                // 매월 반복 설정 로직
                break;
            case "YEARLY":
                // 매년 반복 설정 로직
                break;
            default:
                throw new IllegalArgumentException("Invalid repeat type: " + taskRequestDto.getRepeatType());
        }
        // 2. userId를 사용하여 UserEntity 조회 후 설정
        task.setUsers(user);

        // 3. CalendarEntity 저장
        TaskEntity saveTask = taskRepository.save(task);

        // Category 및 User는 따로 설정 필요
        return taskRepository.save(task); // 저장 후 반환
    }

    private TaskDto convertToDto(TaskEntity task) {
        TaskDto dto = new TaskDto();
        dto.setTaskId(task.getTaskId());
        dto.setTitle(task.getTitle());
        dto.setDueDate(task.getDueDate());
        dto.setPriority(task.getPriority());
        dto.setStatus(task.getStatus());
        dto.setRepeatType(task.getRepeatType());

        // UserEntity의 ID를 설정
        if (task.getUsers() != null) {
            dto.setUserId(task.getUsers().getUserId());
        }

        // CategoryEntity의 ID를 설정
        if(task.getCategories() != null) {
            dto.setCategoryId(task.getCategories().getCategoryId());
        }

        // ReminderEntity 리스트의 ID들을 설정
        if(task.getReminderId() != null) {
            List<Long> reminderIds = task.getReminderId().stream()
                    .map(ReminderEntity::getReminderId)
                    .collect(Collectors.toList());
            dto.setReminderIds(reminderIds);
        }

        return dto;

    }


    public List<TaskEntity> getTasksByUserId(Long userId) {
        // 저장된 모든 할 일 조회
        return taskRepository.findAllByUsers_UserId(userId);
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
