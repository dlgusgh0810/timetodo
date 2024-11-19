// Modal.js
import React from 'react';
import styles from './SettingsModal.module.css';

const SettingsModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // 모달이 닫힌 상태에서는 아무것도 렌더링하지 않음

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {children}
                <button onClick={onClose} className={styles.closeButton}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
