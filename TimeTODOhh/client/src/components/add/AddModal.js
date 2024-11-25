import React, { useState } from 'react';
import Modal from 'react-modal';
import AddLabelModal from './AddLabelModal'; // 새 모달 컴포넌트 추가
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
    const [labelOptions, setLabelOptions] = useState([
        "라벨 없음",
        "첫번째 라벨",
        "두번째 라벨",
    ]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false); // 라벨 모달 상태

    const handleAddLabel = (newLabel) => {
        setLabelOptions([...labelOptions, newLabel]);
        setIsLabelModalOpen(false); // 라벨 추가 후 모달 닫기
    };

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
        setPriority('우선순위 없음'); // 수정
        setDescription('');
        setRepeat('반복 없음');
        setReminder('30분 전');
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
                    <button onClick={onRequestClose} className={styles.closeButton}>
                        닫기
                    </button>
                </div>

                <form className={styles.form}>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />

                    <label>라벨</label>
                    {/*<div className={styles.scrollableLabelContainer}>*/}
                    {/*    <select value={label} onChange={(e) => setLabel(e.target.value)} size={6}>*/}
                    {/*        {labelOptions.map((option, index) => (*/}
                    {/*            <option key={index} value={option}>*/}
                    {/*                {option}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </select>*/}
                    {/*    <button*/}
                    {/*        type="button"*/}
                    {/*        className={styles.addLabelButton}*/}
                    {/*        onClick={() => setIsLabelModalOpen(true)} // 라벨 추가 모달 열기*/}
                    {/*    >*/}
                    {/*        + 라벨 추가*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <FormField label="라벨">
                        <div className={styles.scrollableLabelContainer}>
                            <select value={label} onChange={(e) => setLabel(e.target.value)} size={6}>
                                {labelOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
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
                    </FormField>

                    <label>우선순위</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="중요">중요</option>
                        <option value="일반">일반</option>
                        <option value="우선순위 없음">우선순위 없음</option>
                    </select>

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

            {/* 라벨 추가 모달 */}
            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={handleAddLabel}
            />
        </>
    );
}

export default AddModal;
