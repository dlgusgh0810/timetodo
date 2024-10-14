import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'kimdiyong' && password === '1234') {
            onLoginSuccess(); // 로그인 성공 콜백 호출
            navigate('/home'); // 메인 페이지로 리다이렉트
        } else {
            alert('로그인 정보가 올바르지 않습니다.');
        }
    };

    return (
        <div className="login-container">s
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

                {/* 회원가입 페이지로 이동하는 텍스트 링크 */}
                <p className="signup-link">
                    아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
