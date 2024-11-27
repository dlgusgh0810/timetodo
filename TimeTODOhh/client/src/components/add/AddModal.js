import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddLabelModal from "./AddLabelModal";
import CustomDropdown from "./CustomDropdown";
import axios from "axios";
import { FaTimes, FaCalendarAlt, FaBell, FaExclamationCircle, FaClipboardList, FaSyncAlt } from "react-icons/fa";
import styles from "./AddModal.module.css";

Modal.setAppElement("#root");

function AddModal({ isOpen, onRequestClose, onSave }) {
    const [activeTab, setActiveTab] = useState("일정");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("라벨 없음");
    const [priority, setPriority] = useState("우선순위 없음");
    const [repeat, setRepeat] = useState("반복 없음");
    const [reminder, setReminder] = useState("30분 전");
    const [description, setDescription] = useState("");
    const [labelOptions, setLabelOptions] = useState([{ name: "일반", color: "#808080" }]);
    const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

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

    const handleSave = async () => {
        if (title.trim() === "") {
            alert("제목을 입력하세요.");
            return;
        }

        const newTask = {
            title,
            dueDate: date,
            priority,
            status: "미완료", // 기본 상태를 진행 중으로 설정
            repeatType: repeat,
        };

        try {
            const response = await axios.post("/api/task/add", newTask);
            console.log("서버 응답:", response.data); // 응답 데이터 로그 출력
            alert("Task가 성공적으로 생성되었습니다!");
            onSave(newTask);
            resetForm();
            onRequestClose();
        } catch (error) {
            console.error("Task 생성 실패:", error);
            alert("Task 생성에 실패했습니다.");
        }

    };

    const resetForm = () => {
        setTitle("");
        setDate("");
        setSelectedLabel("라벨 없음");
        setPriority("우선순위 없음");
        setDescription("");
        setRepeat("반복 없음");
        setReminder("30분 전");
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

                    <label className={styles.label}>
                        <FaCalendarAlt className={styles.icon} />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={styles.input}
                        />
                    </label>

                    {activeTab === "일정" && (
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
