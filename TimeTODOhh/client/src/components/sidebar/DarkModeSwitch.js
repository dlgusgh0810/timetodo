// DarkModeSwitch.js
import React from 'react';
import styles from './DarkModeSwitch.module.css';

const DarkModeSwitch = ({ isDarkMode, onToggle }) => {
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={onToggle}
            />
            <span className={styles.slider}></span>
        </label>
    );
};

export default DarkModeSwitch;
