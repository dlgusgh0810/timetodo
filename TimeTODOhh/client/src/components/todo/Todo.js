import React, {useEffect, useState} from 'react';
import styles from './Todo.module.css';
import AddModal from '../add/AddModal';
import axios from "axios";

function Todo() {
    const [todos, setTodos] = useState([
        {
            taskId: 1,
            title: 'taskTest',
            dueDate: '2024-11-15',
            priority: '우선순위 없음',
            status: '미완료',
            repeatType: '매일',
            categoryId: 3,
            label: '가짜라벨',
            labelColor: '#808080' // 색상 값을 문자열로 처리
        },
        {
            taskId: 2,
            title: 'taskTest2',
            dueDate: '2024-12-17',
            priority: '우선순위 없음',
            status: '미완료',
            repeatType: '매일',
            categoryId: 3,
            label: '가짜라벨',
            labelColor: '#808080' // 색상 값을 문자열로 처리
        }
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
    // const addTodo = (newTodo) => {
    //     const todoItem = {
    //         id: newTodo.id, // 서버에서 반환된 ID
    //         title: newTodo.title,
    //         date: newTodo.deadline ? newTodo.deadline.split('T')[0] : null, // 날짜를 YYYY-MM-DD 형식으로 추출
    //         label: labelOptions.find((label) => label.id === newTodo.categoryId)?.name || '라벨 없음', // 카테고리 이름 매핑
    //         priority: newTodo.priority || '우선순위 없음',
    //         repeatType: newTodo.repeatType || null, // 반복 설정
    //         status: newTodo.status || '미완료', // 상태 추가
    //     };
    //
    //     setTodos((prevTodos) => [...prevTodos, todoItem]); // 상태 업데이트
    //     setShowModal(false); // 모달 닫기
    // };

    const addTodo = (newTodo) => {
        const selectedLabel = labelOptions.find((label) => label.id === newTodo.categoryId);
        const todoItem = {
            taskId: newTodo.id || Date.now(),
            title: newTodo.title || '제목 없음',
            dueDate: newTodo.deadline ? newTodo.deadline.split('T')[0] : null,
            label: selectedLabel?.name || '라벨 없음', // 라벨 이름
            labelColor: selectedLabel?.color || '#808080', // 라벨 색상
            priority: newTodo.priority || '중간',
            status: newTodo.status || '미완료',
        };

        setTodos((prevTodos) => [...prevTodos, todoItem]);
        setShowModal(false);
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
                                    {todo.label}</span>)}
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
                onSave={addTodo}
                defaultTab="할 일"
                labelOptions={labelOptions} // 라벨 옵션 전달
            />
        </div>
    );
}

export default Todo;