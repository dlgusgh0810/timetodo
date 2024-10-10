import React, { useState } from 'react';
import './Signup.module.css';  // 필요한 스타일을 위한 CSS 파일

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // 회원가입 데이터를 서버로 전송하는 로직을 여기에 추가
        console.log('회원가입 정보:', { username, password, email });

        // 폼 제출 후 입력된 필드 초기화
        setUsername('');
        setPassword('');
        setEmail('');

        // 서버에 회원가입 요청 후 성공적인 응답 처리
        alert('회원가입이 완료되었습니다.');
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>회원가입</h2>
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
                <button type="submit" className="signup-button">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;
