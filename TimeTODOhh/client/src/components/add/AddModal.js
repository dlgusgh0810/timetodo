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
    // 공통 상태
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [labelOptions, setLabelOptions] = useState([{ name: '라벨 없음', color: '#808080' }]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

    // 일정 관련 상태
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [reminder, setReminder] = useState('30분 전');
    const [repeat, setRepeat] = useState('반복 없음');

    // 할 일 관련 상태
    const [deadline, setDeadline] = useState(new Date());

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

    // 저장 핸들러
    const handleSave = async () => {
        if (!title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        // 데이터 구성
        const newEvent = {
            title,
            description: description || null,
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString(),
            location: selectedLabel, // 선택된 라벨을 location으로 사용 (필요 시 수정 가능)
            repeatType: repeat === '반복 없음' ? null : repeat, // 반복 없음은 null로 처리
            color: labelOptions.find((label) => label.name === selectedLabel)?.color || '#808080', // 라벨 색상
        };

        try {
            const response = await fetch('http://localhost:8085/api/calendar/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error('Failed to save data to backend');
            }

            const savedEvent = await response.json();
            console.log('Response from backend:', savedEvent);

            // FullCalendar에 추가할 데이터 형식
            onSave({
                id: savedEvent.calendarId,
                title: savedEvent.title,
                start: savedEvent.startTime,
                end: savedEvent.endTime,
                description: savedEvent.description,
                location: savedEvent.location,
                color: savedEvent.color,
                repeatType: savedEvent.repeatType,
            });

            resetForm();
            onRequestClose();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('데이터 저장에 실패했습니다.');
        }
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

    // 라벨 추가 핸들러
    const handleAddLabel = async (newLabel) => {
        try {
            if (!newLabel.name || !newLabel.color) {
                alert("라벨 이름과 색상을 입력해주세요.");
                return;
            }

            const duplicate = labelOptions.some((label) => label.name === newLabel.name);
            if (duplicate) {
                alert("이미 존재하는 라벨입니다.");
                return;
            }

            await axios.post("/api/categories/add", {
                categoryName: newLabel.name,
                color: newLabel.color,
            });

            setLabelOptions((prevOptions) => [...prevOptions, newLabel]);
            setIsLabelModalOpen(false);
        } catch (error) {
            console.error("라벨 추가 실패:", error);
            alert("라벨 추가에 실패했습니다.");
        }
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
                        className={activeTab === "할 일" ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setActiveTab("할 일")}
                    >
                        할 일
                    </button>
                    <button
                        type="button"
                        className={activeTab === "일정" ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setActiveTab("일정")}
                    >
                        일정
                    </button>
                </div>

                {defaultTab === '일정' && (
                    <>
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
                        <label className={styles.label}>
                            <FaSyncAlt className={styles.icon}/>
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
                        <label className={styles.label}>
                            <FaBell className={styles.icon}/>
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
                    </>
                )}

                {defaultTab === '할 일' && (
                    <label className={styles.label}>
                        마감 기한
                        <ReactDatePicker
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            showTimeSelect
                            dateFormat="yyyy-MM-dd h:mm aa"
                            className={styles.datePicker}
                        />
                    </label>
                )}

                <label>라벨</label>
                <CustomDropdown
                    options={labelOptions}
                    onLabelSelect={(label) => setSelectedLabel(label.name)}
                    onAddLabel={() => setIsLabelModalOpen(true)}
                />

                <label className={styles.label}>
                    <FaExclamationCircle className={styles.icon}/>
                    <select
                        className={styles.select}
                        value={priority || "우선순위 없음"}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="우선순위 없음">우선순위 없음</option>
                        <option value="중요">중요</option>
                        <option value="일반">일반</option>
                    </select>
                </label>

                <label className={styles.label}>
                    <FaClipboardList className={styles.icon}/>
                    <textarea
                        className={styles.textarea}
                        value={description || ''}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="설명을 입력하세요"
                    />
                </label>

                <button type="button" onClick={handleSave} className={styles.saveButton}>
                    저장
                </button>
            </form>

            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={handleAddLabel}
            />
        </Modal>
    );
}

export default AddModal;
