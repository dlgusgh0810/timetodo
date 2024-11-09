package org.timetodo.service;


import org.timetodo.dto.CalendarRequestDto;
import org.timetodo.entity.CalendarEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarService {

    // 새로운 일정 추가
    CalendarEntity addCalendar(CalendarRequestDto calendarRequestDto);

    // 모든 일정 조회
    List<CalendarEntity> getAllCalendars();

    // 특정 일정 업데이트
    CalendarEntity updateCalendar(Long id, CalendarRequestDto calendarRequestDto);

    // 특정 일정 삭제
    void deleteCalendar(Long id);

    // 반복 일정 추가
    CalendarEntity addRepeatingEvent(CalendarRequestDto request);

    // 일정 검색
    List<CalendarEntity> searchEvents(String title, String description, Long categoryId, LocalDateTime startTime);

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