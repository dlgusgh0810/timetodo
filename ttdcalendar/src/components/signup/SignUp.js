import React, { useState } from 'react';
import axios from 'axios'; // axios를 사용하여 서버로 데이터를 보냅니다.

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
            console.log(response.data); // 성공 시 백엔드에서의 응답 확인
            alert('회원가입이 성공적으로 완료되었습니다.');
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
