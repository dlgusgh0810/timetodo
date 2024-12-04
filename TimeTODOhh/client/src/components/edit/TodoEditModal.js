import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from "axios";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes, FaExclamationCircle, FaHourglass, FaTag, FaSyncAlt } from 'react-icons/fa';
import CustomDropdown from '../add/CustomDropdown'; // 라벨 드롭다운
import styles from './TodoEditModal.module.css';

Modal.setAppElement("#root");

function TodoEditModal({ isOpen, onRequestClose, onSave, onDelete, task, labelOptions }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [deadline, setDeadline] = useState(new Date());
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const formatDateTime = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
    const [repeat, setRepeat] = useState('반복 없음'); // repeat 필드 추가

    // 선택된 할 일 데이터를 모달 상태로 초기화
    useEffect(() => {
        if (task) {
            console.log("Received Task:", task); // task 객체 확인
            setTitle(task.title || '');
            setPriority(task.priority || '우선순위 없음');
            setDeadline(task.dueDate ? new Date(task.dueDate) : new Date());
            setSelectedLabel(task.label || '라벨 없음');
            setSelectedCategoryId(task.categoryId || null);
            setRepeat(task.repeatType || '반복 없음'); // 반복 설정 초기화
        }
    }, [task]);

    const handleSave = async () => {
        if (!task || !task.taskId) {
            alert("선택된 할 일이 없습니다.");
            return;
        }

        // 요청 데이터 구성
        const taskData = {
            taskId: task.taskId, // taskId를 추가하여 백엔드로 전달
            title: title.trim(),
            priority,
            dueDate: formatDateTime(deadline),
            repeatType: repeat === '반복 없음' ? '' : repeat, // 반복 설정 저장
            status: task.status|| '보류 중',
        };

        console.log("Sending taskData to update:", taskData);

        try {
            // 서버로 업데이트 요청
            const response = await axios.put(
                `/api/task/update?categoryId=${encodeURIComponent(selectedCategoryId)}`, // 경로 변수 및 쿼리 파라미터 포함
                taskData, // 요청 본문
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Update response:", response.data);

            // 서버 응답 데이터를 반영
            const updatedTask = {
                taskId: response.data.taskId,
                title: response.data.title,
                priority: response.data.priority,
                dueDate: new Date(response.data.dueDate),
                label: labelOptions.find((label) => label.id === selectedCategoryId)?.name || "라벨 없음",
                labelColor: labelOptions.find((label) => label.id === selectedCategoryId)?.color || "#808080",
                repeatType: response.data.repeatType || '반복 없음', // 반복 설정 반영
                status: response.data.status|| '보류 중',
            };

            onSave(updatedTask); // 저장 후 상위 컴포넌트에 알림
            onRequestClose(); // 모달 닫기
        } catch (error) {
            console.error("Failed to update the task:", error.response || error);
            alert("테스크 업데이트 중 오류가 발생했습니다.");
        }
    };

    const handleDelete = async () => {
        if(!task || !task.taskId) {
            alert("삭제할 이벤트가 선택되지 않았습니다.")
            return;
        }
        if (window.confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
            try {
                await axios.delete("/api/task/delete", {
                    data: task.taskId,
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                onDelete(task.taskId);
                onRequestClose();
            } catch (error){
                console.error(error.response || error);
                alert("할 일 삭제 중 오류가 발생했습니다.");
            }

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <div className={styles.modalHeader}>
                <FaTimes className={styles.closeIcon} onClick={onRequestClose} />
                <h2>할 일 수정</h2>
            </div>

            <div className={styles.modalBody}>
                <label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        placeholder="할 일 제목을 입력하세요"
                    />
                </label>

                <label>
                    <FaHourglass className={styles.icon}/>
                    <ReactDatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className={styles.datePicker}
                    />
                </label>

                <label>
                    <FaExclamationCircle className={styles.icon}/>
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

                <label>
                    <FaTag className={styles.icon}/>
                    <CustomDropdown
                        options={labelOptions}
                        onLabelSelect={(label) => {
                            setSelectedLabel(label.name);
                            setSelectedCategoryId(label.id);
                        }}
                        selectedLabel={selectedLabel}
                    />
                </label>

                <label>
                    <FaSyncAlt className={styles.icon}/>
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
            </div>

            <div className={styles.modalFooter}>
                <button onClick={handleSave} className={styles.saveButton}>
                    저장
                </button>
                <button onClick={handleDelete} className={styles.deleteButton}>
                    삭제
                </button>
                <button onClick={onRequestClose} className={styles.cancelButton}>
                    취소
                </button>
            </div>
        </Modal>
    );
}

export default TodoEditModal;
