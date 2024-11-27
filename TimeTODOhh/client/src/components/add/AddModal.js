import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import AddLabelModal from './AddLabelModal';
import CustomDropdown from './CustomDropdown';
import ReactDatePicker from 'react-datepicker'; // 시간 선택 추가
import 'react-datepicker/dist/react-datepicker.css'; // 시간 선택 스타일 추가
import { FaTimes, FaBell, FaExclamationCircle, FaClipboardList, FaSyncAlt } from 'react-icons/fa'; // 아이콘 추가
import styles from './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave, selectedDate, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab || '일정');
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date()); // 시작 시간 상태
    const [endDate, setEndDate] = useState(new Date()); // 종료 시간 상태
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [priority, setPriority] = useState('우선순위 없음');
    const [repeat, setRepeat] = useState('반복 없음');
    const [reminder, setReminder] = useState('30분 전');
    const [description, setDescription] = useState('');
    const [labelOptions, setLabelOptions] = useState([
        { name: '라벨 없음', color: '#808080' },
        { name: '첫번째 라벨', color: '#FF6347' },
    ]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab || '일정');
            setStartDate(selectedDate ? new Date(selectedDate) : new Date());
            setEndDate(new Date());
        }
    }, [isOpen, selectedDate, defaultTab]);

    const handleSave = () => {
        if (title.trim() === '') {
            alert('제목을 입력하세요.');
            return;
        }

        const newTodo = {
            title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            label: selectedLabel,
            priority,
            repeat,
            reminder: activeTab === '일정' ? reminder : undefined,
            description,
        };

        onSave(newTodo);
        resetForm();
        onRequestClose();
    };

    const resetForm = () => {
        setTitle('');
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedLabel('라벨 없음');
        setPriority('우선순위 없음');
        setDescription('');
        setRepeat('반복 없음');
        setReminder('30분 전');
    };

    const handleAddLabel = (newLabel) => {
        setLabelOptions((prevOptions) => [...prevOptions, newLabel]);
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
                    <FaTimes className={styles.closeIcon} onClick={onRequestClose} />
                </div>

                <form className={styles.form}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />

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

                    {/* 시작 시간과 종료 시간 선택 */}
                    <label className={styles.label}>
                        시작 시간
                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />
                    </label>

                    <label className={styles.label}>
                        종료 시간
                        <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />
                    </label>

                    {activeTab === '일정' && (
                        <label className={styles.label}>
                            <FaBell className={styles.icon} />
                            <select
                                className={styles.select}
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                            >
                                <option value="알림 없음">알림 없음</option>
                                <option value="30분 전">30분 전</option>
                                <option value="1시간 전">1시간 전</option>
                                <option value="1일 전">1일 전</option>
                            </select>
                        </label>
                    )}

                    <label>라벨</label>
                    <CustomDropdown
                        options={labelOptions}
                        onLabelSelect={(label) => setSelectedLabel(label.name)}
                        onAddLabel={() => setIsLabelModalOpen(true)}
                    />

                    <div className={styles.selectedLabelDisplay}>
                        선택된 라벨: {selectedLabel}
                    </div>

                    <label className={styles.label}>
                        <FaExclamationCircle className={styles.icon} />
                        <select
                            className={styles.select}
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="우선순위 없음">우선순위 없음</option>
                            <option value="중요">중요</option>
                            <option value="일반">일반</option>
                        </select>
                    </label>

                    <label className={styles.label}>
                        <FaClipboardList className={styles.icon} />
                        <textarea
                            className={styles.textarea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="설명을 입력하세요"
                        />
                    </label>

                    <label className={styles.label}>
                        <FaSyncAlt className={styles.icon} />
                        <select
                            className={styles.select}
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                        >
                            <option value="반복 없음">반복 없음</option>
                            <option value="매일">매일</option>
                            <option value="매주">매주</option>
                            <option value="매월">매월</option>
                        </select>
                    </label>

                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                </form>
            </Modal>

            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={handleAddLabel}
            />
        </>
    );
}

export default AddModal;
