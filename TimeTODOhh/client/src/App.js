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
import Chatbot from './components/ai/Chatbot';
import styles from './App.module.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [events, setEvents] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true); // 로그인 성공 시 true로 변경
    };

    // 새 일정을 추가하는 함수
    const addEvent = (eventData) => {
        const newEvent = {
            title: eventData.title,
            start: `${eventData.date}T${eventData.time}`, // 일정 날짜와 시간 형식
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 새 이벤트 추가
    };

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/signup" element={<SignUp />} />

                    {isAuthenticated ? (
                        <>
                            <Route
                                path="/home"
                                element={
                                    <div style={{ display: 'flex' }}>
                                        <Sidebar onAddEvent={addEvent} />
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
                                        <Sidebar onAddEvent={addEvent} />
                                        <div style={{ flex: 1, padding: '20px' }}>
                                            <Calendar events={events} />
                                        </div>
                                    </div>
                                }
                            />
                            <Route
                                path="/todo"
                                element={
                                    <div style={{ display: 'flex' }}>
                                        <Sidebar onAddEvent={addEvent} />
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
                                        <Sidebar onAddEvent={addEvent} />
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

            {isAuthenticated && (
                <div className={styles.chatbotWrapper}>
                    {/*챗봇 껐다켰다*/}
                    <button
                        className={styles.chatbotButton}
                        onClick={() => setShowChatbot(!showChatbot)}
                    >
                        Ai
                    </button>
                    {showChatbot && (
                        <div>
                            <Chatbot/>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default App;
