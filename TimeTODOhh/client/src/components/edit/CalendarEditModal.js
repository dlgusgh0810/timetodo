import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes, FaTag, FaSyncAlt, FaClipboardList, FaClock } from 'react-icons/fa';
import CustomDropdown from '../add/CustomDropdown';
import AddLabelModal from '../add/AddLabelModal';
import styles from '../add/AddModal.module.css';
import axios from "axios";

Modal.setAppElement("#root");

function CalendarEditModal({ isOpen, onRequestClose, onSave, onDelete, selectedEvent }) {
    // 상태 정의
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [labelOptions, setLabelOptions] = useState([{ id: null, name: '라벨 없음', color: '#808080' }]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [repeat, setRepeat] = useState('반복 없음');
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);
    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
    // 라벨 데이터 불러오기
    useEffect(() => {
        if (isOpen) {
            fetch("/api/categories/all")
                .then((res) => res.json())
                .then((categories) => {
                    const formattedCategories = categories.map((category) => ({
                        id: category.categoryId,
                        name: category.categoryName,
                        color: category.color,
                    }));
                    setLabelOptions(formattedCategories);
                })
                .catch((error) => console.error("라벨 불러오기 실패:", error));
        }
    }, [isOpen]);

    // selectedEvent 데이터로 상태 초기화
    useEffect(() => {
        if (selectedEvent) {
            setTitle(selectedEvent.title || '');
            setDescription(selectedEvent.description || '');
            setStartDate(new Date(selectedEvent.start));
            setEndDate(selectedEvent.end ? new Date(selectedEvent.end) : null);
            setSelectedLabel(selectedEvent.labelName || '라벨 없음');
            setSelectedCategoryId(selectedEvent.categoryId || null);
            setStartDate(new Date());
            setEndDate(new Date());
            setRepeat(selectedEvent.repeat || '반복 없음');
        } else {
            // 초기화
            setTitle('');
            setDescription('');
            setSelectedLabel('라벨 없음');
            setSelectedCategoryId(null);
            setStartDate(new Date());
            setEndDate(new Date());
            setRepeat('반복 없음');
        }
    }, [selectedEvent]);

    // 저장 핸들러
    const handleSave = async () => {
        if (!selectedEvent || !selectedEvent.id) {
            alert("선택된 이벤트가 없습니다.");
            return;
        }

        // 요청 데이터 구성
        const eventData = {
            calendarId: selectedEvent.id, // 이벤트 ID
            calendarRequestDto: {
                title: title.trim(),
                startTime: formatDateTime(startDate), // ISO8601 형식
                end_time: formatDateTime(endDate), // ISO8601 형식
                description: description || null,
                repeatType: repeat === "반복 없음" ? null : repeat, // 반복 설정
            },
            categoryId: selectedCategoryId, // 카테고리 ID
        };

        console.log("Sending eventData to update:", eventData);

        try {
            // 서버로 업데이트 요청
            const response = await axios.put(
                "/api/calendar/update", // 엔드포인트
                eventData, // 요청 본문
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Update response:", response.data);
            onSave(response.data); // 저장 후 상위 컴포넌트에 알림
            onRequestClose(); // 모달 닫기
        } catch (error) {
            console.error("Failed to update the event:", error.response || error);
            alert("일정 업데이트 중 오류가 발생했습니다.");
        }
    };



    // 삭제 핸들러
    const handleDelete = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(selectedEvent.id);
            onRequestClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.eventModal}
            overlayClassName={styles.eventModalOverlay}
        >
            <div className={styles.modalHeader}>
                <h2>일정 수정</h2>
                <FaTimes className={styles.closeIcon} onClick={onRequestClose} />
            </div>

            <form className={styles.form}>
                <input
                    className={styles.titleInput}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />

                <label>
                    <FaClock className={styles.icon} />
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className={styles.datePicker}
                    />
                    <ReactDatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className={styles.datePicker}
                    />
                </label>

                <label className={styles.flex}>
                    <FaTag className={styles.icon} />
                    <CustomDropdown
                        options={labelOptions}
                        onLabelSelect={(label) => {
                            setSelectedLabel(label.name);
                            setSelectedCategoryId(label.id);
                        }}
                        onAddLabel={() => setIsLabelModalOpen(true)}
                    />
                </label>

                <label className={styles.label}>
                    <FaSyncAlt className={styles.icon} />
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
                </label>

                <label className={styles.flex}>
                    <FaClipboardList className={styles.icon} />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="설명을 입력하세요"
                        className={styles.textarea}
                    />
                </label>

                <div className={styles.buttonGroup}>
                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        저장
                    </button>
                    <button type="button" onClick={handleDelete} className={styles.deleteButton}>
                        삭제
                    </button>
                </div>
            </form>

            <AddLabelModal
                isOpen={isLabelModalOpen}
                onRequestClose={() => setIsLabelModalOpen(false)}
                onSave={(newLabel) => {
                    setLabelOptions([...labelOptions, newLabel]);
                    setIsLabelModalOpen(false);
                }}
            />
        </Modal>
    );
}

export default CalendarEditModal;
