import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddLabelModal.module.css';

function AddLabelModal({ isOpen, onRequestClose, onSave }) {
    const [newLabel, setNewLabel] = useState('');
    const [newLabelColor, setNewLabelColor] = useState('#808080'); // 기본 색상: 회색

    const handleSave = () => {
        if (newLabel.trim() === '') {
            alert('라벨 이름을 입력하세요.');
            return;
        }
        if (!newLabelColor) {
            alert('라벨 색상을 선택하세요.');
            return;
        }
        onSave({ name: newLabel, color: newLabelColor }); // 부모 컴포넌트로 라벨과 색상 전달
        setNewLabel('');
        setNewLabelColor('#808080'); // 기본 색상으로 초기화
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.labelModal}
            overlayClassName={styles.labelModalOverlay}
        >
            <div className={styles.modalHeader}>
                <button onClick={onRequestClose} className={styles.closeButton}>
                    닫기
                </button>
            </div>

            <form className={styles.form}>
                <label>새 라벨 이름</label>
                <input
                    type="text"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="라벨 이름을 입력하세요"
                    className={styles.input}
                />

                <label>라벨 색상 선택</label>
                <input
                    type="color"
                    value={newLabelColor}
                    onChange={(e) => setNewLabelColor(e.target.value)}
                    className={styles.colorPicker}
                />

                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    저장
                </button>
            </form>
        </Modal>
    );
}

export default AddLabelModal;
