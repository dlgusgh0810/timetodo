import React, { useState, useEffect } from 'react';
import styles from './CustomDropdown.module.css';

function CustomDropdown({ options, onLabelSelect, onAddLabel }) {
    const [selectedLabel, setSelectedLabel] = useState(options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // options가 변경될 때 selectedLabel 초기화
    useEffect(() => {
        setSelectedLabel(options[0]);
    }, [options]);

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        setIsDropdownOpen(false);
        onLabelSelect(label.name); // 선택된 라벨 이름 전달
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
