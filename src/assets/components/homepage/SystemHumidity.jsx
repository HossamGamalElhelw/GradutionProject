import React from 'react'
import './SystemHumidity.css'
import SwitchComponent from '../../utils/Switch';

function SystemHumidity() {
  return (
    <div className="system_Humidity">
        <div className="btn_control">
            <p className="window_title">Windows</p>
            <SwitchComponent />
        </div>
        <div className="humidity_read">
            <div className="humidity_value_img">
                <h3 id="humidity_value">50%</h3>
                <picture className="humidity_picture"><img src="../../public/humidity.png" className="humidity_img" alt="" /></picture>
            </div>
            <ul>
                <li>≥70% <span>Open windows</span></li>
                <li>≥60% and less than 70% <span>Fair humidity levels</span> </li>
                <li><a href="https://www.airthings.com/what-is-humidity" target="_blank">Read more</a></li>
            </ul>
        </div>
    </div>
    )
}

export default SystemHumidity