import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';

function Chatbot() {
    const [messages, setMessages] = useState([]); // 대화 메시지 목록
    const [inputMessage, setInputMessage] = useState(''); // 사용자 입력 메시지

    // 메시지 영역을 참조하기 위한 ref
    const chatBodyRef = useRef(null);

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage = { sender: 'user', text: inputMessage };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setInputMessage('');

        // 챗봇의 응답 바로 추가
        const botMessage = {
            sender: 'bot',
            text: `니가한말: "${inputMessage}"`,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
    };

    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]); // messages가 변경될 때마다 실행

    return (
        <div className={styles.chatbotContainer}>
            <div className={styles.chatHeader}>
                <h2>AI 챗봇</h2>
            </div>
            <div className={styles.chatBody} ref={chatBodyRef}>
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
