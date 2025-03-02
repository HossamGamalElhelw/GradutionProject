import React, { useEffect, useState } from 'react'
import './sidebar.css'
import dashboard_option_img from '../../images/dashboard_option.png'
import recent_img from '../../images/video-time.png'
import logo from '../../images/logo.png'
import support_img from '../../images/help.png'
import setting_img from '../../images/setting-2.png'
import { useAuth } from '../context/AuthProvider'
import { getDatabase, ref, set,onValue } from "firebase/database";

function Sidebar() {
    const {currentUser,logout} = useAuth();
    const db = getDatabase();
    const [leds, setLeds] = useState({led1: false, led2: false});

    const writeLedState = (ledName, state) => {
        if(currentUser){
            set(ref(db, `users/${currentUser.uid}/leds/${ledName}`), state)
            .then(() =>{
                console.log(`${ledName} state updated to ${state}`);
            })
            .catch((error)=>{
                console.error("Error writing LED state: ", error);
            })
    }
    }

    const toggleLed = (ledName) =>{
        setLeds(prev => {
            const newState = !prev[ledName];
            writeLedState(ledName, newState);
            return{...prev, [ledName]:newState};
        })
    }


 return (
    <div>
        <div className="logo">
            <picture className='picture_logo'><img className='img_logo' src={logo} alt="logo" /></picture>
            <h1 className='title_logo'>Integrated Home</h1>
        </div>
        <div className="options">
            <div className="option active">
                <picture className='picture_option'><img className='img_option' src={dashboard_option_img} alt="dashboard_option" /></picture>
                <p>Dashboard</p>
            </div>
            <div className="option">
                <picture className='picture_option'><img className='img_option' src={recent_img} alt="recent_img" /></picture>
                <p>Recent</p>
            </div>
            <div className="option">
                <picture className='picture_option'><img className='img_option' src={support_img} alt="support_img" /></picture>
                <p>Support</p>
            </div>
            <div className="option">
                <picture className='picture_option'><img className='img_option' src={setting_img} alt="setting_img" /></picture>
                <p>Setting</p>
            </div>
            <div className="options">
                <div className="led-controls">
                    <div>
                        <label>LED1 1: {leds.led1 ? 'ON' : 'OFF'}</label>
                        <button onClick={() => toggleLed('led1')} className='p-2 bg-red-500 ml-2 mb-2 rounded-sm cursor-pointer'>Toggle LED 1</button>
                    </div>
                    <div>
                        <label>LED1 1: {leds.led2 ? 'ON' : 'OFF'}</label>
                        <button onClick={() => toggleLed('led2')} className='p-2 bg-red-500 ml-2 mb-2 rounded-sm cursor-pointer'>Toggle LED 2</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar