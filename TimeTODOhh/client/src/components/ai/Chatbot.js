import React, { useState } from 'react';
import styles from './Chatbot.module.css';

function Chatbot() {
    const [messages, setMessages] = useState([]); // 대화 메시지 목록
    const [inputMessage, setInputMessage] = useState(''); // 사용자 입력 메시지

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        // 사용자의 메시지 추가
        const userMessage = { sender: 'user', text: inputMessage };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // 입력창 초기화
        setInputMessage('');

        // 챗봇의 응답 시뮬레이션
        setTimeout(() => {
            const botMessage = {
                sender: 'bot',
                text: `챗봇의 응답: "${inputMessage}"에 대해 더 많은 정보를 드릴게요!`,
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000); // 1초 후 응답
    };

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatHeader}>
                <h2>AI 챗봇</h2>
            </div>
            <div className={styles.chatBody}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.sender === 'user'
                                ? styles.userMessage
                                : styles.botMessage
                        }
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <div className={styles.chatFooter}>
                <input
                    type="text"
                    className={styles.chatInput}
                    placeholder="메시지를 입력하세요..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
