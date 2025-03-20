// src/homepage/Chart.js
import React from 'react';
import './Chart.css';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function Chart({ hourlyData }) {
    const chartData = {
        labels: hourlyData.map(item => item.hour),
        datasets: [
            {
                label: 'Energy Usage',
                data: hourlyData.map(item => item.energy),
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return '#A1FFFF';
                    }
                    const gradient = ctx.createLinearGradient(
                        chartArea.left, 0,
                        chartArea.right, 0
                    );
                    gradient.addColorStop(0, '#A1FFFF');
                    gradient.addColorStop(1, '#EDBAFF');
                    return gradient;
                },
                borderColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return '#A1FFFF';
                    }
                    const gradient = ctx.createLinearGradient(
                        chartArea.left, 0,
                        chartArea.right, 0
                    );
                    gradient.addColorStop(0, '#A1FFFF');
                    gradient.addColorStop(1, '#EDBAFF');
                    return gradient;
                },
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            },
        ],
    };
    return (
        <div className="chart-container">
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: { display: true, text: "Energy Usage - Hourly",color : '#ffffffde', font: {size: '16px'} },
                        legend: { display: false },
                        tooltip: { callbacks: { label: (context) => `${context.parsed.y} Wh` } }
                    },
                    scales: {
                        x: { title: { display: true, text: 'Hour', color : '#ffffffde', font: {size: '16px'} } },
                        y: { title: { display: true, text: 'Energy (Wh)',color : '#ffffffde',font: {size: '16px'} }, beginAtZero: true }
                    }
                }}
            />
        </div>
    );
}

export default Chart;