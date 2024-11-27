import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import styles from './Calendar.module.css';

function Calendar({ events }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
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
