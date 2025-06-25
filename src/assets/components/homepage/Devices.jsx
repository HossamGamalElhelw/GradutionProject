import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from '../context/AuthProvider';
import SwitchComponent from './../../utils/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Grid from '@mui/material/Grid';
import SpeakerIcon from '@mui/icons-material/Speaker';
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import AirIcon from '@mui/icons-material/Air';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function Devices() {
    const {currentUser,logout} = useAuth();
    const db = getDatabase();

    const [leds, setLeds] = useState({led1: false, led2: false});
    const [sensors, setSensors] = useState({gas: false, DHT: false});
    const [speaker, setSpeaker] = useState(false);
    const [camera, setCamera] = useState(false);

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
    const readLedsState = () => {
        if (currentUser) {
            const ledsRef = ref(db, `users/${currentUser.uid}/leds`);
            onValue(ledsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setLeds(prev => ({
                        ...prev,
                        ...data
                    }));
                }
            });
        }
    };

    const toggleLed = (ledName) =>{
        setLeds(prev => {
            const newState = !prev[ledName];
            writeLedState(ledName, newState);
            return{...prev, [ledName]:newState};
        })
    }
    // * Sensors
    const writeSensorstate = (sensorName, state) => {
        if(currentUser){
            set(ref(db, `users/${currentUser.uid}/sensors/${sensorName}`), state)
            .then(() =>{
                console.log(`${sensorName} state updated to ${state}`);
            })
            .catch((error)=>{
                console.error("Error writing Sensors state: ", error);
            })
        }
    }
    const readSensorsState = () => {
        if (currentUser) {
            const sensorRef = ref(db, `users/${currentUser.uid}/sensors`);
            onValue(sensorRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setSensors(prev => ({
                        ...prev,
                        ...data
                    }));
                }
            });
        }
    };

    const toggleSensors = (sensorName) =>{
        setSensors(prev => {
            const newState = !prev[sensorName];
            writeSensorstate(sensorName, newState);
            return{...prev, [sensorName]:newState};
        })
    }
    // * Speaker
    const writeSpeakerState = (state) => {
        if(currentUser){
            set(ref(db, `users/${currentUser.uid}/speaker`), state)
            .then(() =>{
                console.log(`${speaker} state updated to ${state}`);
            })
            .catch((error)=>{
                console.error("Error writing Speaker state: ", error);
            })
    }
    }
    const readSpeakerstate = () => {
        if (currentUser) {
            const speakerRef = ref(db, `users/${currentUser.uid}/speaker`);
            onValue(speakerRef, (snapshot) => {
                const data = snapshot.val();
                setSpeaker(data !== null ? data : false);
            });
        }
    };
    const toggleSpeaker = (newState) => {
        console.log("Toggling Speaker to:", newState);
        setSpeaker(newState);
        writeSpeakerState(newState);
    };
    // * Camera
    const writeCameraState = (state) => {
        if(currentUser){
            set(ref(db, `users/${currentUser.uid}/camera`), state)
            .then(() =>{
                console.log(`${camera} state updated to ${state}`);
            })
            .catch((error)=>{
                console.error("Error writing camera state: ", error);
            })
    }
    }
    const readCameraState = () => {
        if (currentUser) {
            const cameraRef = ref(db, `users/${currentUser.uid}/camera`);
            onValue(cameraRef, (snapshot) => {
                const data = snapshot.val();
                setCamera(data !== null ? data : false);
            });
        }
    };
    const toggleCamera = (newState) => {
        console.log("Toggling Speaker to:", newState);
        setCamera(newState);
        writeCameraState(newState);
    };

    useEffect(() =>{
        if(currentUser){
            readLedsState();
            readSpeakerstate();
            readCameraState();
            readSensorsState();
        }
    },[currentUser])

    return (
        <div className='container flex flex-wrap gap-40'>
            <div className="flex gap-4 flex-wrap w-150">
                <h3 className='flex items-center text-2xl my-4 w-full'>Devices</h3>
                <div  className="p-4 border-1 border-[#EDBAFF]  w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'> 
                            <Grid> <WbSunnyIcon sx={{opacity: leds.led1 ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                        <SwitchComponent isOn={leds.led1} onToggle={() => toggleLed('led1')}/>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>LED 1</p>
                        <p className='text-[#EDBAFF]'>3KW</p>
                    </div>
                </div>
                <div  className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'> 
                            <Grid> <WbSunnyIcon sx={{opacity: leds.led2 ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                        <SwitchComponent isOn={leds.led2} onToggle={() => toggleLed('led2')}/>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>LED 2</p>
                        <p className='text-[#EDBAFF]'>3KW</p>
                    </div>
                </div>
                <div className="speaker">
                    <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="flex justify-between ">
                        <div className=''> 
                            <Grid> <SpeakerIcon sx={{opacity: speaker ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                            <SwitchComponent isOn={speaker} onToggle={toggleSpeaker}/>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-[#A1FFFF]'>Speaker</p>
                            <p className='text-[#EDBAFF]'>3KW</p>
                        </div>
                    </div>
                </div>
                <div className="speaker">
                    <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="flex justify-between ">
                        <div className=''> 
                            <Grid> <EmergencyRecordingIcon sx={{opacity: camera ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                            <SwitchComponent isOn={camera} onToggle={toggleCamera}/>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <p className='text-[#A1FFFF]'>Camera</p>
                            <p className='text-[#EDBAFF]'>5KW</p>
                        </div>
                    </div>
                </div>
                <div  className="p-4 border-1 border-[#EDBAFF]  w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'> 
                            <Grid> <AirIcon sx={{opacity: sensors.gas ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                        <SwitchComponent isOn={sensors.gas} onToggle={() => toggleSensors('gas')}/>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>Gas Sensor</p>
                        <p className='text-[#EDBAFF]'>1KW</p>
                    </div>
                </div>
                <div  className="p-4 border-1 border-[#EDBAFF]  w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'> 
                            <Grid> <ThermostatAutoIcon sx={{opacity: sensors.DHT ? 1 : 0.3, width: '3rem', height: '3rem',color:'#A1FFFF'}} /> </Grid>
                        </div>
                        <SwitchComponent isOn={sensors.DHT} onToggle={() => toggleSensors('DHT')}/>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>DHT Sensor</p>
                        <p className='text-[#EDBAFF]'>2KW</p>
                    </div>
                </div>
            </div>
            <div className="notifactions w-100 flex flex-col gap-4">
                <h3 className='flex items-center text-2xl my-4 w-full'>Information</h3>
                <div className="p-4 border-1 border-[#EDBAFF]  w-80 rounded-sm">
                    <div className='flex justify-between'>
                        <p className='text-2xl'>Temperature</p>
                        <Grid> <ThermostatAutoIcon sx={{color:'#A1FFFF'}} /> </Grid>
                    </div>
                    <p className='text-2xl my-1'>24°C</p>
                    <p>Jun 25, 2024, 04:11AM</p>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF]  w-80 rounded-sm">
                    <div className='flex justify-between'>
                        <p className='text-2xl'>Humidity</p>
                        <Grid> <WaterDropIcon sx={{color:'#A1FFFF'}} /> </Grid>
                    </div>
                    <p className='text-2xl'>50%</p>
                    <p>Jun 25, 2024, 04:11AM</p>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF]  w-80 rounded-sm">
                    <div className='flex justify-between'>
                        <p className='text-2xl'>Gas</p>
                        <Grid> <AirIcon sx={{color:'#A1FFFF'}} /> </Grid>
                    </div>    
                    <p className='text-2xl'>0</p>
                    <p>Jun 25, 2024, 04:11AM</p>
                </div>
            </div>
        </div>
    );
}

export default Devices;