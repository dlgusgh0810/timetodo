import React, { useState } from 'react';
import Modal from 'react-modal';
import AddLabelModal from './AddLabelModal';
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave }) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [label, setLabel] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [description, setDescription] = useState('');
    const [labelOptions, setLabelOptions] = useState([
        { name: '라벨 없음', color: '#808080' },
        { name: '첫번째 라벨', color: '#FF6347' },
    ]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

    const handleSave = () => {
        if (title.trim() === '') {
            alert('제목을 입력하세요.');
            return;
        }

        const newTodo = {
            title,
            date,
            label,
            priority,
            description,
        };

        onSave(newTodo);
        resetForm();
        onRequestClose();
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setLabel('');
        setPriority('우선순위 없음');
        setDescription('');
    };

    const handleAddLabel = (newLabel) => {
        // 라벨 추가
        setLabelOptions([...labelOptions, newLabel]);
        setIsLabelModalOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={styles.eventModal}
                overlayClassName={styles.eventModalOverlay}
            >
                <div className={styles.modalHeader}>
                    <h2>새 일정 추가</h2>
                    <button onClick={onRequestClose} className={styles.closeButton}>
                        닫기
                    </button>
                </div>

                <form className={styles.form}>
                    {/* 제목 */}
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />

                    {/* 날짜 */}
                    <label>날짜</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    {/* 라벨 */}
                    <label>라벨</label>
                    <div className={styles.labelContainer}>
                        <select
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            className={styles.labelSelect}
                        >
                            {labelOptions.map((option, index) => (
                                <option key={index} value={option.name} style={{ color: option.color }}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className={styles.addLabelButton}
                            onClick={() => setIsLabelModalOpen(true)}
                        >
                            + 라벨 추가
                        </button>
                    </div>

                    {/* 우선순위 */}
                    <label>우선순위</label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="우선순위 없음">우선순위 없음</option>
                        <option value="중요">중요</option>
                        <option value="일반">일반</option>
                    </select>

                    {/* 설명 */}
                    <label>설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="설명을 입력하세요"
                    />

                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                </form>
            </Modal>

            {/* AddLabelModal 호출 */}
            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={handleAddLabel}
            />
        </>
    );
}

export default AddModal;
