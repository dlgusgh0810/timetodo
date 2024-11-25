import React, { useState } from 'react';
import styles from './CustomDropdown.module.css';

function CustomDropdown({ options, onLabelSelect, onAddLabel }) {
    const [selectedLabel, setSelectedLabel] = useState(options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLabelClick = (option) => {
        setSelectedLabel(option);
        setIsDropdownOpen(false);
        onLabelSelect(option);
    };

    return (
        <div className={styles.dropdownContainer}>
            {/* 선택된 라벨 표시 */}
            <div
                className={styles.selectedLabel}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ backgroundColor: selectedLabel.color }}
            >
                {selectedLabel.name}
            </div>

            {/* 드롭다운 옵션 */}
            {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleLabelClick(option)}
                            style={{
                                backgroundColor: option.color,
                                color: '#fff',
                            }}
                        >
                            {option.name}
                        </div>
                    ))}

                    {/* 라벨 추가 버튼 */}
                    <div
                        className={styles.addLabelButton}
                        onClick={() => {
                            setIsDropdownOpen(false);
                            onAddLabel();
                        }}
                    >
                        + 라벨 추가
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;
