import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddLabelModal.module.css';

function AddLabelModal({ isOpen, onRequestClose, onSave }) {
    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState('#808080');

    const handleSave = () => {
        if (!newLabelName.trim()) {
            alert('라벨 이름을 입력하세요.');
            return;
        }
        onSave({ name: newLabelName, color: newLabelColor }); // 새 라벨 객체 전달
        setNewLabelName('');
        setNewLabelColor('#808080'); // 초기화
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.labelModal}>
            <h2>라벨 추가</h2>
            <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="라벨 이름"
            />
            <input
                type="color"
                value={newLabelColor}
                onChange={(e) => setNewLabelColor(e.target.value)}
            />
            <button onClick={handleSave}>저장</button>
        </Modal>
    );
}

export default AddLabelModal;
