import React, {useEffect, useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import styles from './TTDStats.module.css';  // 스타일을 제대로 임포트

// Chart.js 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function TTDStats() {
    const [todoData, setTodoData] = useState([ // 할 일 데이터를 상태로 저장

    ]);
    useEffect(() => {
        const fetchTodoData = async () => {
            try {
                const response = await axios.get("http://localhost:8085/api/task/find", {
                    // API URL에 맞게 수정
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    // taskId, title, status만 추출
                    const tasks = response.data.map(task => ({
                        Id: task.taskId,
                        title: task.title,
                        status: task.status,
                    }));
                    setTodoData(tasks); // 받아온 데이터를 상태에 저장
                } else {
                    console.error('Failed to fetch task data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTodoData(); // 컴포넌트 마운트 시 데이터 fetch
    }, []);

    // 상태별 할 일 개수 계산
    const statusCount = {
        pending: todoData.filter(todo => todo.status === '보류 중').length,
        inProgress: todoData.filter(todo => todo.status === '진행 중').length,
        completed: todoData.filter(todo => todo.status === '완료').length,
    };

    // 원형 그래프 데이터 설정
    const data = {
        labels: ['보류 중', '진행 중', '완료'],
        datasets: [
            {
                label: '할 일 상태 비율',
                data: [statusCount.pending, statusCount.inProgress, statusCount.completed], // 각 상태의 개수
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'], // 상태별 색상
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'], // 상태별 테두리 색상
                borderWidth: 1,
            },
        ],
    };

    // 원형 그래프 옵션 설정
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = ((value / todoData.length) * 100).toFixed(2); // 비율 계산
                        return `${label}: ${value} (${percentage}%)`; // 비율과 개수 표시
                    },
                },
            },
        },
    };

    return (
        <>
            <h2>통계</h2>
            <div className={styles.pieContainer1}>
                <p>할 일 진행 상태</p>
                <Pie data={data} options={options} />
            </div>
        </>
    );
}

export default TTDStats;
