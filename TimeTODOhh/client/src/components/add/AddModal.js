import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes, FaBell, FaExclamationCircle, FaClipboardList, FaSyncAlt } from 'react-icons/fa';
import CustomDropdown from './CustomDropdown';
import AddLabelModal from './AddLabelModal';
import styles from './AddModal.module.css';

Modal.setAppElement("#root");

function AddModal({ isOpen, onRequestClose, onSave, defaultTab }) {
    //region 공통 상태
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [labelOptions, setLabelOptions] = useState([{ name: '라벨 없음', color: '#808080' }]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
    //endregion

    //region 일정 관련 상태
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reminder, setReminder] = useState('30분 전');
    const [repeat, setRepeat] = useState('반복 없음');
    //endregion

    //region 할 일 관련 상태
    const [deadline, setDeadline] = useState(new Date());
    //endregion

    // 디폴트 탭
    const [activeTab, setActiveTab] = useState(defaultTab || '일정');

    // 라벨 데이터 불러오기
    useEffect(() => {
        if (isOpen) {
            const fetchLabels = async () => {
                try {
                    const response = await axios.get("/api/categories/all");
                    const categories = response.data || [];
                    const formattedCategories = categories.map((category) => ({
                        name: category.categoryName,
                        color: category.color,
                    }));
                    setLabelOptions(formattedCategories);
                } catch (error) {
                    console.error("라벨 불러오기 실패:", error);
                }
            };
            fetchLabels();
        }
    }, [isOpen]);

    // 날짜 포맷팅 함수
    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    // 저장 함수 (비동기)
    const saveEventOrTask = async () => {
        if (!title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        let newEvent;
        if (activeTab === '일정') {
            newEvent = {
                title: title.trim(),
                description: description || null,
                startTime: formatDateTime(startDate),
                endTime: formatDateTime(endDate),
                location: selectedLabel || '기본 장소',
                repeatType: repeat === '반복 없음' ? null : repeat,
                color: labelOptions.find((label) => label.name === selectedLabel)?.color || '#808080',
            };
        } else {
            newEvent = {
                title: title.trim(),
                description: description || null,
                deadline: formatDateTime(deadline),
                priority,
                color: labelOptions.find((label) => label.name === selectedLabel)?.color || '#808080',
            };
        }

        try {
            const endpoint = activeTab === '일정' ? '/api/calendar/add' : '/api/tasks/add';
            const response = await axios.post(`http://localhost:8085${endpoint}`, newEvent, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (!response || !response.data) {
                throw new Error('응답 데이터가 없습니다.');
            }

            const savedData = response.data;
            onSave({
                id: savedData.id,
                ...newEvent,
            });

            resetForm();
            onRequestClose();
        } catch (error) {
            console.error('데이터 저장 오류:', error);
            alert('데이터 저장에 실패했습니다.');
        }
    };

    // 저장 버튼 핸들러
    const handleSaveClick = () => {
        saveEventOrTask(); // 비동기 함수 호출
    };

    // 폼 초기화
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('우선순위 없음');
        setSelectedLabel('라벨 없음');
        setStartDate(new Date());
        setEndDate(new Date());
        setReminder('30분 전');
        setRepeat('반복 없음');
        setDeadline(new Date());
    };

    // 렌더링
    return (
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
                        할 일 추가
                    </button>
                    <button
                        type="button"
                        className={activeTab === '일정' ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setActiveTab('일정')}
                    >
                        일정 추가
                    </button>
                </div>

                {activeTab === '일정' && (
                    <>
                        <label className={styles.label}>시작 시간</label>
                        <ReactDatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />

                        <label className={styles.label}>종료 시간</label>
                        <ReactDatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />
                    </>
                )}

                {activeTab === '할 일' && (
                    <>
                        <label className={styles.label}>마감 기한</label>
                        <ReactDatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />

                        <label className={styles.label}>
                            우선순위
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className={styles.select}
                            >
                                <option value="우선순위 없음">우선순위 없음</option>
                                <option value="중요">중요</option>
                                <option value="일반">일반</option>
                            </select>
                        </label>
                    </>
                )}

                <label>라벨</label>
                <CustomDropdown
                    options={labelOptions}
                    onLabelSelect={(label) => setSelectedLabel(label.name)}
                    onAddLabel={() => setIsLabelModalOpen(true)}
                />

                <label className={styles.label}>반복</label>
                <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className={styles.select}
                >
                    <option value="반복 없음">반복 없음</option>
                    <option value="매일">매일</option>
                    <option value="매주">매주</option>
                    <option value="매월">매월</option>
                </select>

                <label className={styles.label}>
                    설명
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="설명을 입력하세요"
                        className={styles.textarea}
                    />
                </label>

                <button type="button" onClick={handleSaveClick} className={styles.saveButton}>
                    저장
                </button>
            </form>

            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={(newLabel) => setLabelOptions((prev) => [...prev, newLabel])}
            />
        </Modal>
    );
}

export default AddModal;
