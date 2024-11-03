import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaChartBar, FaBell, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import AddModal from '../add/AddModal'; // AddModal 컴포넌트 임포트
import styles from './Sidebar.module.css';

const Sidebar = ({ onAddEvent }) => {
    const [isProfileVisible, setProfileVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleProfile = () => {
        setProfileVisible(!isProfileVisible);
    };

    const handleLogout = () => {
        navigate("/login");
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSaveEvent = (eventData) => {
        onAddEvent(eventData); // 부모 컴포넌트로 일정 데이터 전달
        closeModal(); // 모달 닫기
    };

    return (
        <div className={styles.sidebar}>
            {/* 추가 버튼 */}
            <button onClick={openModal}>추가</button>

            {/* 사용자 프로필 섹션 */}
            <div className={styles.profileSection} onClick={toggleProfile}>
                <img src="https://via.placeholder.com/50" alt="profile" className={styles.profileImage} />
                <div className={styles.profileInfo}>
                    <span className={styles.username}>kimdiyong</span>
                    <FaChevronDown
                        className={styles.dropdownIcon}
                        style={{ transform: isProfileVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    />
                    <FaBell className={styles.notificationIcon} />
                </div>
            </div>

            {isProfileVisible && <Profile />}

            {/* 네비게이션 메뉴 */}
            <nav className={styles.menu}>
                <ul>
                    <li>
                        <Link to="/home" className={styles.menuLink}>
                            <FaHome className={styles.menuIcon} /> 홈
                        </Link>
                    </li>
                    <li>
                        <Link to="/calendar" className={styles.menuLink}>
                            <FaCalendarAlt className={styles.menuIcon} /> 캘린더
                        </Link>
                    </li>
                    <li>
                        <Link to="/todo" className={styles.menuLink}>
                            <FaClipboardList className={styles.menuIcon} /> 할 일
                        </Link>
                    </li>
                    <li>
                        <Link to="/stats" className={styles.menuLink}>
                            <FaChartBar className={styles.menuIcon} /> 통계
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* AddModal - 모달 열림 여부에 따라 표시 */}
            <AddModal isOpen={isModalOpen} onRequestClose={closeModal} onSave={handleSaveEvent} />
        </div>
    );
};

export default Sidebar;
