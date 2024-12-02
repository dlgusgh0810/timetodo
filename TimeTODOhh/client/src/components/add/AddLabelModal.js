import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddLabelModal.module.css';

function AddLabelModal({ isOpen, onRequestClose, onSave }) {
    const [newLabelName, setNewLabelName] = useState('');
    const [newLabelColor, setNewLabelColor] = useState('#808080');

    // 제공된 색상 옵션 (CSV에서 가져온 데이터)
    const colorOptions = [
        '#FF4500', '#FF7F00', '#FFD700', '#ADFF2F', '#40E0D0',
        '#1E90FF', '#8A2BE2', '#FF1493', '#FF69B4', '#FFC0CB'
    ];

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
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.labelModal}
            overlayClassName={styles.labelModalOverlay}
        >
            <h2>라벨 추가</h2>
            <input
                type="text"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                placeholder="라벨 이름"
            />

            <div className={styles.colorOptions}>
                <p>라벨 색상 선택:</p>
                {colorOptions.map((color) => (
                    <button
                        key={color}
                        style={{
                            backgroundColor: color,
                            width: '30px',
                            height: '30px',
                            border: color === newLabelColor ? '2px solid black' : 'none',
                            borderRadius: '50%',
                            margin: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={() => setNewLabelColor(color)}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>

            <button onClick={handleSave}>저장</button>
        </Modal>
    );
}

export default AddLabelModal;
