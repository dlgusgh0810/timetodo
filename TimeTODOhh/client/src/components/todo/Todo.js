import React, {useEffect, useState} from 'react';
import styles from './Todo.module.css';
import AddModal from '../add/AddModal';
import axios from "axios";

function Todo() {
    const [todos, setTodos] = useState([
        { id: 1, title: '친구 생일선물 사기', date: '2024-11-20', label: '선물', priority: '중요', status: false },
        { id: 2, title: '과제하기', date: '2024-11-15', label: '공부', priority: '일반', status: false }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [labelOptions, setLabelOptions] = useState([]); // 라벨 옵션 상태 추가

    // 라벨 데이터 가져오기
    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await fetch("http://localhost:8085/api/categories/all", {
                    method: "GET",
                    credentials: "include", // 쿠키 포함
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const categories = await response.json();
                const formattedCategories = categories.map((category) => ({
                    id: category.categoryId,
                    name: category.categoryName,
                    color: category.color || '#808080',
                }));
                setLabelOptions(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchLabels();
    }, []);

    // 할 일 추가 함수
    const addTodo = (newTodo) => {
        const todoItem = {
            id: newTodo.id, // 서버에서 반환된 ID
            title: newTodo.title,
            date: newTodo.deadline ? newTodo.deadline.split('T')[0] : null, // 날짜를 YYYY-MM-DD 형식으로 추출
            label: labelOptions.find((label) => label.id === newTodo.categoryId)?.name || '라벨 없음', // 카테고리 이름 매핑
            priority: newTodo.priority || '우선순위 없음',
            repeatType: newTodo.repeatType || null, // 반복 설정
            status: newTodo.status || '미완료', // 상태 추가
        };

        setTodos((prevTodos) => [...prevTodos, todoItem]); // 상태 업데이트
        setShowModal(false); // 모달 닫기
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>할 일 목록</h2>
            <ul className={styles.todoList}>
                {todos.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                        <div className={styles.todoDetails}>
                            <span>{todo.title}</span>
                            <div className={styles.metadata}>
                                {todo.date && <span>📅 {todo.date}</span>}
                                {todo.label && <span>🏷️ {todo.label}</span>}
                                {todo.priority && <span>⚡ {todo.priority}</span>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => setShowModal(true)}
                className={styles.addButton}
            >
                할 일 추가하기
            </button>

            {/* AddModal에 labelOptions 전달 */}
            <AddModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onSave={addTodo}
                defaultTab="할 일"
                labelOptions={labelOptions} // 라벨 옵션 전달
            />
        </div>
    );
}

export default Todo;