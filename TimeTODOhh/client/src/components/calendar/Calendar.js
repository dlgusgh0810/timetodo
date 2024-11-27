import React, { useState, useRef } from 'react';
import {useEffect} from "react";
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
            // calendarId;        // 일정 ID
            // title;           // 일정 제목
            // escription;     // 일정 설명
            // startTime; // 일정 시작 시간
            // endTime;   // 일정 종료 시간
            // private String location;        // 일정 장소
            // private String repeatType;      // 반복 일정 유형 (예: daily, weekly)
            // private Long userId;            // 사용자 ID (UserEntity와의 관계를 ID로 표현)
            // private Long categoryId;        // 카테고리 ID (CategoryEntity와의 관계를 ID로 표현)
            //
            // private List<Long> reminderIds; /



        }
    ]);

    useEffect(() => {
        fetchEvents(); // 컴포넌트 로드 시 일정 데이터를 불러옴
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/calendar/find');
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

    // 보기 전환 이벤트
    const handleViewChange = (event) => {
        const newView = event.target.value; // 드롭다운에서 선택된 보기
        const calendarApi = calendarRef.current.getApi(); // FullCalendar API 호출
        calendarApi.changeView(newView); // 선택된 보기로 전환
    };

    // 새로 추가한 onSave 함수
    const handleSave = async (newTodo) => {
        console.log("New Todo Saved:", newTodo);

        try {
            // 백엔드로 POST 요청 전송
            const response = await fetch('http://localhost:8085/api/calendar/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo),
            });

            if (!response.ok) {
                throw new Error('Failed to save data to backend');
            }

            const data = await response.json();
            console.log('Response from backend:', data);

            // 성공적으로 저장되면 모달을 닫음
            closeModal();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('데이터 저장에 실패했습니다.');
        }
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
                onSave={handleSave}  // 추가된 onSave prop
                selectedDate={selectedDate} // 선택된 날짜 전달
                defaultTab="일정" // 기본 탭 전달
            />
        </div>
    );
}

export default Calendar;
