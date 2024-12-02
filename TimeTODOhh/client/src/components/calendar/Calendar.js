import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import styles from './Calendar.module.css';

function Calendar({ calendarEvents }) {
    const [events, setEvents] = useState(calendarEvents || []);
    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜 상태 추가
    const calendarRef = useRef(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8085/api/calendar/find');
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
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

    const handleSave = async (newTodo) => {
        console.log("New Todo Saved:", newTodo);

        try {
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

            const newEvent = {
                id: data.calendarId,
                title: data.title,
                start: data.startTime,
                end: data.endTime,
                color: data.color || '#808080',
            };

            setEvents((prevEvents) => [...prevEvents, newEvent]);
            closeModal();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('데이터 저장에 실패했습니다.');
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '',
                }}
                locale="ko"
                editable={true}
                selectable={true}
                height="100%"
            />
            <AddModal
                isOpen={isModalOpen} // 모달 상태 전달
                onRequestClose={closeModal} // 모달 닫기 함수 전달
                onSave={handleSave}
                selectedDate={selectedDate} // 선택된 날짜 전달
            />
        </div>
    );
}

export default Calendar;
