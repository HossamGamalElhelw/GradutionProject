import React, { useEffect, useState } from 'react'
import './SystemHumidity.css'
import SwitchComponent from '../../utils/Switch';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useAuth } from '../context/AuthProvider';
import { getDatabase, ref,onValue,set } from 'firebase/database';

function SystemHumidity() {
    const { currentUser } = useAuth();
    const db = getDatabase();
    const [humidity, setHumidity] = useState(0); 
    const [window, setWindow] = useState(false);

    const listenToHumidity = () => {
        if (currentUser) {
            const humidityRef = ref(db, `users/${currentUser.uid}/sensors/DHT/humidity`);
            const unsubscribe = onValue(humidityRef, (snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                    setHumidity(data); 
                } else {
                    setHumidity(0);
                }
            }, (error) => {
                console.error("Error listening to humidity:", error);
            });
            return unsubscribe; 
        }
    };
        //* Windows Functions
        const writeWindowState = (state) => {
            if (currentUser) {
                set(ref(db, `users/${currentUser.uid}/window`), state)
                    .then(() => console.log(`window state updated to ${state}`))
                    .catch((error) => console.error("Error writing window state: ", error));
            }
        };
    
        const readWindowState = () => {
            if (currentUser) {
                const windowRef = ref(db, `users/${currentUser.uid}/window`);
                const unsubscribe = onValue(windowRef, (snapshot) => {
                    const data = snapshot.val();
                    setWindow(data !== null ? data : false);
                });
                return unsubscribe;
            }
        };
    
        const toggleWindow = (newState) => {
            setWindow(newState);
            writeWindowState(newState);
        };

    useEffect(() => {
        if (currentUser) {
            const unsubscribeHumidity = listenToHumidity();
            const unsubscribeWindow = readWindowState();
            return () => {
                unsubscribeHumidity && unsubscribeHumidity()
                unsubscribeWindow && unsubscribeWindow();
            }; 
        }
    }, [currentUser]);


  return (
    <div className="system_Humidity">
        <div className="btn_control">
            <p className="window_title">Windows</p>
            <SwitchComponent isOn={window} onToggle={toggleWindow} />
        </div>
        <div className="humidity_read">
            <div className="humidity_value_img">
                <h3 id="humidity_value">{humidity}%</h3>
                <WaterDropIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}}/>
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