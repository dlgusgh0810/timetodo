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
// <<<<<<< NewFile
    const calendarRef = useRef(null);
    const [events, setEvents] = useState([
        // {
        //     // calendarId;        // 일정 ID
        //     // title;           // 일정 제목
        //     // escription;     // 일정 설명
        //     // startTime; // 일정 시작 시간
        //     // endTime;   // 일정 종료 시간
        //     // private String location;        // 일정 장소
        //     // private String repeatType;      // 반복 일정 유형 (예: daily, weekly)
        //     // private Long userId;            // 사용자 ID (UserEntity와의 관계를 ID로 표현)
        //     // private Long categoryId;        // 카테고리 ID (CategoryEntity와의 관계를 ID로 표현)
        //     //
        //     // private List<Long> reminderIds; /
        //
        //
        //
        // }
        {
            id: 1,
            title: '팀 미팅',
            start: '2024-11-30T10:00:00',
            end: '2024-11-30T12:00:00',
            description: '프로젝트 논의를 위한 팀 미팅',
            location: '회의실 A',
        },
        {
            id: 2,
            title: '코드 리뷰',
            start: '2024-12-01T15:00:00',
            end: '2024-12-01T16:30:00',
            description: '동료와 코드 리뷰 세션',
            location: '회의실 B',
        },
        {
            id: 3,
            title: '데드라인 제출',
            start: '2024-12-02T00:00:00',
            end: '2024-12-03T00:00:00',
            description: '프로젝트 최종 결과물 제출',
            location: '온라인 제출',
            color: '#808080'
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
// =======
//     const calendarRef = useRef(null); // FullCalendar의 ref 생성
// >>>>>>> main

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

    // // 새로 추가한 onSave 함수
    // const handleSave = async (newTodo) => {
    //     console.log("New Todo Saved:", newTodo);
    //
    //     try {
    //         // 백엔드로 POST 요청 전송
    //         const response = await fetch('http://localhost:8085/api/calendar/add', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newTodo),
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Failed to save data to backend');
    //         }
    //
    //         const data = await response.json();
    //         console.log('Response from backend:', data);
    //
    //         // 성공적으로 저장되면 모달을 닫음
    //         closeModal();
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //         alert('데이터 저장에 실패했습니다.');
    //     }
    // };

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

            // FullCalendar 형식으로 변환하여 상태 업데이트
            const newEvent = {
                id: data.calendarId,
                title: data.title,
                start: data.startTime,
                end: data.endTime,
                color: data.color || '#808080', // color 추가
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
                selectedDate={selectedDate}
            />
        </div>
    );
}

export default Calendar;
