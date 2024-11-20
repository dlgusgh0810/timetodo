import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import styles from './Calendar.module.css';

function Calendar({ initialEvents }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [events, setEvents] = useState(initialEvents); // 이벤트 상태 관리
    const calendarRef = useRef(null); // FullCalendar의 ref 생성

    // 날짜 클릭 이벤트
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    // 이벤트 저장 함수
    const handleSave = (newEvent) => {
        // 기존 이벤트에 새 이벤트 추가
        setEvents((prevEvents) => [
            ...prevEvents,
            { title: newEvent.title, start: newEvent.date, ...newEvent }
        ]);

        closeModal(); // 모달 닫기
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
                events={events} // 상태로 관리되는 이벤트 전달
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
                onSave={handleSave} // 이벤트 저장 함수 전달
                selectedDate={selectedDate}
            />
        </div>
    );
}

export default Calendar;
