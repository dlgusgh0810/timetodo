
// Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import styles from './Calendar.module.css';

function Calendar({ events }) {
    const [view, setView] = useState('dayGridMonth');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleViewChange = (event) => {
        setView(event.target.value);
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
            <div className={styles.viewSelector}>
                <label htmlFor="view-select">보기: </label>
                <select id="view-select" onChange={handleViewChange} value={view}>
                    <option value="dayGridMonth">월간 보기</option>
                    <option value="timeGridWeek">주간 보기</option>
                    <option value="timeGridDay">일간 보기</option>
                </select>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={view}
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: ''
                }}
                locale="ko"
                editable={true}
                selectable={true}
                height="100%"
            />

            <AddModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSave={handleSave}  // 추가된 onSave prop
                selectedDate={selectedDate}
            />

        </div>
    );
}

export default Calendar;
