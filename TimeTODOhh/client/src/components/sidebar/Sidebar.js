import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaChartBar, FaBell, FaChevronDown, FaPlus} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // 쿠키 관리 라이브러리

import Profile from './Profile';
import AddModal from '../add/AddModal';
import styles from './Sidebar.module.css';

const Sidebar = ({ onAddEvent }) => {
    const [isProfileVisible, setProfileVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // 쿠키에서 userId와 username 읽기
        const storedUserId = Cookies.get('userId'); // userId 읽기
        const storedUsername = Cookies.get('username'); // username 읽기

        console.log("쿠키에서 읽은 userId:", storedUserId);
        console.log("쿠키에서 읽은 username:", storedUsername);

        if (storedUserId) setUserId(storedUserId); // 상태에 저장
        if (storedUsername) setUsername(storedUsername); // 상태에 저장
    }, []);

    const toggleProfile = () => {
        setProfileVisible(!isProfileVisible);
    };

    const handleLogout = () => {
        // 로그아웃 시 쿠키 제거

        navigate("/login");
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSaveEvent = (eventData) => {
        onAddEvent(eventData);
        closeModal();
    };

    return (
        <div className={styles.sidebar}>

            {/* 사용자 프로필 섹션 */}
            <div className={styles.profileSection} onClick={toggleProfile}>
                <img src="https://via.placeholder.com/50" alt="profile" className={styles.profileImage}/>
                <div className={styles.profileInfo}>
                    {/* userID를 바로 표시 */}
                    <span className={styles.username}>
                        {username ? `${username}` : '로그인해주세요'}
                    </span>
                    <FaChevronDown
                        className={styles.dropdownIcon}
                        style={{
                            transform: isProfileVisible ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                        }}
                    />
                    {/*<FaBell className={styles.notificationIcon}/>*/}
                </div>
            </div>

            {isProfileVisible && <Profile handleLogout={handleLogout}/>}

            <button
                onClick={openModal}
                className={styles.addButton}>
                <FaPlus/>추가하기
            </button>

            <nav className={styles.menu}>
                <ul>
                    <li>
                        <Link to="/home" className={styles.menuLink}>
                            <FaHome className={styles.menuIcon}/> 홈
                        </Link>
                    </li>
                    <li>
                        <Link to="/calendar" className={styles.menuLink}>
                            <FaCalendarAlt className={styles.menuIcon}/> 캘린더
                        </Link>
                    </li>
                    <li>
                        <Link to="/todo" className={styles.menuLink}>
                            <FaClipboardList className={styles.menuIcon}/> 할 일
                        </Link>
                    </li>
                    <li>
                        <Link to="/stats" className={styles.menuLink}>
                            <FaChartBar className={styles.menuIcon}/> 통계
                        </Link>
                    </li>
                </ul>
            </nav>

            <AddModal isOpen={isModalOpen} onRequestClose={closeModal} onSave={handleSaveEvent}/>
        </div>
    );
};

export default Sidebar;