import React from 'react';
import styles from './Profile.module.css';

const Profile = ({ handleLogout }) => {
    return (
        <div className={styles.profileContainer}>
            <button onClick={handleLogout} className={styles.logoutButton}>
                로그아웃
            </button>
        </div>
    );
};

export default Profile;
