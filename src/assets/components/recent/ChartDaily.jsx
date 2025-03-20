// src/homepage/ChartDaily.js
import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { colors } from '@mui/material';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function ChartDaily({ dailyData }) {
    const chartData = {
        labels: dailyData.map(item => item.day),
        datasets: [
            {
                label: 'Energy Usage',
                data: dailyData.map(item => item.energy),
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

    const options = {
        plugins: {
            title: { 
                display: true, 
                text: "Energy Usage - Last 7 Days",
                font: { size: 16 } ,
                color : '#ffffffde' 
            },
            legend: { display: false },
            tooltip: { 
                callbacks: { 
                    label: (context) => `${context.parsed.y} kWh` 
                } 
            }
        },
        scales: {
            x: { 
                title: { 
                    display: true, 
                    text: 'Day',
                    font: { size: 16 },
                    color : '#ffffffde' 
                },
                ticks: {
                    maxRotation: 45, // Rotate labels if they overlap
                    minRotation: 45
                }
            },
            y: { 
                title: { 
                    display: true, 
                    text: 'Energy (kWh)',
                    font: { size: 16 },
                    color : '#ffffffde' 
                }, 
                beginAtZero: true,
                suggestedMax: Math.max(...dailyData.map(item => item.energy)) * 1.1 // Add 10% headroom
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full h-100">
            <Line
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default ChartDaily;