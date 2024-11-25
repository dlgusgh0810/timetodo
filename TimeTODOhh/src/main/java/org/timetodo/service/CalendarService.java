package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.timetodo.dto.CalendarDTO;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.CalendarRepository;
import org.timetodo.repository.CategoryRepository;
import org.timetodo.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class CalendarService {

    @Autowired
    private final CalendarRepository calendarRepository; // CalendarRepository 주입
    @Autowired
    private final UserRepository userRepository;  // UserRepository 주입
    @Autowired
    private CategoryRepository categoryRepository;

    // 새로운 일정을 추가 (반복일정 로직추가 11/11)
    public CalendarDTO addCalendar(CalendarRequestDto calendarRequestDto, Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID(캘린더서비스) : " + userId));

        log.info("CalendarSevice > addCalendar메소드 > userId 정보 : " + userId); //로그

        // 1. CalendarRequestDto를 CalendarEntity로 변환
        CalendarEntity calendar = new CalendarEntity();
        calendar.setTitle(calendarRequestDto.getTitle()); //타이틀
        calendar.setDescription(calendarRequestDto.getDescription()); //설명
        calendar.setStartTime(calendarRequestDto.getStartTime()); //시작시간
        calendar.setEndTime(calendarRequestDto.getEndTime()); //종료시간
        calendar.setLocation(calendarRequestDto.getLocation()); //위치
        calendar.setRepeatType(calendarRequestDto.getRepeatType()); //반복유형
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
        calendar.setUserId(user);

        // 3. CalendarEntity 저장
        CalendarEntity savedCalendar = calendarRepository.save(calendar);

        // 4. 저장된 CalendarEntity를 CalendarDTO로 변환
        return convertToDto(savedCalendar);
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
        if (calendar.getUserId() != null) {
            dto.setUserId(calendar.getUserId().getUserId());
        }

        // CategoryEntity의 ID를 설정
        if (calendar.getCategoryId() != null) {
            dto.setCategoryId(calendar.getCategoryId().getCategoryId());
        }

        // ReminderEntity 리스트의 ID들을 설정
        if (calendar.getReminderId() != null) {
            List<Long> reminderIds = calendar.getReminderId().stream()
                    .map(ReminderEntity::getReminderId)
                    .collect(Collectors.toList());
            dto.setReminderIds(reminderIds);
        }

        return dto;
    }

    // 모든 일정을 조회
    public List<CalendarEntity> getCalendarsByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        // 저장된 모든 일정 조회
        return calendarRepository.findAllByUserId(user);
    }

    // 특정 일정을 업데이트
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
    public void deleteCalendar(Long id) {
        // 특정 일정 삭제
        calendarRepository.deleteById(id);
    }

    // 일정 검색 엔드포인트
    public List<CalendarEntity> searchEvents(String title, String description, Long categoryId, LocalDateTime startTime) {
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));

        return calendarRepository.findByTitleContainingAndDescriptionContainingAndCategoryIdAndStartTime(
                title, description, category, startTime
        );
    }


}
/*
CalendarService
addCalendar(): 새로운 일정을 추가합니다. DTO에서 받은 데이터를 CalendarEntity로 변환하여 저장합니다.
getAllCalendars(): 저장된 모든 일정을 조회합니다.
updateCalendar(): 특정 일정을 업데이트합니다. 기존 데이터를 조회하고 새로운 데이터로 업데이트한 후 저장합니다.
deleteCalendar(): 특정 일정을 삭제합니다.
addRepeatingEvent() : 반복 일정을 추가
searchEvents() : 특정 일정 검색 기능
*/