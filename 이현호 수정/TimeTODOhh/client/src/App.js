import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Todo from './components/todo/Todo';
import Stats from './components/stats/Stats';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Profile from './components/sidebar/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);  // 로그인 여부를 관리

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);  // 로그인 성공 시 true로 변경
    };

    return (
        <Router>
            <Routes>
                {/* 기본 경로 처리 */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 로그인 후에만 접근 가능한 페이지들 */}
                {isAuthenticated ? (
                    <>
                        <Route
                            path="/home"
                            element={
                                <div style={{ display: 'flex' }}>
                                    <Sidebar />  {/* 사이드바 표시 */}
                                    <div style={{ flex: 1, padding: '20px' }}>
                                        <Home />
                                    </div>
                                </div>
                            }
                        />
                        <Route
                            path="/calendar"
                            element={
                                <div style={{ display: 'flex' }}>
                                    <Sidebar />
                                    <div style={{ flex: 1, padding: '20px' }}>
                                        <Calendar />
                                    </div>
                                </div>
                            }
                        />
                        <Route
                            path="/todo"
                            element={
                                <div style={{ display: 'flex' }}>
                                    <Sidebar />
                                    <div style={{ flex: 1, padding: '20px' }}>
                                        <Todo />
                                    </div>
                                </div>
                            }
                        />
                        <Route
                            path="/stats"
                            element={
                                <div style={{ display: 'flex' }}>
                                    <Sidebar />
                                    <div style={{ flex: 1, padding: '20px' }}>
                                        <Stats />
                                    </div>
                                </div>
                            }
                        />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}


                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}

export default App;