import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp'; // SignUp 컴포넌트를 불러옵니다.

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
