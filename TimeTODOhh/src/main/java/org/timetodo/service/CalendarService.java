package org.timetodo.service;

<<<<<<< HEAD
=======
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)

import jakarta.servlet.http.HttpSession;
import org.timetodo.dto.CalendarDTO;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;
<<<<<<< HEAD
=======
import org.timetodo.entity.ReminderEntity;
import org.timetodo.entity.UserEntity;
import org.timetodo.repository.CalendarRepository;
import org.timetodo.repository.UserRepository;
>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarService {

    // 새로운 일정을 추가 (반복일정 로직추가 11/11)
    CalendarDTO addCalendar(CalendarRequestDto calendarRequestDto, Long userId);

    // 모든 일정 조회
    List<CalendarEntity> getCalendarsByUserId(Long userId);

    // 특정 일정 업데이트
    CalendarEntity updateCalendar(Long id, CalendarRequestDto calendarRequestDto);

    // 특정 일정 삭제
    void deleteCalendar(Long id);

    // 반복 일정 추가
//    CalendarEntity addRepeatingEvent(CalendarRequestDto request);

<<<<<<< HEAD
    // 일정 검색
    List<CalendarEntity> searchEvents(String title, String description, Long categoryId, LocalDateTime startTime);
=======
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
        // 저장된 모든 일정 조회
        return calendarRepository.findAllByUsers_UserId(userId);
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
        return calendarRepository.findByTitleContainingAndDescriptionContainingAndCategories_CategoryIdAndStartTime(
                title, description, categoryId, startTime
        );
    }

>>>>>>> 1b4a5ec5 (Merge pull request #29 from SEUIL/main)

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