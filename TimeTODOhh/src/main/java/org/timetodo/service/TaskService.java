package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.TaskDto;
import org.timetodo.dto.TaskRequestDto;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.TaskEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.CategoryRepository;
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

    @Autowired
    private CategoryRepository categoryRepository;

    public TaskEntity addTask(TaskRequestDto taskRequestDto, Long userId, Long categoryId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID(테스크 서비스) : " + userId));
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with ID(테스크 서비스) : " + categoryId));

        log.info("TaskSevice > addTask메소드 > userId, categoryId 정보 : " + userId + " , " + categoryId); //로그

        // DTO로부터 받은 데이터를 TaskEntity로 변환하여 저장
        TaskEntity task = new TaskEntity();
        task.setTitle(taskRequestDto.getTitle()); //타이틀
        task.setDueDate(taskRequestDto.getDueDate()); //마감기한
        task.setPriority(taskRequestDto.getPriority()); //우선순위
        task.setStatus(taskRequestDto.getStatus()); // 진행상태
        switch (taskRequestDto.getStatus()){
            case "PENDING":
                //보류 중, 진행 중, 완료
                break;
            case "IN_PROGRESS":
                //진행중
                break;
            case "DONE" :
                //완료
                break;
            default:
                throw new IllegalArgumentException("오류 Invalid Status type: " + taskRequestDto.getStatus());
        }
        task.setRepeatType(taskRequestDto.getRepeatType()); //반복일정 여부
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
        // 2. userId를 사용하여 UserEntity 조회 후 설정, categoryId를 사용하여 CategoryId 조회 후 설정
        task.setUserId(user);
        task.setCategoryId(category);

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
        if (task.getUserId() != null) {
            dto.setUserId(task.getUserId().getUserId());
        }

        // CategoryEntity의 ID를 설정
        if(task.getTaskId() != null) {
            dto.setCategoryId(task.getCategoryId().getCategoryId());
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
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));

        // 저장된 모든 할 일 조회
        return taskRepository.findAllByUserId(user);
    }

    public TaskEntity updateTask(Long id, TaskRequestDto taskRequestDto, Long categoryId) {
        // 기존 할 일 조회
        TaskEntity existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 할 일이 없습니다."));
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("할당된 카테고리 ID가 없습니다."));

        // 기존 할 일을 새로운 데이터로 업데이트
        existingTask.setTitle(taskRequestDto.getTitle());
        existingTask.setDueDate(taskRequestDto.getDueDate());
        existingTask.setPriority(taskRequestDto.getPriority());
        existingTask.setStatus(taskRequestDto.getStatus());
        existingTask.setRepeatType(taskRequestDto.getRepeatType());
        existingTask.setCategoryId(category);

        return taskRepository.save(existingTask); // 업데이트 후 저장
    }

    public void deleteTask(Long id) {
        // 특정 할 일 삭제
        taskRepository.deleteById(id);
    }
}
