package org.timetodo.service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.dto.CalendarDTO;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.CalendarRepository;
import org.timetodo.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class CalendarServiceImpl implements CalendarService {

    @Autowired
    private final CalendarRepository calendarRepository; // CalendarRepository 주입
    @Autowired
    private final UserRepository userRepository;  // UserRepository 주입

    // 새로운 일정을 추가 (반복일정 로직추가 11/11)
    @Override
    public CalendarDTO addCalendar(CalendarRequestDto calendarRequestDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        log.info("addCalendar_service_userId 정보 : " + userId); //로그

        // 1. CalendarRequestDto를 CalendarEntity로 변환
        CalendarEntity calendar = new CalendarEntity();
        calendar.setTitle(calendarRequestDto.getTitle());
        calendar.setDescription(calendarRequestDto.getDescription());
        calendar.setStartTime(calendarRequestDto.getStartTime());
        calendar.setEndTime(calendarRequestDto.getEndTime());
        calendar.setLocation(calendarRequestDto.getLocation());
        calendar.setRepeatType(calendarRequestDto.getRepeatType());
        switch (calendarRequestDto.getRepeatType()) {
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
                throw new IllegalArgumentException("Invalid repeat type: " + calendarRequestDto.getRepeatType());
        }

        // 2. userId를 사용하여 UserEntity 조회 후 설정
        calendar.setUsers(user);
        /*
        if (calendarRequestDto.getUserId() != null) {


        } else {
            log.warn("User ID is null in CalendarRequestDto.");
        }*/

        // 3. CalendarEntity 저장
        CalendarEntity savedCalendar = calendarRepository.save(calendar);

        // 4. 저장된 CalendarEntity를 CalendarDTO로 변환
        return convertToDto(savedCalendar);
//        return calendarRepository.save(calendar); // 저장 후 반환
//        return new CalendarDTO(savedCalendar);
    }

    // CalendarEntity를 CalendarDTO로 변환하는 메서드
    private CalendarDTO convertToDto(CalendarEntity calendar) {
        CalendarDTO dto = new CalendarDTO();
        dto.setCalendarId(calendar.getCalendarId());
        dto.setTitle(calendar.getTitle());
        dto.setDescription(calendar.getDescription());
        dto.setStartTime(calendar.getStartTime());
        dto.setEndTime(calendar.getEndTime());
        dto.setLocation(calendar.getLocation());
        dto.setRepeatType(calendar.getRepeatType());

        // UserEntity의 ID를 설정
        if (calendar.getUsers() != null) {
            dto.setUserId(calendar.getUsers().getUserId());
        }

        // CategoryEntity의 ID를 설정
        if (calendar.getCategories() != null) {
            dto.setCategoryId(calendar.getCategories().getCategoryId());
        }

        // ReminderEntity 리스트의 ID들을 설정
        if (calendar.getReminders() != null) {
            List<Long> reminderIds = calendar.getReminders().stream()
                    .map(ReminderEntity::getReminderId)
                    .collect(Collectors.toList());
            dto.setReminderIds(reminderIds);
        }

        return dto;
    }

    // 모든 일정을 조회
    @Override
    public List<CalendarEntity> getAllCalendars() {
        // 저장된 모든 일정 조회
        return calendarRepository.findAll();
    }

    // 특정 일정을 업데이트
    @Override
    public CalendarEntity updateCalendar(Long id, CalendarRequestDto calendarRequestDto) {
        // 기존 일정 조회
        CalendarEntity existingCalendar = calendarRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 일정이 없습니다."));

        // 기존 일정을 새로운 데이터로 업데이트
        existingCalendar.setTitle(calendarRequestDto.getTitle());
        existingCalendar.setDescription(calendarRequestDto.getDescription());
        existingCalendar.setStartTime(calendarRequestDto.getStartTime());
        existingCalendar.setEndTime(calendarRequestDto.getEndTime());
        existingCalendar.setLocation(calendarRequestDto.getLocation());
        existingCalendar.setRepeatType(calendarRequestDto.getRepeatType());

        return calendarRepository.save(existingCalendar); // 업데이트 후 저장
    }

    // 특정 일정을 삭제
    @Override
    public void deleteCalendar(Long id) {
        // 특정 일정 삭제
        calendarRepository.deleteById(id);
    }

    // 일정 검색 엔드포인트
    @Override
    public List<CalendarEntity> searchEvents(String title, String description, Long categoryId, LocalDateTime startTime) {
        return calendarRepository.findByTitleContainingAndDescriptionContainingAndCategories_CategoryIdAndStartTime(
                title, description, categoryId, startTime
        );
    }

    /*// 반복 일정 추가
    @Override
    public CalendarEntity addRepeatingEvent(CalendarRequestDto request) {
        CalendarEntity event = new CalendarEntity();
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setLocation(request.getLocation());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setRepeatType(request.getRepeatType());


        // 반복 일정 로직 예시
        switch (request.getRepeatType()) {
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
                throw new IllegalArgumentException("Invalid repeat type: " + request.getRepeatType());
        }

        return calendarRepository.save(event);
    }*/

}
