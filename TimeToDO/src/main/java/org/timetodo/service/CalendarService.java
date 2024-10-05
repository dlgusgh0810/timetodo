package org.timetodo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.timetodo.model.Calendar;
import org.timetodo.repository.CalendarRepository;

import java.util.List;

@Service
public class CalendarService {

    @Autowired
    private CalendarRepository calendarRepository;

    // 특정 사용자 ID로 모든 일정 조회
    public List<Calendar> getAllCalendarsByUser(String userId) {
        return calendarRepository.findAllByUserId(userId);
    }

    // 일정 생성
    public Calendar createCalendar(Calendar calendar) {
        return calendarRepository.save(calendar);
    }

    // 일정 삭제
    public void deleteCalendar(Long calendarId) {
        calendarRepository.deleteById(calendarId);
    }
}
