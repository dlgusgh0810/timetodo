import React, { useState } from 'react';
import styles from './SettingsModal.module.css';
import DarkModeSwitch from './DarkModeSwitch';

const SettingsModal = ({ isOpen, onClose, children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleToggle = () => {
        setIsDarkMode((prev) => !prev);
    };

    if (!isOpen) return null; // 모달이 닫힌 상태에서는 렌더링하지 않음

    return (
        <div
            className={`${styles.modalOverlay} ${
                isDarkMode ? styles.dark : ''
            }`}
        >
            <div
                className={`${styles.modalContent} ${
                    isDarkMode ? styles.dark : ''
                }`}
            >
                <h2>설정</h2>
                <div>
                    <p>다크모드</p>
                </div>
                <DarkModeSwitch
                    isDarkMode={isDarkMode}
                    onToggle={handleToggle}
                />
                {children}
                {onClose && (
                    <button onClick={onClose} className={styles.closeButton}>
                        닫기
                    </button>
                )}
            </div>
        </div>
    );
};

export default SettingsModal;
