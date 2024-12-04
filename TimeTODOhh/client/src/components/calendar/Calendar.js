import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import AddModal from '../add/AddModal';
import CalendarEditModal from "../edit/CalendarEditModal";
import styles from './Calendar.module.css';

function Calendar() {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 일정 데이터
    const calendarRef = useRef(null);
    const [labelOptions, setLabelOptions] = useState([]);
    const [events, setEvents] = useState([]);

    // 카테고리와 이벤트 데이터를 로드
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. 카테고리 데이터 불러오기
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

                // 2. 이벤트 데이터 불러오기
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
        console.log("Clicked Event Info:", clickInfo.event); // 클릭된 이벤트의 전체 데이터
        const clickedEvent = events.find((event) => String(event.id) === String(clickInfo.event.id));
        console.log("Matched Event:", clickedEvent);
        if (clickedEvent) {
            setSelectedEvent(clickedEvent); // 선택된 이벤트 데이터 설정
            setEditModalOpen(true); // 모달 열기
        } else {
            console.error("Event not found in the events array");
        }
    };

    const categoryColor = formattedCategories.find((label) => label.id === event.categoryId)?.color || '#808080';
    const fullCalendarEvents = eventData.map((event) => ({
        id: String(event.calendarId), // id를 문자열로 변환
        title: event.title,
        start: event.startTime,
        end: event.endTime, // DTO의 키에 맞게 변경
        description: event.description,
        location: event.location,
        color: categoryColor
    }));
    setEvents(fullCalendarEvents);



    // AddModal 닫기
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    // EditModal 닫기
    const closeEditModal = () => {
        setEditModalOpen(false);
        setSelectedEvent(null); // 선택된 이벤트 초기화
    };

    // 추가 모달 저장 핸들러
    const handleSave = (newEvent) => {
        console.log("New Event Saved:", newEvent);
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 새 이벤트 추가
        setAddModalOpen(false); // 모달 닫기
    };

    const handleEditSave = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? { ...event, ...updatedEvent } : event
            )
        );
        setEditModalOpen(false);
    };

    // EditModal 삭제 핸들러
    const handleDelete = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        setEditModalOpen(false);
    };

    // 보기 전환 이벤트
    const handleViewChange = (event) => {
        const newView = event.target.value; // 드롭다운에서 선택된 보기
        const calendarApi = calendarRef.current.getApi(); // FullCalendar API 호출
        calendarApi.changeView(newView); // 선택된 보기로 전환
    };

    console.log(isEditModalOpen);
    console.log(selectedEvent); // 선택된 이벤트 데이터 확인


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

            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events} // 최신 상태의 이벤트 전달
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

            <AddModal
                isOpen={isAddModalOpen}
                onRequestClose={closeAddModal}
                onSave={handleSave} // onSave 핸들러 전달
                selectedDate={selectedDate} // 선택된 날짜 전달
                defaultTab="일정" // 기본 탭 전달
            />

            <CalendarEditModal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                onSave={handleEditSave}
                onDelete={handleDelete}
                selectedEvent={selectedEvent} // 선택된 이벤트 전달
            />

        </div>
    );
}

export default Calendar;
