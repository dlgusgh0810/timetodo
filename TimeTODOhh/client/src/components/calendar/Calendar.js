import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import CalendarEditModal from "../edit/CalendarEditModal";
import Modal from 'react-modal';
import styles from './Calendar.module.css';

Modal.setAppElement('#root');

function Calendar() {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDetailModalOpen, setDetailModalOpen] = useState(false); // 세부 정보 모달 상태
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const calendarRef = useRef(null);
    const [labelOptions, setLabelOptions] = useState([]);
    const [events, setEvents] = useState([]);

    // 데이터 로드
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await fetch("http://localhost:8085/api/categories/all", {
                    method: "GET",
                    credentials: "include",
                });

                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const categories = await categoryResponse.json();
                const formattedCategories = categories.map((category) => ({
                    id: category.categoryId,
                    name: category.categoryName,
                    color: category.color || '#808080',
                }));
                setLabelOptions(formattedCategories);

                const eventsResponse = await fetch("http://localhost:8085/api/calendar/find", {
                    method: "GET",
                    credentials: "include",
                });

                if (!eventsResponse.ok) {
                    throw new Error('Failed to fetch events');
                }

                const eventData = await eventsResponse.json();
                const fullCalendarEvents = eventData.map((event) => {
                    const categoryColor = formattedCategories.find((label) => label.id === event.categoryId)?.color || '#808080';
                    return {
                        id: event.calendarId,
                        title: event.title,
                        start: event.startTime,
                        end: event.end_time, // DTO의 키에 맞게 변경
                        description: event.description,
                        location: event.location,
                        color: categoryColor,
                    };
                });

                setEvents(fullCalendarEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // 날짜 클릭 이벤트
    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setAddModalOpen(true);
    };

    // 일정 클릭 이벤트
    const handleEventClick = (clickInfo) => {
        const clickedEvent = events.find((event) => String(event.id) === String(clickInfo.event.id));
        if (clickedEvent) {
            setSelectedEvent(clickedEvent); // 선택된 이벤트 저장
            setDetailModalOpen(true); // 세부 정보 모달 열기
        } else {
            console.error("Event not found in the events array");
        }
    };

    // 세부 정보 모달 닫기
    const closeDetailModal = () => {
        setDetailModalOpen(false);
        setSelectedEvent(null);
    };

    // AddModal 닫기
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    // EditModal 닫기
    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedEvent(null);
    };

    // 추가 모달 저장 핸들러
    const handleSave = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 새 이벤트 추가
        setAddModalOpen(false); // 모달 닫기
    };

    // 수정된 이벤트 저장 핸들러
    const handleEditSave = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
            )
        );
        setEditModalOpen(false);
    };

    // 보기 전환 이벤트
    const handleViewChange = (event) => {
        const newView = event.target.value;
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(newView);
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.viewSelector}>
                <label htmlFor="view-select">보기: </label>
                <select id="view-select" onChange={handleViewChange}>
                    <option value="dayGridMonth">월간 보기</option>
                    <option value="timeGridWeek">주간 보기</option>
                    <option value="timeGridDay">일간 보기</option>
                </select>
            </div>

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
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

            {/* 추가 모달 */}
            <AddModal
                isOpen={isAddModalOpen}
                onRequestClose={closeAddModal}
                onSave={handleSave}
                selectedDate={selectedDate}
                defaultTab="일정"
            />

            {/* 수정 모달 */}
            <CalendarEditModal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                onSave={handleEditSave}
                selectedEvent={selectedEvent}
            />

            {/* 세부 정보 모달 */}
            {selectedEvent && (
                <Modal
                    isOpen={isDetailModalOpen}
                    onRequestClose={closeDetailModal}
                    style={{
                        content: {
                            maxWidth: '500px',
                            margin: 'auto',
                            padding: '20px',
                            borderRadius: '10px',
                        },
                    }}
                >
                    <h2>{selectedEvent.title}</h2>
                    <p>
                        <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
                    </p>
                    <p>
                        <strong>End:</strong>{' '}
                        {selectedEvent.end ? new Date(selectedEvent.end).toLocaleString() : 'N/A'}
                    </p>
                    <p>
                        <strong>Description:</strong> {selectedEvent.description || 'No description'}
                    </p>
                    <p>
                        <strong>Location:</strong> {selectedEvent.location || 'No location'}
                    </p>
                    <button
                        onClick={() => {
                            setDetailModalOpen(false);
                            setEditModalOpen(true);
                        }}
                    >
                        Edit
                    </button>
                    <button onClick={closeDetailModal}>Close</button>
                </Modal>
            )}
        </div>
    );
}

export default Calendar;
