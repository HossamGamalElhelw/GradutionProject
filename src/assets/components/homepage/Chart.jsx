import React from 'react'
import './Chart.css'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Chart({chartData}) {


    return (
        <div className="chart-container">
        {/* <h2 style={{ textAlign: "center" }}>Using Status</h2> */}
        <Bar
            data={chartData}
            options={{
            plugins: {
                title: {
                display: true,
                text: "User Gained"
                },
                legend: {
                display: false
                }
            }
            }}
            />
        </div>
    )
}

export default Chart