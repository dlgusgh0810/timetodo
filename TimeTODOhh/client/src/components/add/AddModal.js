// AddModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './AddModal.module.css';

Modal.setAppElement('#root');

function AddModal({ isOpen, onRequestClose, onSave }) {
    const [tab, setTab] = useState('event'); // 현재 탭 ('event' 또는 'todo')
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [todoDetails, setTodoDetails] = useState(''); // 할 일 추가 세부 정보

    const handleSave = () => {
        if (tab === 'event') {
            onSave({
                type: 'event',
                title,
                date,
                time,
                location,
                description,
            });
        } else if (tab === 'todo') {
            onSave({
                type: 'todo',
                title: todoDetails,
                date,
            });
        }
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="event-modal"
            overlayClassName="event-modal-overlay"
        >
            <div className="modal-header">
                <button
                    className={`tab-button ${tab === 'event' ? 'active' : ''}`}
                    onClick={() => setTab('event')}
                >
                    일정 추가
                </button>
                <button
                    className={`tab-button ${tab === 'todo' ? 'active' : ''}`}
                    onClick={() => setTab('todo')}
                >
                    할 일 추가
                </button>
            </div>

            {tab === 'event' ? (
                <form>
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>날짜</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <label>시간</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <label>위치</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <label>설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </form>
            ) : (
                <form>
                    <label>할 일</label>
                    <input
                        type="text"
                        value={todoDetails}
                        onChange={(e) => setTodoDetails(e.target.value)}
                    />

                    <label>날짜</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </form>
            )}

            <button type="button" onClick={handleSave}>저장</button>
        </Modal>
    );
}

export default AddModal;
