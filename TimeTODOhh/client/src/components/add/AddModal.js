import React, { useState } from 'react';
import Modal from 'react-modal';
import AddLabelModal from './AddLabelModal';
import CustomDropdown from './CustomDropdown';
import { FaTimes, FaCalendarAlt, FaBell, FaTag, FaExclamationCircle, FaClipboardList, FaSyncAlt } from 'react-icons/fa'; // 아이콘 추가
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave }) {
    const [activeTab, setActiveTab] = useState('일정');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [selectedLabel, setSelectedLabel] = useState({ name: '라벨 없음', color: '#808080' });
    const [priority, setPriority] = useState('우선순위 없음');
    const [repeat, setRepeat] = useState('반복 없음');
    const [reminder, setReminder] = useState('30분 전');
    const [description, setDescription] = useState('');
    const [labelOptions, setLabelOptions] = useState([
        { name: '라벨 없음', color: '#808080' },
        { name: '첫번째 라벨', color: '#FF6347' },
    ]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

    const handleSave = () => {
        if (title.trim() === '') {
            alert('제목을 입력하세요.');
            return;
        }

        const newTodo = {
            title,
            date,
            label: selectedLabel, // 선택된 라벨 객체를 저장
            priority,
            description,
        };

        onSave(newTodo);
        resetForm();
        onRequestClose();
    };

    const resetForm = () => {
        setTitle('');
        setDate('');
        setSelectedLabel({ name: '라벨 없음', color: '#808080' });
        setPriority('우선순위 없음');
        setDescription('');
    };

    const handleAddLabel = (newLabel) => {
        setLabelOptions([...labelOptions, newLabel]);
        setIsLabelModalOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className={styles.eventModal}
                overlayClassName={styles.eventModalOverlay}
            >
                <div className={styles.modalHeader}>
                    {/*<h2>{activeTab} 추가</h2>*/}
                    <FaTimes className={styles.closeIcon} onClick={onRequestClose}/>
                </div>


                <form className={styles.form}>
                    {/* 제목 */}
                    <label>
                        {/*제목*/}
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />

                    {/* 탭 전환 버튼 */}
                    <div className={styles.tabContainer}>
                        <button
                            type="button"
                            className={activeTab === '할 일' ? styles.activeTab : styles.inactiveTab}
                            onClick={() => setActiveTab('할 일')}
                        >
                            할 일
                        </button>
                        <button
                            type="button"
                            className={activeTab === '일정' ? styles.activeTab : styles.inactiveTab}
                            onClick={() => setActiveTab('일정')}
                        >
                            일정
                        </button>
                    </div>

                    {/* 날짜 */}
                    <label className={styles.label}>
                        <FaCalendarAlt className={styles.icon}/>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.input}
                        />
                    </label>

                    {/* 알림 설정 - 일정 전용 */}
                    {activeTab === '일정' && (
                        <>
                            <label className={styles.label}>
                                <FaBell className={styles.icon}/>
                                {/*알림 설정*/}
                                <select className={styles.select}
                                        value={reminder} onChange={(e) => setReminder(e.target.value)}>
                                    <option value="알림 없음">알림 없음</option>
                                    <option value="30분 전">30분 전</option>
                                    <option value="1시간 전">1시간 전</option>
                                    <option value="1일 전">1일 전</option>
                                </select>
                            </label>

                        </>
                    )}

                    {/* 라벨 */}
                    <label>라벨</label>
                    <CustomDropdown
                        options={labelOptions}
                        onLabelSelect={(option) => setSelectedLabel(option)}
                        onAddLabel={() => setIsLabelModalOpen(true)}
                    />

                    {/* 선택된 라벨 표시 */}
                    <div className={styles.selectedLabelDisplay}>
                        선택된 라벨: <span style={{color: selectedLabel.color}}>{selectedLabel.name}</span>
                    </div>

                    {/* 우선순위 */}
                    <label className={styles.label}>
                        <FaExclamationCircle className={styles.icon}/>
                        {/*우선순위*/}
                        <select className={styles.select}
                                value={priority} onChange={(e) => setPriority(e.target.value)}>
                            <option value="중요">중요</option>
                            <option value="일반">일반</option>
                            <option value="우선순위 없음">우선순위 없음</option>
                        </select>
                    </label>

                    {/* 설명 */}
                    <label className={styles.label}>
                        <FaClipboardList className={styles.icon}/>
                        {/*설명*/}
                        <textarea
                            className={styles.textarea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="설명을 입력하세요"
                        />
                    </label>

                    {/* 반복 설정 */}
                    <label className={styles.label}>
                        <FaSyncAlt className={styles.icon}/>
                        {/*반복*/}
                        <select className={styles.select}
                                value={repeat} onChange={(e) => setRepeat(e.target.value)}>
                            <option value="반복 없음">반복 없음</option>
                            <option value="매일">매일</option>
                            <option value="매주">매주</option>
                            <option value="매월">매월</option>
                        </select>
                    </label>

                    {/* 저장 버튼 */}
                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                </form>
            </Modal>

            {/* AddLabelModal 호출 */}
            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={handleAddLabel}
            />
        </>
    );
}

export default AddModal;
