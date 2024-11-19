import React, { useState } from "react";
import axios from "axios";

function ScheduleInput() {
    const [inputText, setInputText] = useState("");

    const handleAddSchedule = async () => {
        try {
            const response = await axios.post("/api/schedule/add", inputText);
            alert(response.data); // 서버에서 받은 성공 메시지
        } catch (error) {
            console.error("Error adding schedule", error);
            alert("일정 추가 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="일정을 입력하세요"
            />
            <button onClick={handleAddSchedule}>일정 추가</button>
        </div>
    );
}

export default ScheduleInput;

/*
이 코드가 하는 일
사용자가 입력한 자연어 일정을 inputText 상태로 관리합니다.
axios를 사용하여 /api/schedule/add 백엔드 API에 POST 요청을 보냅니다.
서버에서 받은 응답에 따라 성공/실패 메시지를 표시합니다.

 */