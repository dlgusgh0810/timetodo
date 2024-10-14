import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Todo from './components/todo/Todo';
import Stats from './components/stats/Stats';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Profile from "./components/sidebar/Profile";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // 로그인 여부를 관리

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);  // 로그인 성공 시 true로 변경
    };

    return (
        <Router>
            <Routes>
                {/* 로그인 상태가 true일 때만 사이드바와 홈을 렌더링 */}
                {isAuthenticated ? (
                    <Route
                        path="*"
                        element={
                            <div style={{ display: 'flex' }}>
                                <Sidebar />  {/* 사이드바 표시 */}
                                <div style={{ flex: 1, padding: '20px' }}>
                                    <Routes>
                                        <Route path="/home" element={<Home />} />
                                        <Route path="/calendar" element={<Calendar />} />
                                        <Route path="/todo" element={<Todo />} />
                                        <Route path="/stats" element={<Stats />} />
                                        <Route path="*" element={<Navigate to="/home" />} /> {/* 기본 경로로 이동 */}
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                ) : (
                    <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                )}
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;
