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
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 선택한 카테고리 ID
    const [labelOptions, setLabelOptions] = useState([{ id: null, name: '라벨 없음', color: '#808080' }]);
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
                        id: category.categoryId, // 카테고리 ID
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


    const handleAddLabel = async (newLabel) => {
        try {
            if (!newLabel.name || !newLabel.name.trim()) {
                alert("라벨 이름을 입력해주세요.");
                return;
            }
            if (!newLabel.color) {
                alert("라벨 색상을 선택해주세요.");
                return;
            }

            const duplicate = labelOptions.some((label) => label.name === newLabel.name.trim());
            if (duplicate) {
                alert("이미 존재하는 라벨입니다.");
                return;
            }

            const response = await axios.post("/api/categories/add", {
                categoryName: newLabel.name.trim(),
                color: newLabel.color,
            });

            const savedLabel = response.data;
            console.log("Saved Label:", savedLabel); // 디버깅: 저장된 라벨 데이터 확인
            setLabelOptions((prevOptions) => [...prevOptions, savedLabel]);
            setIsLabelModalOpen(false);
        } catch (error) {
            console.error("라벨 추가 실패:", error);
            alert("라벨 추가에 실패했습니다.");
        }
    };

    const handleSaveTask = async () => {

        const formatDateTime = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        const newTask = {
            title: title.trim(),
            description: description || null,
            deadline: formatDateTime(deadline),
            priority: priority || '우선순위 없음',
            status: '보류 중',
            repeatType: repeat === '반복 없음' ? null : repeat, // 반복 설정 추가
            categoryId: selectedCategoryId,
        };

        try {
            const response = await axios.post(`http://localhost:8085/api/task/add`, newTask, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
                body: JSON.stringify(newTask),
                credentials: "include",
            });

            if (!response || !response.data) {
                throw new Error("응답 데이터가 없습니다.");
            }

            const savedData = response.data;

            // 부모 컴포넌트로 전달
            onSave({
                ...newTask,
                id: savedData.id, // 서버에서 반환된 ID 사용
            });

            resetForm();
            onRequestClose();
        } catch (error) {
            console.error("할 일 저장 오류:", error);
            alert("할 일을 저장하는 중 문제가 발생했습니다.");
        }
    };

    const handleSaveEvent = async () => {



        if (!title.trim()) {
            alert("제목을 입력하세요.");
        }

        const formatDateTime = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        // 선택한 카테고리 데이터 찾기
        const selectedCategory = labelOptions.find((label) => label.id === selectedCategoryId);

        if (!selectedCategory) {
            alert("라벨을 선택하세요.");
            return;
        }

        const newEvent = {
            title: title.trim(),
            description: description || null,
            startTime: formatDateTime(startDate),
            end_time: formatDateTime(endDate),
            location: selectedCategory.name, // 로케이션 값을 라벨 이름으로 설정
            repeatType: repeat === '반복 없음' ? null : repeat, // 반복 설정 추가
            categoryId: selectedCategoryId, // 선택된 카테고리 ID 전송
        };

        try {
            const response = await fetch('http://localhost:8085/api/calendar/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent),
                credentials: "include"
            });





            const savedEvent = await response.json();
            if (!savedEvent) {
                throw new Error('응답 데이터가 없습니다.');
            }
            onSave({
                id: savedEvent.calendarId,
                title: savedEvent.title,
                start: savedEvent.startTime,
                end: savedEvent.end_time,
                description: savedEvent.description,
                location: savedEvent.location, // FullCalendar에 로케이션 전달
                color: labelOptions.find((label) => label.id === savedEvent.categoryId)?.color || '#808080',
                repeatType: savedEvent.repeatType, // 반복 설정 전달

            });

            resetForm();
            onRequestClose();
        } catch (error) {
            console.error('Error saving data:', error);
            alert('데이터 저장에 실패했습니다.');
        }
    };


    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('우선순위 없음');
        setSelectedLabel('라벨 없음');
        setSelectedCategoryId(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setReminder('30분 전');
        setRepeat('반복 없음');
        setDeadline(new Date());
    };


    const handleLabelSelect = (label) => {
        setSelectedLabel(label.name);
        setSelectedCategoryId(label.id); // 선택한 카테고리 ID 저장
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.eventModal}
            overlayClassName={styles.eventModalOverlay}
        >
            <div className={styles.modalHeader}>
                <FaTimes className={styles.closeIcon} onClick={onRequestClose}/>
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
                    onLabelSelect={(label) => {
                        console.log("Selected Label Object:", label);
                        setSelectedLabel(label.name);
                        setSelectedCategoryId(label.id);
                    }}
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

                {activeTab === '할 일' && (
                    <button type="button" onClick={handleSaveTask} className={styles.saveButton}>
                        할 일 저장
                    </button>
                )}

                {activeTab === '일정' && (
                    <button type="button" onClick={handleSaveEvent} className={styles.saveButton}>
                        일정 저장
                    </button>
                )}
            </form>


            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={(label) => setLabelOptions([...labelOptions, label])}
            />
        </Modal>
    );
}

export default AddModal;
