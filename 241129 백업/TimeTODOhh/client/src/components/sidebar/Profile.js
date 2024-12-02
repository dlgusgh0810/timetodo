import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import Modal from './SettingsModal';
import DarkModeSwitch from './DarkModeSwitch';

const Profile = ({ handleLogout }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <div className={styles.profileContainer}>
            <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
            </button>
            <button onClick={openModal}>
                설정
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>

            </Modal>
        </div>
    );
};

export default Profile;
