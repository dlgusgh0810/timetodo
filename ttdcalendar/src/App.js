import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Todo from './components/todo/Todo';
import Stats from './components/stats/Stats';
import Login from './components/login/Login';

function App() {
    // 로그인 상태 관리 (로그인 여부를 true/false로 관리)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 성공 시 호출되는 함수
    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // 로그인 상태를 true로 변경
    };

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* 로그인 상태에 따라 렌더링 */}
                {isLoggedIn ? (
                    <>
                        {/* 사이드바 및 페이지들 */}
                        <Sidebar />
                        <div style={{ flex: 1, padding: '20px' }}>
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/calendar" element={<Calendar />} />
                                <Route path="/todo" element={<Todo />} />
                                <Route path="/stats" element={<Stats />} />
                            </Routes>
                        </div>
                    </>
                ) : (
                    // 로그인 페이지
                    <Routes>
                        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
