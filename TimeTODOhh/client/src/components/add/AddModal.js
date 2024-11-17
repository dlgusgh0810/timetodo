import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaCalendarAlt, FaBell, FaTag, FaExclamationCircle, FaSyncAlt, FaClipboardList } from 'react-icons/fa';
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave }) {
    const [activeTab, setActiveTab] = useState('일정');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [label, setLabel] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [description, setDescription] = useState('');
    const [repeat, setRepeat] = useState('반복 없음');
    const [reminder, setReminder] = useState('30분 전');

    const handleSave = () => {
        if (title.trim() === '') {
            alert('제목을 입력해주세요.');
            return;
        }
        const newTodo = {
            type: activeTab,
            title,
            date,
            label,
            priority,
            description,
            repeat,
            reminder: activeTab === '일정' ? reminder : undefined,
        };
        onSave(newTodo);
        resetForm();
        onRequestClose();
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setLabel('');
        setPriority('일반');
        setDescription('');
        setRepeat('반복 없음');
        setReminder('30분 전');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.eventModal}
            overlayClassName={styles.eventModalOverlay}
        >
            <div className={styles.modalHeader}>
                {/*<h2>{activeTab} 추가</h2>*/}
                <FaTimes className={styles.closeIcon} onClick={onRequestClose} />
            </div>



            <form className={styles.form}>
                {/* 제목 */}
                <label>
                    {/*제목*/}
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />

                {/* 탭 전환 버튼 */}
                <div className={styles.tabContainer}>
                    <button
                        type="button"
                        className={activeTab === '할 일' ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setActiveTab('할 일')}
                    >
                        할 일
                    </button>
                    <button
                        type="button"
                        className={activeTab === '일정' ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setActiveTab('일정')}
                    >
                        일정
                    </button>
                </div>

                {/* 날짜 */}
                <label>
                    <FaCalendarAlt className={styles.icon} />
                    {/*날짜*/}
                </label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                {/* 알림 설정 - 일정 전용 */}
                {activeTab === '일정' && (
                    <>
                        <label>
                            <FaBell className={styles.icon} />
                            {/*알림 설정*/}
                        </label>
                        <select value={reminder} onChange={(e) => setReminder(e.target.value)}>
                            <option value="알림 없음">알림 없음</option>
                            <option value="30분 전">30분 전</option>
                            <option value="1시간 전">1시간 전</option>
                            <option value="1일 전">1일 전</option>
                        </select>
                    </>
                )}

                {/* 라벨 */}
                <label>
                    <FaTag className={styles.icon} />
                    {/*라벨*/}
                </label>
                <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="라벨 추가..."
                />

                {/* 우선순위 */}
                <label>
                    <FaExclamationCircle className={styles.icon} />
                    {/*우선순위*/}
                </label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="중요">중요</option>
                    <option value="일반">일반</option>
                    <option value="우선순위 없음">우선순위 없음</option>
                </select>

                {/* 설명 */}
                <label>
                    <FaClipboardList className={styles.icon} />
                    {/*설명*/}
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="설명을 입력하세요"
                />

                {/* 반복 설정 */}
                <label>
                    <FaSyncAlt className={styles.icon} />
                    {/*반복*/}
                </label>
                <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
                    <option value="반복 없음">반복 없음</option>
                    <option value="매일">매일</option>
                    <option value="매주">매주</option>
                    <option value="매월">매월</option>
                </select>

                {/* 저장 버튼 */}
                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    저장
                </button>
            </form>
        </Modal>
    );
}

export default AddModal;
