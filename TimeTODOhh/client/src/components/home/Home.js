import React from 'react';
import TodayTodo from './TodayTodo';
import TodayCalendar from "./TodayCalendar";
import styles from "./Home.module.css";

function Home() {

    // region  const 제목 날짜 관련
        // 현재 날짜와 요일 가져오기
        const currentDate = new Date();

        // 날짜 포맷 설정 (예: "2024년 12월 5일 목요일")
        const dateOptions = {year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'};
        const formattedDate = currentDate.toLocaleDateString('ko-KR', dateOptions);

    // endregion

        return (
            <>
                {/*제목 : 현재 날짜*/}
                <h1>{formattedDate}</h1>

                {/* 대시보드 영역 */}
                <div className={styles.dashBoard}>
                    <div className={styles.TodoContainer}>
                        <TodayTodo/>
                    </div>

                    <div className={styles.CalendarContainer}>
                        <TodayCalendar/>
                    </div>
                </div>
            </>
        );

    }
    export default Home;
