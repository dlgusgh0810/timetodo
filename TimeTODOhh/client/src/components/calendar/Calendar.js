import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal'; // 모달 컴포넌트 임포트

function Calendar() {
    const [view, setView] = useState('dayGridMonth');
    const [events, setEvents] = useState([
        { title: '김민서', date: '2024-11-13', color: '#4caf50' },
        { title: '이현호', date: '2024-11-01', color: '#3f51b5' },
        { title: '황스일', date: '2024-11-02', color: '#4caf50' },
    ]);

    const [isModalOpen, setModalOpen] = useState(false); // 모달 열림 상태
    const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr); // 선택된 날짜 설정
        setModalOpen(true); // 모달 열기
    };

    const closeModal = () => {
        setModalOpen(false); // 모달 닫기
    };

    const handleSaveEvent = (eventData) => {
        // 새로운 일정을 events에 추가
        const newEvent = {
            title: eventData.title,
            start: `${eventData.date}T${eventData.time}`, // 날짜와 시간
        };
        setEvents([...events, newEvent]); // 기존 events 배열에 추가
        closeModal(); // 모달 닫기
    };

    const handleViewChange = (event) => {
        setView(event.target.value);
    };

    return (
        <div className="calendar-container">
            <div className="view-selector">
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
                dateClick={handleDateClick} // 날짜 클릭 시 모달 열기
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '' // 드롭다운으로 대체
                }}
                locale="ko"
                editable={true}
                selectable={true}
            />

            {/* AddModal 컴포넌트 */}
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
