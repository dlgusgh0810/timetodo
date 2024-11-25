import React, { useState } from 'react';
import styles from './CustomDropdown.module.css';

function CustomDropdown({ options, onLabelSelect, onAddLabel }) {
    const [selectedLabel, setSelectedLabel] = useState(options[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLabelClick = (label) => {
        setSelectedLabel(label); // 전체 객체를 선택
        setIsDropdownOpen(false);
        onLabelSelect(label.name); // 이름만 상위로 전달
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

                    {/* 라벨 항목 */}
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles.dropdownItem}
                            onClick={() => handleLabelClick(option)}
                            style={{
                                backgroundColor: option.color,
                                color: option.color === '#FFFFFF' ? '#000' : '#FFF', // 밝은 색에는 어두운 텍스트
                            }}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomDropdown;
