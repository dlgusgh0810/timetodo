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
    const [labelOptions, setLabelOptions] = useState([]);
    const [events, setEvents] = useState([]);
    // 카테고리 데이터 불러오기
    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await fetch("http://localhost:8085/api/categories/all", {
                    method: "GET",
                    credentials: "include", // 쿠키 포함
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categories = await response.json();
                const formattedCategories = categories.map((category) => ({
                    id: category.categoryId,
                    name: category.categoryName,
                    color: category.color || '#808080',
                }));
                setLabelOptions(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchLabels();
    }, []);
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
            const fullCalendarEvents = data.map((event) => {
                const categoryColor = labelOptions.find(label => label.id === event.categoryId)?.color || '#808080';
                return {
                    id: event.calendarId,
                    title: event.title,
                    start: event.startTime,
                    end: event.endTime,
                    description: event.description,
                    location: event.location,
                    color: categoryColor, // categoryId로 색상 결정
                };
            });
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
