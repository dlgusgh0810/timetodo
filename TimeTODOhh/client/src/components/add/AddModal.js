// AddModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave, selectedDate }) {
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    const handleSave = () => {
        onSave({ title, date: selectedDate, time });
        setTitle('');
        setTime('');
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.eventModal} // 모듈 CSS 사용
            overlayClassName={styles.eventModalOverlay} // 모듈 CSS 사용
        >
            <h2>일정 추가</h2>
            <form>
                <label>제목</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="일정 제목을 입력하세요"
                />

                <label>시간</label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <button type="button" onClick={handleSave}>저장</button>
                <button type="button" onClick={onRequestClose}>취소</button>
            </form>
        </Modal>
    );
}

export default AddModal;
