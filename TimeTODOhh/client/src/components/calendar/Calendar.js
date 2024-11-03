import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
    const [view, setView] = useState('dayGridMonth');
    const [events, setEvents] = useState([
        // 예시로 만듬
        { title: '김민서', date: '2024-11-13', color: '#4caf50' },
        { title: '이현호', date: '2024-11-01', color: '#3f51b5' },
        { title: '황스일', date: '2024-11-02', color: '#4caf50' },
    ]);

    const handleDateClick = (arg) => {
        const title = prompt('일정을 입력하세요:');
        if (title) {
            setEvents([...events, { title, date: arg.dateStr }]);
        }
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
                view={view}  // initialView 대신 view 사용
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: '' // 드롭다운으로 대체
                }}
                locale="ko"
                editable={true}
                selectable={true}
            />
        </div>
    );
}

export default Calendar;


// import React, { useState } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import timeGridPlugin from '@fullcalendar/timegrid';
//
// function Calendar_month() {
//     const [events, setEvents] = useState([
//         { title: '추석 연휴', date: '2024-09-15', color: '#4caf50' },
//         { title: '친구 생일', date: '2024-09-25', color: '#3f51b5' },
//         { title: '국군의 날', date: '2024-10-01', color: '#4caf50' },
//     ]);
//
//     // 뷰 상태 관리
//     const [view, setView] = useState('dayGridMonth');
//
//     // 날짜 클릭 이벤트 핸들러
//     const handleDateClick = (arg) => {
//         const title = prompt('일정을 입력하세요:');
//         if (title) {
//             setEvents([...events, { title, date: arg.dateStr }]);
//         }
//     };
//
//     // 뷰 변경 핸들러
//     const handleViewChange = (event) => {
//         setView(event.target.value);
//     };
//
//     return (
//         <div className="calendar-container">
//             {/* 드롭다운으로 뷰 선택 */}
//             <div className="view-selector">
//                 <label htmlFor="view-select">보기: </label>
//                 <select id="view-select" onChange={handleViewChange} value={view}>
//                     <option value="dayGridMonth">월간 보기</option>
//                     <option value="dayGridWeek">주간 보기</option>
//                     <option value="timeGridDay">일간 보기</option>
//                 </select>
//             </div>
//
//             <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView={view}  // 드롭다운에서 선택된 뷰를 적용
//                 events={events}
//                 dateClick={handleDateClick}
//                 headerToolbar={{
//                     left: 'prev,next today',
//                     center: 'title',
//                     right: '' // 드롭다운으로 대체하므로 빈 값으로 설정
//                 }}
//                 locale="ko"
//                 editable={true}
//                 selectable={true}
//             />
//         </div>
//     );
// }
//
// export default Calendar_month;
