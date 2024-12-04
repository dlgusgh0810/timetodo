import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './TTDStats.module.css';  // 스타일을 제대로 임포트

// Chart.js 구성 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

function TTDStats() {
    // 예시 데이터: 각 할 일의 상태 (보류 중, 진행 중, 완료)
    const todoData = [
        { id: 1, title: '할 일 1', status: '보류 중' },
        { id: 2, title: '할 일 2', status: '진행 중' },
        { id: 3, title: '할 일 3', status: '완료' },
        { id: 4, title: '할 일 4', status: '진행 중' },
        { id: 5, title: '할 일 5', status: '보류 중' },
        { id: 6, title: '할 일 6', status: '완료' },
        { id: 7, title: '할 일 7', status: '진행 중' },
        { id: 8, title: '할 일 8', status: '완료' },
    ];

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
