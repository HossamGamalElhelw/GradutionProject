import React, { useState } from "react";
import SystemTemp from "./homepage/SystemTemp";
import './using.css';
import {Data} from '../utils/Data'
import SystemHumidity from "./homepage/SystemHumidity";
import Chart from "./homepage/Chart";

function Using() {
    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.month),
        datasets: [
            {
                label: "Users Gained",
                data: Data.map((data) => data.userGain),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 1
            }
        ]
    });

    return (
        <div className="container_section container">
            <SystemTemp />
            <SystemHumidity />
            <div className="value_Gas_container">
                {/* system gas */}
            </div>
            <Chart chartData={chartData} />
        </div>
    );
}

export default Using;
