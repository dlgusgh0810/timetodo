package org.timetodo.time.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.timetodo.time.dto.CalendarRequestDto;
import org.timetodo.time.entity.CalendarEntity;
import org.timetodo.time.repository.CalendarRepository;

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
}
