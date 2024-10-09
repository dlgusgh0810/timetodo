import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Home from './components/home/Home';
import Calendar from './components/calendar/Calendar';
import Todo from './components/todo/Todo';
import Stats from './components/stats/Stats';
import Login from './components/login/Login'

function App() {
    return (
        <Router>
            <div style={{display: 'flex'}}>
                {/*사이드바*/}
                <Sidebar/>
                <div style={{flex: 1, padding: '20px'}}>
                    <Routes>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/calendar" element={<Calendar/>}/>
                        <Route path="/todo" element={<Todo/>}/>
                        <Route path="/stats" element={<Stats/>}/>
                    </Routes>
                </div>
                {/* 로그인*/}
                <div className="App">
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                    </Routes>
                </div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} /> {/* 로그인 -> 홈 페이지로 이동 */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
