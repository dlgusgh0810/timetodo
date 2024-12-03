import React, {useEffect, useState} from 'react';
import styles from './Todo.module.css';
import AddModal from '../add/AddModal';
import axios from "axios";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [labelOptions, setLabelOptions] = useState([]); // 라벨 옵션 상태 추가

    // 라벨 데이터와 할 일 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. 카테고리 데이터 불러오기
                const categoryResponse = await fetch("http://localhost:8085/api/categories/all", {
                    method: "GET",
                    credentials: "include",
                });

                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const categories = await categoryResponse.json();
                const formattedCategories = categories.map((category) => ({
                    id: category.categoryId,
                    name: category.categoryName,
                    color: category.color || '#808080',
                }));
                setLabelOptions(formattedCategories);

                // 2. 할 일 데이터 불러오기
                const tasksResponse = await fetch("http://localhost:8085/api/task", {
                    method: "GET",
                    credentials: "include",
                });

                if (!tasksResponse.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const tasks = await tasksResponse.json();
                setTodos(tasks);  // 할 일 목록 설정

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addTodo = (newTask) => {
        const todoItem = {
            taskId: newTask.id || Date.now(),
            title: newTask.title || '제목 없음',
            dueDate: newTask.dueDate || null,
            label: newTask.label || '라벨 없음', // 카테고리 이름
            labelColor: newTask.labelColor || '#808080', // 카테고리 색상
            priority: newTask.priority || '중간',
            status: newTask.status || '보류 중',
        };

        setTodos((prevTodos) => [...prevTodos, todoItem]);
        setShowModal(false); // 모달 닫기
    };

    const handleSaveTask = (newTask) => {
        // 부모 컴포넌트로 받은 newTask를 addTodo로 목록에 추가
        addTodo(newTask);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>할 일 목록</h2>
            <ul className={styles.todoList}>
                {todos.map((todo) => (
                    <li key={todo.taskId} className={styles.todoItem}>
                        <div className={styles.todoDetails}>
                            <span>{todo.title || '제목 없음'}</span>
                            <div className={styles.metadata}>
                                {todo.dueDate && <span>📅 {todo.dueDate}</span>}
                                {todo.label && (
                                    <span
                                        style={{
                                            backgroundColor: todo.labelColor,
                                            color: '#ffffff',
                                            padding: '2px 6px',
                                            borderRadius: '12px',
                                            fontSize: '0.8em',
                                            marginLeft: '8px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {todo.label}
                                    </span>)}
                                {todo.priority && <span>⚡ {todo.priority}</span>}
                                {todo.status && <span>✅ {todo.status}</span>}
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
                onSave={handleSaveTask}
                defaultTab="할 일"
                labelOptions={labelOptions} // 라벨 옵션 전달
            />
        </div>
    );
}

export default Todo;