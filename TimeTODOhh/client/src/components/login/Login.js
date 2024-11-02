import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD:ttdcalendar/src/components/login/Login.js
import styles from './Login.module.css';  // CSS 모듈 임포트
=======
import styles from './Login.module.css';
>>>>>>> FollowingHyenho:TimeTODOhh/client/src/components/login/Login.js

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
<<<<<<< HEAD:ttdcalendar/src/components/login/Login.js
        <div className={styles.loginPage}> {/* className 수정 */}
            <div className={`${styles.circle} ${styles.circle1}`}></div> {/* 배경 원 추가 */}
            <div className={`${styles.circle} ${styles.circle2}`}></div> {/* 배경 원 추가 */}

            <div className={styles.loginContainer}> {/* className 수정 */}
                <form onSubmit={handleSubmit} className={styles.loginForm}> {/* className 수정 */}
                    <h2 className={styles.loginText}>로그인</h2> {/* className 수정 */}
                    <div className={styles.formGroup}> {/* className 수정 */}
                        <input
=======
        <div className={styles.loginPage}>
            <div className={styles.circle1}></div> {/* 배경 원 추가 */}
            <div className={styles.circle2}></div> {/* 배경 원 추가 */}

            <div className={styles.loginContainer}>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <h2 className="login-text">로그인</h2>
                    <div className={styles.formGroup}>
                        <input className={styles.loginText}
>>>>>>> FollowingHyenho:TimeTODOhh/client/src/components/login/Login.js
                            type="text"
                            id="username"
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

<<<<<<< HEAD:ttdcalendar/src/components/login/Login.js
                    <div className={styles.formGroup}> {/* className 수정 */}
                        <input
=======
                    <div className={styles.formGroup}>
                        <input className={styles.loginText}
>>>>>>> FollowingHyenho:TimeTODOhh/client/src/components/login/Login.js
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        로그인
                    </button>

                    <p className={styles.signupLink}>
                        아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
