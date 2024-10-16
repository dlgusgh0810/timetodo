import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.module.css';

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
        <div className="login-page">
            <div className="circle circle-1"></div> {/* 배경 원 추가 */}
            <div className="circle circle-2"></div> {/* 배경 원 추가 */}

            <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-text">로그인</h2>
                    <div className="form-group">
                        <input
                            type="text"
                            id="username"
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        로그인
                    </button>

                    <p className="signup-link">
                        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
