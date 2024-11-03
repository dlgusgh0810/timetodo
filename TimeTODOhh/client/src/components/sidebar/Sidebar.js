import React, { useState } from 'react';
import { FaHome, FaCalendarAlt, FaClipboardList, FaChartBar, FaBell, FaChevronDown } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import AddModal from '../add/AddModal'; // AddModal 컴포넌트 임포트
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const [isProfileVisible, setProfileVisible] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([]); // FullCalendar에 표시할 이벤트 배열
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
        // FullCalendar에 추가할 이벤트 데이터 형식으로 변환
        const newEvent = {
            title: eventData.title,
            start: `${eventData.date}T${eventData.time}`, // 시작 날짜와 시간
            extendedProps: {
                location: eventData.location,
                description: eventData.description,
            },
        };
        setEvents([...events, newEvent]); // 이벤트 배열에 새 일정 추가
        closeModal();
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

            {/* FullCalendar */}
            <div className={styles.calendarContainer}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events} // 이벤트 배열 전달
                    locale="ko"
                />
            </div>

            {/* AddModal - 모달 열림 여부에 따라 표시 */}
            <AddModal isOpen={isModalOpen} onRequestClose={closeModal} onSave={handleSaveEvent} />
        </div>
    );
};

export default Sidebar;




// import React, { useState } from 'react';
// import { FaHome, FaCalendarAlt, FaClipboardList, FaChartBar, FaPlus, FaBell, FaChevronDown } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom'; // Link를 추가로 import
// import Profile from './Profile'; // Profile 컴포넌트를 import
// import styles from './Sidebar.module.css';
//
// const Sidebar = () => {
//     const [isProfileVisible, setProfileVisible] = useState(false); // 프로필 표시 여부 상태
//     const navigate = useNavigate();
//
//     const toggleProfile = () => {
//         setProfileVisible(!isProfileVisible); // 상태 토글
//     };
//
//     const handleLogout = () => {
//         navigate("/login");
//     };
//
//     return (
//         <div className={styles.sidebar}>
//
//             {/*임시 추가 버튼*/}
//             <button>추가</button>
//
//
//             {/* 사용자 프로필 섹션 */}
//             <div className={styles.profileSection} onClick={toggleProfile}>
//                 <img src="<https://via.placeholder.com/50>" alt="profile" className={styles.profileImage} />
//                 <div className={styles.profileInfo}>
//                     <span className={styles.username}>kimdiyong</span>
//                     {/* 화살표 아이콘을 상태에 따라 회전 */}
//                     <FaChevronDown
//                         className={styles.dropdownIcon}
//                         style={{ transform: isProfileVisible ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
//                     />
//                     <FaBell className={styles.notificationIcon} />
//                 </div>
//             </div>
//
//             {/* Profile 컴포넌트 - isProfileVisible이 true일 때만 보여줌 */}
//             {isProfileVisible && <Profile />}
//
//             {/* 네비게이션 메뉴 */}
//             <nav className={styles.menu}>
//                 <ul>
//                     <li>
//                         <Link to="/home" className={styles.menuLink}>
//                             <FaHome className={styles.menuIcon} /> 홈
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/calendar" className={styles.menuLink}>
//                             <FaCalendarAlt className={styles.menuIcon} /> 캘린더
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/todo" className={styles.menuLink}>
//                             <FaClipboardList className={styles.menuIcon} /> 할 일
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to="/stats" className={styles.menuLink}>
//                             <FaChartBar className={styles.menuIcon} /> 통계
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };
//
// export default Sidebar;
