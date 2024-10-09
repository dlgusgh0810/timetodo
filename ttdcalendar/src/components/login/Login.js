import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옵니다.
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 로그인 로직 처리 (여기서는 간단하게 로그인 성공 처리)
        if (username === 'admin' && password === '1234') {
            onLoginSuccess(); // 로그인 성공 시 부모 컴포넌트로 콜백 호출
            navigate('/home'); // 홈 페이지로 리다이렉트
        } else {
            alert('로그인 정보가 올바르지 않습니다.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>로그인</h2>
                <div className="form-group">
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">
                    로그인
                </button>
            </form>
        </div>
    );
}

export default Login;
