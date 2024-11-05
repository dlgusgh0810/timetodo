// Calendar.js
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal'; // 모달 컴포넌트 임포트
import styles from './Calendar.module.css'; // 모듈 CSS 임포트

function Calendar() {
    const [view, setView] = useState('dayGridMonth');
    const [events, setEvents] = useState([
        { title: '김민서', date: '2024-11-13', color: '#4caf50' },
        { title: '이현호', date: '2024-11-01', color: '#3f51b5' },
        { title: '황스일', date: '2024-11-02', color: '#4caf50' },
    ]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSaveEvent = (eventData) => {
        const newEvent = {
            title: eventData.title,
            start: `${eventData.date}T${eventData.time}`,
        };
        setEvents([...events, newEvent]);
        closeModal();
    };

    const handleViewChange = (event) => {
        setView(event.target.value);
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
                    left: '',
                    center: 'title',
                    right: 'prev,next today'
                }}
                locale="ko"
                editable={true}
                selectable={true}
                height="100%" /* 높이 100% 설정 */
            />

            <AddModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSave={handleSaveEvent}
                selectedDate={selectedDate}
            />
        </div>
    );
}

export default Calendar;
