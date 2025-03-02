import React, { useEffect, useState } from 'react';
import SwitchComponent from '../../utils/Switch';
import './Devices.css';


function Devices() {


    return (
        <div className='devices container'>
                    <div  className="device_content">
                        <div className="logo_switch">
                            <picture>
                                <img  src='/fan.png'/>
                            </picture> 
                            <SwitchComponent />
                        </div>
                        <div>
                            <p>device name</p>
                        </div>
                    </div>
        </div>
    );
}

export default Devices;