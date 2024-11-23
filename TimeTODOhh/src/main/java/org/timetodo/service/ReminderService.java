//package org.timetodo.service;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.timetodo.dto.ReminderRequestDto;
//import org.timetodo.entity.CalendarEntity;
//import org.timetodo.entity.ReminderEntity;
//import org.timetodo.entity.TaskEntity;
//import org.timetodo.repository.ReminderRepository;
//import org.timetodo.repository.TaskRepository;
//import org.timetodo.repository.CalendarRepository;
//
//import java.util.List;
//
//
//@Slf4j
//@RequiredArgsConstructor
//@Service
//public class ReminderService {
//
//    private final ReminderRepository reminderRepository;
//    private final TaskRepository taskRepository;
//    private final CalendarRepository calendarRepository;
//
//    /**
//     * 알림 생성 또는 업데이트
//     *
//     * @param userId 사용자의 ID (쿠키에서 추출)
//     * @param reminderRequestDto 클라이언트로부터 전달된 알림 데이터
//     * @return 저장된 ReminderEntity
//     */
//    public ReminderEntity createOrUpdateReminder(Long userId, ReminderRequestDto reminderRequestDto) {
//        // 유효성 검증: 사용자와 연관된 Task/Calendar인지 확인
//        if (reminderRequestDto.getTaskId() != null) {
//            TaskEntity task = taskRepository.findById(reminderRequestDto.getTaskId())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid Task ID: " + reminderRequestDto.getTaskId()));
//            if (!task.getUsers().getUserId().equals(userId)) {
//                throw new SecurityException("Unauthorized access to Task ID: " + reminderRequestDto.getTaskId());
//            }
//        }
//        if (reminderRequestDto.getCalendarId() != null) {
//            CalendarEntity calendar = calendarRepository.findById(reminderRequestDto.getCalendarId())
//                    .orElseThrow(() -> new IllegalArgumentException("Invalid Calendar ID: " + reminderRequestDto.getCalendarId()));
//            if (!calendar.getUsers().getUserId().equals(userId)) {
//                throw new SecurityException("Unauthorized access to Calendar ID: " + reminderRequestDto.getCalendarId());
//            }
//        }
//
//        // 기존 ReminderEntity 가져오기 또는 새로 생성
//        ReminderEntity reminder = reminderRepository.findById(reminderRequestDto.getReminderId())
//                .orElse(new ReminderEntity());
//
//        // Reminder 정보 업데이트
//        reminder.setNotificationsEnabled(reminderRequestDto.isNotificationsEnabled());
//        reminder.setTimeBefore(reminderRequestDto.getTimeBefore());
//        reminder.setRepeats(reminderRequestDto.isRepeats());
//
//        // TaskEntity 또는 CalendarEntity 설정
//        if (reminderRequestDto.getTaskId() != null) {
//            TaskEntity task = taskRepository.getReferenceById(reminderRequestDto.getTaskId());
//            reminder.setTaskId(task);
//        }
//        if (reminderRequestDto.getCalendarId() != null) {
//            CalendarEntity calendar = calendarRepository.getReferenceById(reminderRequestDto.getCalendarId());
//            reminder.setCalenderId(calendar);
//        }
//
//        // 알림 저장
//        return reminderRepository.save(reminder);
//    }
//
//    /**
//     * 특정 사용자에 대한 모든 알림 조회
//     * @param userId 사용자 ID
//     * @return 알림 목록
//     */
//    public List<ReminderEntity> getRemindersByUserId(Long userId) {
//        // TaskEntity와 CalendarEntity를 통해 간접적으로 알림을 조회
//        return reminderRepository.findRemindersByUserId(userId);
//    }
//
//    /**
//     * 알림 삭제
//     * @param reminderId 알림 ID
//     */
//    public void deleteReminder(Long reminderId) {
//        reminderRepository.deleteById(reminderId);
//    }
//}
