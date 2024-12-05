import React, { useState } from 'react';
import axios from 'axios'; // axios를 사용하여 서버로 데이터를 보냅니다.
import styles from './SignUp.module.css';
import { Link } from 'react-router-dom'; // 페이지 이동을 위한 Link 컴포넌트

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
            const response = await axios.post('/api/user/signup', formData);
            console.log(response.data); // 성공 시 백엔드에서의 응답 확인
            alert('회원가입이 성공적으로 완료되었습니다.');
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Sign Up
                </button>
                {/*{error && <p className={styles.error}>{error}</p>}*/}
                <div className={styles.linkContainer}>
                    <p>이미 계정이 있으신가요?</p>
                    <Link to="/login" className={styles.link}>
                        로그인 페이지로 이동
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
