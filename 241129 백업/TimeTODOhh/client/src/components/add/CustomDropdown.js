import React, { useState, useEffect } from 'react';
import styles from './CustomDropdown.module.css';

function CustomDropdown({ options, onLabelSelect, onAddLabel }) {
    const [selectedLabel, setSelectedLabel] = useState(options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (options.length > 0) {
            setSelectedLabel(options[0]); // 새 옵션으로 기본값 설정
        }
    }, [options]); // options 업데이트 시 실행

    const handleLabelClick = (label) => {
        setSelectedLabel(label); // 선택된 라벨 업데이트
        onLabelSelect(label); // 부모에 전달
        setIsDropdownOpen(false);
    };

    return (
        <div className={styles.dropdownContainer}>
            <div
                className={styles.selectedLabel}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ backgroundColor: selectedLabel?.color }}
            >
                {selectedLabel?.name || '라벨 없음'}
            </div>
            {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                    <div
                        className={styles.addLabelButton}
                        onClick={() => {
                            setIsDropdownOpen(false);
                            onAddLabel();
                        }}
                    >
                        + 라벨 추가
                    </div>
                    {options.map((label, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleLabelClick(label)}
                            style={{
                                backgroundColor: label.color,
                                color: label.color === '#FFFFFF' ? '#000' : '#FFF',
                            }}
                        >
                            {label.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;
