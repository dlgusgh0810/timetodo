import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes, FaExclamationCircle, FaHourglass, FaTag } from 'react-icons/fa';
import CustomDropdown from '../add/CustomDropdown'; // 라벨 드롭다운
import styles from './TodoEditModal.module.css';

Modal.setAppElement("#root");

function TodoEditModal({ isOpen, onRequestClose, onSave, onDelete, task, labelOptions }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('우선순위 없음');
    const [deadline, setDeadline] = useState(new Date());
    const [selectedLabel, setSelectedLabel] = useState('라벨 없음');
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // 선택된 할 일 데이터를 모달 상태로 초기화
    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setPriority(task.priority || '우선순위 없음');
            setDeadline(task.dueDate ? new Date(task.dueDate) : new Date());
            setSelectedLabel(task.label || '라벨 없음');
            setSelectedCategoryId(task.categoryId || null);
        }
    }, [task]);

    const handleSave = () => {
        if (!title.trim()) {
            alert('제목을 입력하세요.');
            return;
        }

        const updatedTask = {
            ...task,
            title: title.trim(),
            priority,
            dueDate: deadline,
            categoryId: selectedCategoryId,
            label: labelOptions.find((label) => label.id === selectedCategoryId)?.name || '라벨 없음',
            labelColor: labelOptions.find((label) => label.id === selectedCategoryId)?.color || '#808080',
        };

        onSave(updatedTask);
        onRequestClose();
    };

    const handleDelete = () => {
        if (window.confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
            onDelete(task.taskId);
            onRequestClose();
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
                    제목
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        placeholder="할 일 제목을 입력하세요"
                    />
                </label>

                <label>
                    마감 기한
                    <ReactDatePicker
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className={styles.datePicker}
                    />
                </label>

                <label>
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

                <label>
                    라벨
                    <CustomDropdown
                        options={labelOptions}
                        onLabelSelect={(label) => {
                            setSelectedLabel(label.name);
                            setSelectedCategoryId(label.id);
                        }}
                        selectedLabel={selectedLabel}
                    />
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
