package org.timetodo.service;

<<<<<<< HEAD
import org.timetodo.dto.TaskRequestDto;
=======
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.CalendarDTO;
import org.timetodo.dto.TaskDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
import org.timetodo.entity.TaskEntity;

import java.util.List;

public interface TaskService {

    // 새로운 할 일 추가
    TaskEntity addTask(TaskRequestDto taskRequestDto);

    // 모든 할 일 조회
    List<TaskEntity> getAllTasks();

<<<<<<< HEAD
    // 특정 할 일 업데이트
    TaskEntity updateTask(Long id, TaskRequestDto taskRequestDto);
=======
    public TaskEntity addTask(TaskRequestDto taskRequestDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID(테스크서비스) : " + userId));
        log.info("TaskSevice > addTask메소드 > userId 정보 : " + userId); //로그
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)

    // 특정 할 일 삭제
    void deleteTask(Long id);

<<<<<<< HEAD
=======
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
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)
}

/*
TaskService
addTask(): 새로운 할 일을 추가합니다. DTO에서 받은 데이터를 TaskEntity로 변환하여 저장합니다.
getAllTasks(): 저장된 모든 할 일을 조회합니다.
updateTask(): 특정 할 일을 업데이트합니다. 기존 데이터를 조회하고 새로운 데이터로 업데이트한 후 저장합니다.
deleteTask(): 특정 할 일을 삭제합니다.
*/