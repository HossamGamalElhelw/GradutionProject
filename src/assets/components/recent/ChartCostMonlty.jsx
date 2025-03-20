import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

function ChartCostMonthly({ monthlyData }) {
    const calculateCost = (kwh) => {
        let cost = 0;

        if (kwh <= 50) {
            cost = kwh * 0.58; // 0-50 kWh at £0.58
        } else if (kwh <= 100) {
            cost = (50 * 0.58) + ((kwh - 50) * 0.68); // 51-100 kWh at £0.68
        } else if (kwh <= 200) {
            cost = (50 * 0.58) + (50 * 0.68) + ((kwh - 100) * 0.83); // 101-200 kWh at £0.83
        } else if (kwh <= 350) {
            cost = (50 * 0.58) + (50 * 0.68) + (100 * 0.83) + ((kwh - 200) * 1.25); // 201-350 kWh at £1.25
        } else {
            cost = (50 * 0.58) + (50 * 0.68) + (100 * 0.83) + (150 * 1.25) + ((kwh - 350) * 1.25); // Above 350 kWh at £1.25
        }

        return Number(cost.toFixed(2)); // Round to 2 decimal places
    };

    // Map monthlyData to include cost
    const costData = monthlyData.map(item => ({
        ...item,
        cost: calculateCost(item.energy)
    }));

    const chartData = {
        labels: costData.map(item => item.month),
        datasets: [
            {
                label: 'Energy Cost',
                data: costData.map(item => item.cost),
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
                text: "Energy Cost - Last 12 Months (£)",
                font: { size: 16 },
                color : '#ffffffde' 
            },
            legend: { display: false },
            tooltip: { 
                callbacks: { 
                    label: (context) => `£${context.parsed.y}` // Show cost in pounds
                } 
            }
        },
        scales: {
            x: { 
                title: { 
                    display: true, 
                    text: 'Month',
                    font: { size: 16 },
                    color : '#ffffffde' 
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            },
            y: { 
                title: { 
                    display: true, 
                    text: 'Cost (£)', // Updated to show pounds
                    font: { size: 16 },
                    color : '#ffffffde' 
                }, 
                beginAtZero: true,
                suggestedMax: Math.max(...costData.map(item => item.cost)) * 1.1 // 10% headroom
            }
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="w-1/2 h-100 md:w-full">
            <Line
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default ChartCostMonthly;