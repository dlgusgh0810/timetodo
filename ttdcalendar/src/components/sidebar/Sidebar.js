import { FaHome, FaCalendarAlt, FaClipboardList, FaChartBar, FaPlus, FaBell, FaChevronDown } from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom'; // react-router-dom에서 Link 가져오기
import styles from './Sidebar.module.css';

const Sidebar = function () {
    const navigate = useNavigate();
    const handleLogout = () => {navigate("/login"); };

    return (
        <>
            <div className={styles.sidebar}>
                {/* 사용자 프로필 섹션 */}
                <div className={styles.profileSection}>
                    <img src="<https://via.placeholder.com/50>" alt="profile" className={styles.profileImage} />
                    <div className={styles.profileInfo}>
                        <span className={styles.username}>kimdiyong</span>
                        <FaChevronDown className={styles.dropdownIcon} onClick={handleLogout} /> {/* 클릭하면 로그아웃 */}
                        <FaBell className={styles.notificationIcon} />
                    </div>
                </div>

                {/* 추가하기 버튼 */}
                <div className={styles.addSection}>
                    <button className={styles.addButton}>
                        <FaPlus className={styles.addIcon} /> 추가하기
                    </button>
                </div>

                {/* 네비게이션 메뉴 */}
                <nav className={styles.menu}>
                    <div className={styles.menuSection}>
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
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
