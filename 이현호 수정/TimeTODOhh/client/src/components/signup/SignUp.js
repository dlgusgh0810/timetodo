import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignUp.module.css'; // CSS 모듈 임포트

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 백엔드로 POST 요청을 보내는 코드
            const response = await axios.post('http://localhost:8080/api/signup', formData);
            console.log(response.data);
            alert('회원가입이 성공적으로 완료되었습니다.');
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.signupPage}>
            <div className={`${styles.circle} ${styles.circle1}`}></div>
            <div className={`${styles.circle} ${styles.circle2}`}></div>

            <div className={styles.signupContainer}>
                <form onSubmit={handleSubmit} className={styles.signupForm}>
                    <h2 className={styles.signupText}>회원가입</h2>

                    <div className={styles.formGroup}>
                        <input
                            type="text"
                            name="username"
                            placeholder="아이디"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.signupButton}>회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
