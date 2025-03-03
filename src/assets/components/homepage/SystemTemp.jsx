import React, { useEffect, useState } from 'react'
import './SystemTemp.css'
import SwitchComponent from '../../utils/Switch';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from '../context/AuthProvider';

function SystemTemp() {
    const {currentUser,logout} = useAuth();
    const db = getDatabase();
    const [fan, setFan] = useState(false);

    const writeFanState = (state) => {
            if(currentUser){
                set(ref(db, `users/${currentUser.uid}/fan`), state)
                .then(() =>{
                    console.log(`${fan} state updated to ${state}`);
                })
                .catch((error)=>{
                    console.error("Error writing Fan state: ", error);
                })
        }
        }
        const readFanState = () => {
            if (currentUser) {
                const fanRef = ref(db, `users/${currentUser.uid}/fan`);
                onValue(fanRef, (snapshot) => {
                    const data = snapshot.val();
                    setFan(data !== null ? data : false);
                });
            }
        };
        const toggleFan = (newState) => {
            console.log("Toggling fan to:", newState);
            setFan(newState);
            writeFanState(newState);
        };
    
        useEffect(() =>{
            if(currentUser){
                readFanState();
            }
        },[currentUser])

    return (
        <div className="system_temp">
            <div className="control_btn">
                <p className="airConditioner">Air Conditioner</p>
                <SwitchComponent isOn={fan} onToggle={toggleFan}/>
            </div>
            <div className="temp_read">
                <h3 id="temp_value">24°C</h3>
                <div class="temp_bar_container">
                <input type="range" min="18" max="32" value="25" id="tempSlider"/>
                <div class="range-labels">
                    <div class="label label-18">18℃</div>
                    <div class="label label-32">32℃</div>
                </div>
                </div>
                <div className="temp_text_container">
                <p className="temp_text">Temperature</p>
                <picture className="ice_picture"><img className="ice_img" src="../../../public/ice.png" alt="ice_image" /></picture>
                </div>
            </div>
        </div>
    )
}

export default SystemTemp