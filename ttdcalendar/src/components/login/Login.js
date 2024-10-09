import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 가져옵니다.
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

    const handleSubmit = (e) => {
        e.preventDefault();

        // 로그인 로직을 여기에서 처리합니다.
        console.log('Email:', email);
        console.log('Password:', password);

        // 로그인 성공 시 메인 페이지로 리다이렉트
        navigate('/home'); // 이 경로는 리다이렉트할 페이지 경로입니다.
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>로그인</h2>
                <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
