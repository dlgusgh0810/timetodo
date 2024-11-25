import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddLabelModal.module.css';

function AddLabelModal({ isOpen, onRequestClose, onSave }) {
    const [newLabel, setNewLabel] = useState('');

    const handleSave = () => {
        if (newLabel.trim() === '') {
            alert('라벨 이름을 입력하세요.');
            return;
        }
        onSave(newLabel); // 부모 컴포넌트로 라벨 전달
        setNewLabel('');
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
                />

                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    저장
                </button>
            </form>
        </Modal>
    );
}

export default AddLabelModal;
