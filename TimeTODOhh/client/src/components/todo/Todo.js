import React, { useState } from 'react';
import styles from './Todo.module.css';
import AddModal from '../add/AddModal';

function Todo() {
    const [todos, setTodos] = useState([
        { id: 1, title: '친구 생일선물 사기', date: '2024-11-20', label: '선물', priority: '중요', status: false },
        { id: 2, title: '과제하기', date: '2024-11-15', label: '공부', priority: '일반', status: false }
    ]);

    const [showModal, setShowModal] = useState(false);

    // 할 일 추가 함수 (모달에서 전달된 데이터를 목록에 추가)
    const addTodo = (newTodo) => {
        const todoItem = {
            id: Date.now(),
            ...newTodo,
            status: false // 초기 상태는 미완료로 설정
        };
        setTodos([...todos, todoItem]);
        setShowModal(false);
    };

    // 할 일 상태 업데이트 함수 (체크박스로 완료 여부 변경)
    const updateStatus = (id) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, status: !todo.status } : todo)));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>할 일 목록</h2>
            <ul className={styles.todoList}>
                {todos.map(todo => (
                    <li key={todo.id} className={styles.todoItem}>
                        <label className={styles.checkboxContainer}>
                            <input
                                type="checkbox"
                                checked={todo.status}
                                onChange={() => updateStatus(todo.id)}
                            />
                            <span className={styles.customCheckbox}></span>
                        </label>
                        <div className={styles.todoDetails}>
                            <span className={todo.status ? styles.completed : ''}>{todo.title}</span>
                            <div className={styles.metadata}>
                                {todo.date && <span className={styles.dueDate}>📅 {todo.date}</span>}
                                {todo.label && <span className={styles.label}>🏷️ {todo.label}</span>}
                                {todo.priority && <span className={styles.priority}>⚡ {todo.priority}</span>}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 할 일 추가 모달 열기 버튼 */}
            <button
                onClick={() => setShowModal(true)}
                className={styles.addButton}
            >
                할 일 추가하기
            </button>

            {/* 모달 컴포넌트 */}
            <AddModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onSave={addTodo}
            />
        </div>
    );
}

export default Todo;
