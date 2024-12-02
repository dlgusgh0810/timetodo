import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import styles from './Calendar.module.css';

function Calendar() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([
        {
            id: 10,
            title: '팀 미팅',
            start: '2024-11-30T10:00:00',
            end: '2024-11-30T12:00:00',
            description: '프로젝트 논의를 위한 팀 미팅',
            location: '회의실 A',
        },
        {
            id: 20,
            title: '코드 리뷰',
            start: '2024-12-01T15:00:00',
            end: '2024-12-01T16:30:00',
            description: '동료와 코드 리뷰 세션',
            location: '회의실 B',
        },
        {
            id: 30,
            title: '데드라인 제출',
            start: '2024-12-02T00:00:00',
            end: '2024-12-03T00:00:00',
            description: '프로젝트 최종 결과물 제출',
            location: '온라인 제출',
        },
    ]);

    useEffect(() => {
        fetchEvents(); // 컴포넌트 로드 시 일정 데이터를 불러옴
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:8085/api/calendar/find", {
                method: "GET",
                credentials: "include", // 쿠키 포함
            });
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json(); // CalendarDTO 형식 데이터
            const fullCalendarEvents = data.map((event) => ({
                id: event.calendarId,
                title: event.title,
                start: event.startTime,
                end: event.endTime,
                description: event.description,
                location: event.location,
            }));
            setEvents(fullCalendarEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // 날짜 클릭 이벤트
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    // 저장 핸들러
    const handleSave = (newEvent) => {
        console.log("New Event Saved:", newEvent);
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 새 이벤트 추가
        setModalOpen(false); // 모달 닫기
    };

    // 보기 전환 이벤트
    const handleViewChange = (event) => {
        const newView = event.target.value; // 드롭다운에서 선택된 보기
        const calendarApi = calendarRef.current.getApi(); // FullCalendar API 호출
        calendarApi.changeView(newView); // 선택된 보기로 전환
    };

    return (
        <div className={styles.calendarContainer}>
            {/* 보기 전환 셀렉트 박스 */}
            <div className={styles.viewSelector}>
                <label htmlFor="view-select">보기: </label>
                <select id="view-select" onChange={handleViewChange}>
                    <option value="dayGridMonth">월간 보기</option>
                    <option value="timeGridWeek">주간 보기</option>
                    <option value="timeGridDay">일간 보기</option>
                </select>
            </div>

            {/* FullCalendar 컴포넌트 */}
            <FullCalendar
                ref={calendarRef} // FullCalendar에 ref 연결
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth" // 초기 보기는 월간으로 설정
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '' // 보기 선택 메뉴 비활성화
                }}
                locale="ko"
                editable={true}
                selectable={true}
                height="100%"
            />

            {/* 모달 컴포넌트 */}
            <AddModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSave={handleSave} // onSave 핸들러 전달
                selectedDate={selectedDate} // 선택된 날짜 전달
                defaultTab="일정" // 기본 탭 전달
            />
        </div>
    );
}

export default Calendar;
