package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.timetodo.dto.ReminderDto;
import org.timetodo.dto.ReminderRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.TaskEntity;
import org.timetodo.repository.ReminderRepository;
import org.timetodo.repository.TaskRepository;
import org.timetodo.repository.CalendarRepository;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class ReminderService {

    private final ReminderRepository reminderRepository;
    private final TaskRepository taskRepository;
    private final CalendarRepository calendarRepository;

    /**
     * Task에 대한 알림 생성 로직
     *
     * @param reminderRequestDto 알림 설정 요청 데이터
     * @param taskId Task의 FK
     * @return 생성된 Task 알림
     */
    public ReminderDto createTaskReminder(ReminderRequestDto reminderRequestDto, Long taskId) {
        // 1. TaskEntity를 ID로 조회
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + taskId));

        // 2. ReminderEntity 생성
        ReminderEntity reminder = new ReminderEntity();
        reminder.setTaskId(task); // ManyToOne 관계로 설정된 Task를 연결
        reminder.setNotificationsEnabled(reminderRequestDto.isNotificationsEnabled());
        reminder.setTimeBefore(reminderRequestDto.getTimeBefore());
        reminder.setRepeats(reminderRequestDto.isRepeats());

        // 3. ReminderEntity 저장
        ReminderEntity savedReminder = reminderRepository.save(reminder);

        return converToDto(savedReminder);
    }

    /**
     * Calendar에 대한 알림 생성 로직
     *
     * @param reminderRequestDto 알림 설정 요청 데이터
     * @param calendarId Calendar의 FK
     * @return 생성된 Calendar 알림
     */
    public ReminderDto createCalendarReminder(ReminderRequestDto reminderRequestDto, Long calendarId) {
        // 1. CalendarEntity를 ID로 조회
        CalendarEntity calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new RuntimeException("Calendar not found with ID: " + calendarId));

        // 2. ReminderEntity 생성
        ReminderEntity reminder = new ReminderEntity();
        reminder.setCalendarId(calendar); // ManyToOne 관계로 설정된 Calendar를 연결
        reminder.setNotificationsEnabled(reminderRequestDto.isNotificationsEnabled());
        reminder.setTimeBefore(reminderRequestDto.getTimeBefore());
        reminder.setRepeats(reminderRequestDto.isRepeats());

        // 3. ReminderEntity 저장
        ReminderEntity savedReminder = reminderRepository.save(reminder);

        return converToDto(savedReminder);
    }

    /**
     * ReminderEntity를 ReminderDto로 변환하는 메서드
     */
    private ReminderDto converToDto(ReminderEntity reminder) {
        ReminderDto dto = new ReminderDto();
        dto.setReminderId(reminder.getReminderId());
        dto.setNotificationsEnabled(reminder.isNotificationsEnabled());
        dto.setTimeBefore(reminder.getTimeBefore());
        dto.setRepeats(reminder.isRepeats());

        if(reminder.getTaskId() != null) {
            dto.setTaskId(reminder.getTaskId().getTaskId());
        }

        if(reminder.getCalendarId() != null) {
            dto.setCalendarId(reminder.getCalendarId().getCalendarId());
        }

        return dto;
    }

    /**
     * task의 알림 조회
     * @param taskId 사용자 ID
     * @return 알림 목록
     */
    public List<ReminderEntity> getReminderByTaskId(Long taskId) {
        // TaskEntity와 CalendarEntity를 통해 간접적으로 알림을 조회
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + taskId));
        return reminderRepository.findByTaskId(task);
    }

    /**
     * Calendar의 알림 조회
     * @param calendarId 사용자 ID
     * @return 알림 목록
     */
    public List<ReminderEntity> getReminderByCalendarId(Long calendarId) {
        // TaskEntity와 CalendarEntity를 통해 간접적으로 알림을 조회
        CalendarEntity calendar = calendarRepository.findById(calendarId)
                .orElseThrow(() -> new RuntimeException("Calendar not found with Id: " + calendarId));
        return reminderRepository.findByCalendarId(calendar);
    }

    /**
     * 알림 삭제
     * @param reminderId 알림 ID
     */
    public void deleteReminder(Long reminderId) {
        reminderRepository.deleteById(reminderId);
    }
}