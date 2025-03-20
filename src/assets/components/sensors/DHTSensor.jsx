import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import SwitchComponent from './../../utils/Switch';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import { useAuth } from '../context/AuthProvider';

function DHTSensor({ currentUser }) {
    const db = getDatabase();
    const [dhtSensor, setDhtSensor] = useState({ humidity: 0, temperature: 0, state: false });

    // Write DHT state
    const writeDhtState = (state) => {
        if (currentUser) {
            return set(ref(db, `users/${currentUser.uid}/sensors/DHT/state`), state)
                .then(() => console.log(`DHT state updated to ${state}`))
                .catch((error) => console.error("Error writing DHT state: ", error));
        }
    };
    // Read DHT sensor (real-time)
    const readDhtSensor = () => {
        if (currentUser) {
            const dhtRef = ref(db, `users/${currentUser.uid}/sensors/DHT`);
            const unsubscribe = onValue(dhtRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setDhtSensor(data);
                }
            });
            return unsubscribe;
        }
    };
    // Toggle DHT sensor
    const toggleDhtSensor = () => {
        setDhtSensor(prev => {
            const newState = !prev.state;
            writeDhtState(newState);
            return { ...prev, state: newState };
        });
    };

    useEffect(() => {
        if (currentUser) {
            const unsubscribe = readDhtSensor();
            return () => unsubscribe && unsubscribe();
        }
    }, [currentUser]);

    return (
        <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
            <div className="logo_switch flex justify-between items-center">
                <div className='flex gap-2 items-center'>
                    <ThermostatAutoIcon 
                        sx={{
                            opacity: dhtSensor.state ? 1 : 0.3,
                            width: '3rem',
                            height: '3rem',
                            color: '#A1FFFF'
                        }}
                    />
                </div>
                <SwitchComponent
                    isOn={dhtSensor.state}
                    onToggle={toggleDhtSensor}
                />
            </div>
            <div className='flex justify-between items-center mt-2'>
                <p className='text-[#A1FFFF]'>DHT Sensor</p>
                <p className='text-[#EDBAFF]'>2KW</p>
            </div>
        </div>
    );
}

export default DHTSensor;