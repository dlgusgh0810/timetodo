package org.timetodo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;
import org.timetodo.entity.CategoryEntity;
import org.timetodo.repository.CalendarRepository;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository calendarRepository; // CalendarRepository 주입

    @Override
    public CalendarEntity addCalendar(CalendarRequestDto calendarRequestDto) {
        // DTO로부터 받은 데이터를 CalendarEntity로 변환하여 저장
        CalendarEntity calendar = new CalendarEntity();
        calendar.setTitle(calendarRequestDto.getTitle());
        calendar.setDescription(calendarRequestDto.getDescription());
        calendar.setStartTime(calendarRequestDto.getStartTime());
        calendar.setEndTime(calendarRequestDto.getEndTime());
        calendar.setLocation(calendarRequestDto.getLocation());
        calendar.setRepeatType(calendarRequestDto.getRepeatType());
        // Category 및 User는 따로 설정 필요
        return calendarRepository.save(calendar); // 저장 후 반환
    }

    @Override
    public List<CalendarEntity> getAllCalendars() {
        // 저장된 모든 일정 조회
        return calendarRepository.findAll();
    }

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

    @Override
    public void deleteCalendar(Long id) {
        // 특정 일정 삭제
        calendarRepository.deleteById(id);
    }

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
    }

    @Override
    public List<CalendarEntity> searchEvents(String title, String description, Long categoryId, LocalDateTime startTime) {
        return calendarRepository.findByTitleContainingAndDescriptionContainingAndCategories_CategoryIdAndStartTime(
                title, description, categoryId, startTime
        );
    }


}
