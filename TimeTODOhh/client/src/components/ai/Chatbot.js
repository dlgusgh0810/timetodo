import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import axios from "axios";

function Chatbot(userId) {
    const [messages, setMessages] = useState([]); // 대화 메시지 목록
    const [inputMessage, setInputMessage] = useState(''); // 사용자 입력 메시지

    // 메시지 영역을 참조하기 위한 ref
    const chatBodyRef = useRef(null);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = { sender: 'user', text: inputMessage };

        // 사용자 메시지를 화면에 추가
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // 입력 필드 초기화
        setInputMessage('');

        try {
            // OpenAI API 호출
            const response = await axios.post('/api/chat/add', {
                inputText: inputMessage, // 사용자가 입력한 메시지
            });

            // 챗봇의 응답
            const botMessage = {
                sender: 'bot',
                text: response.data, // OpenAI API 응답 텍스트
            };

            // 챗봇 응답을 화면에 추가
            setMessages((prevMessages) => [...prevMessages, botMessage]);

        } catch (error) {
            console.error('Error sending message to AI:', error);
            const botMessage = {
                sender: 'bot',
                text: "오류가 발생했습니다. 다시 시도해 주세요.",
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
    };

    // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]); // messages가 변경될 때마다 실행
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

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
                    onKeyDown={handleKeyPress}
                />
                <button className={styles.sendButton} onClick={handleSendMessage}>
                    전송
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
