import React, { useEffect, useState } from "react";
import axios from "axios";

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const response = await axios.get("/api/schedule/list"); // 백엔드 API 호출
            setSchedules(response.data); // 일정 리스트를 상태에 저장
        };
        fetchSchedules();
    }, []);

    return (
        <ul>
            {schedules.map((schedule) => (
                <li key={schedule.id}>
                    {schedule.title} - {schedule.date} {schedule.time}
                </li>
            ))}
        </ul>
    );
}

export default ScheduleList;

/*
이 코드가 하는 일
useEffect로 컴포넌트가 렌더링될 때 일정 데이터를 가져옵니다.
백엔드 API에서 받은 데이터를 리스트 형태로 표시합니다.
 */