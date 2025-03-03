import React, { useEffect, useRef, useState } from "react";
import SystemTemp from "./homepage/SystemTemp";
import {Data} from '../utils/Data'
import SystemHumidity from "./homepage/SystemHumidity";
import Chart from "./homepage/Chart";

function Using() {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.month),
        datasets: [
            {
                label: "Users Gained",
                data: Data.map((data) => data.userGain),
                backgroundColor: null,
                borderColor: "black",
                borderWidth: 1
            }
        ]
    });
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, '#A1FFFF');
            gradient.addColorStop(0.8, '#EDBAFF');

            const updatedChartData = {
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        backgroundColor: gradient
                    }
                ]
            };
            setChartData(updatedChartData);
        }
    }, [chartRef]);
    
    return (
        <div className="container flex gap-4 w-full justify-between flex-wrap">
            <div className="flex gap-4 ">
                <SystemTemp />
                <SystemHumidity />
            </div>
            <div className="w-1/2">
                <canvas ref={chartRef} style={{ display: 'none' }}></canvas>
                <Chart chartData={chartData} />
            </div>
        </div>
    );
}

export default Using;
