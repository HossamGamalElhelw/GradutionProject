import React, { useEffect, useState } from 'react'
import './SystemTemp.css'
import SwitchComponent from '../../utils/Switch';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from '../context/AuthProvider';
import AcUnitIcon from '@mui/icons-material/AcUnit';

function SystemTemp() {
    const { currentUser } = useAuth();
    const db = getDatabase();
    const [conditioning, setConditioning] = useState(false);

    const writeConditioningState = (state) => {
            if(currentUser){
                set(ref(db, `users/${currentUser.uid}/conditioning`), state)
                .then(() =>{
                    console.log(`${conditioning} state updated to ${state}`);
                })
                .catch((error)=>{
                    console.error("Error writing conditioning state: ", error);
                })
        }
        }
        const readconditioningState = () => {
            if (currentUser) {
                const conditioningRef = ref(db, `users/${currentUser.uid}/conditioning`);
                onValue(conditioningRef, (snapshot) => {
                    const data = snapshot.val();
                    setConditioning(data !== null ? data : false);
                });
            }
        };
        const toggleconditioning = (newState) => {
            console.log("Toggling conditioning to:", newState);
            setConditioning(newState);
            writeConditioningState(newState);
        };
    
        useEffect(() =>{
            if(currentUser){
                readconditioningState();
            }
        },[currentUser])

    return (
        <div className="system_temp">
            <div className="control_btn">
                <p className="airConditioner">Air Conditioner</p>
                <SwitchComponent isOn={conditioning} onToggle={toggleconditioning}/>
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
                    <AcUnitIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}}/> 
                </div>
            </div>
        </div>
    )
}

export default SystemTemp