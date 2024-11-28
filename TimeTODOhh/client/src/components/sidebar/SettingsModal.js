import React, { useEffect, useState } from "react";
import styles from "./SettingsModal.module.css";
import DarkModeSwitch from "./DarkModeSwitch";
import axios from "axios";

const SettingsModal = ({ isOpen, onClose, children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 다크모드 상태를 서버에서 불러오기
    useEffect(() => {
        if (isOpen) {
            axios
                .get("/api/preferences")
                .then((response) => {
                    if (response.status === 200 && response.data.theme) {
                        setIsDarkMode(response.data.theme === "dark");
                    }
                })
                .catch((error) => {
                    console.error("다크모드 상태를 불러오는 데 실패했습니다.", error);
                });
        }
    }, [isOpen]);

    // 다크모드 상태를 서버에 저장
    const saveThemeToServer = (theme) => {
        axios
            .post("/api/preferences", { theme })
            .then(() => {
                console.log("다크모드 상태가 저장되었습니다.");
            })
            .catch((error) => {
                console.error("다크모드 상태를 저장하는 데 실패했습니다.", error);
            });
    };

    const handleToggle = () => {
        const newTheme = !isDarkMode ? "dark" : "light";
        setIsDarkMode(!isDarkMode);
        saveThemeToServer(newTheme); // 새로운 상태를 서버에 저장
    };

    if (!isOpen) return null;

    return (
        <div
            className={`${styles.modalOverlay} ${
                isDarkMode ? styles.dark : ""
            }`}
        >
            <div
                className={`${styles.modalContent} ${
                    isDarkMode ? styles.dark : ""
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
