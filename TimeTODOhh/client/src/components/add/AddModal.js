// AddModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // X 아이콘 추가
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave, selectedDate }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(selectedDate || '');
    const [time, setTime] = useState('');
    const [deadline, setDeadline] = useState('');
    const [notification, setNotification] = useState('30분 전');
    const [label, setLabel] = useState('');
    const [priority, setPriority] = useState('일반');
    const [description, setDescription] = useState('');
    const [repeat, setRepeat] = useState('반복 없음');

    const handleSave = () => {
        onSave({
            title,
            date,
            time,
            deadline,
            notification,
            label,
            priority,
            description,
            repeat,
        });
        setTitle('');
        setDate('');
        setTime('');
        setDeadline('');
        setNotification('30분 전');
        setLabel('');
        setPriority('일반');
        setDescription('');
        setRepeat('반복 없음');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.eventModal}
            overlayClassName={styles.eventModalOverlay}
        >
            <div className={styles.modalHeader}>
                <h2 className={h2}>일정 추가</h2>
                <FaTimes className={styles.closeIcon} onClick={onRequestClose} /> {/* X 아이콘 */}
            </div>
            <form>
                {/* 제목 */}
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="일정 제목을 입력하세요"
                />

                {/* 날짜 */}
                <label>날짜</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                {/* 시간 */}
                <label>시간</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                {/* 마감 기한 */}
                <label>마감 기한</label>
                <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="마감 기한 없음"
                />

                {/* 알림 설정 */}
                <label>알림 설정</label>
                <select value={notification} onChange={(e) => setNotification(e.target.value)}>
                    <option value="없음">없음</option>
                    <option value="10분 전">10분 전</option>
                    <option value="30분 전">30분 전</option>
                    <option value="1시간 전">1시간 전</option>
                </select>

                {/* 라벨 선택 */}
                <label>라벨 선택</label>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="라벨 추가..."
                />

                {/* 우선순위 */}
                <label>우선순위</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="중요">중요</option>
                    <option value="일반">일반</option>
                    <option value="우선순위 없음">우선순위 없음</option>
                </select>

                {/* 설명 */}
                <label>설명</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="설명 추가..."
                />

                {/* 반복 설정 */}
                <label>반복</label>
                <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
                    <option value="반복 없음">반복 없음</option>
                    <option value="매일">매일</option>
                    <option value="매주">매주</option>
                    <option value="매월">매월</option>
                </select>

                {/* 저장 버튼 */}
                <button type="button" onClick={handleSave}>저장</button>
            </form>
        </Modal>
    );
}

export default AddModal;