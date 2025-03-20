import React, { useEffect, useRef, useState } from 'react';
import { ref, set, onValue } from "firebase/database";
import { collection, addDoc } from 'firebase/firestore';
import { database, firestoreDb } from '../FirebaseConfig';

import { useAuth } from '../context/AuthProvider';
import SwitchComponent from './../../utils/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SpeakerIcon from '@mui/icons-material/Speaker';
import EmergencyRecordingIcon from '@mui/icons-material/EmergencyRecording';
import AirIcon from '@mui/icons-material/Air';
import BoltIcon from '@mui/icons-material/Bolt';
import DHTSensor from '../sensors/DHTSensor';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import { async } from '@firebase/util';

function Devices() {
    const { currentUser } = useAuth();
    const db = database;

    const [leds, setLeds] = useState({ led1: false, led2: false });
    const [gasSensor, setGasSensor] = useState({ leak: 0, state: false });
    const [speaker, setSpeaker] = useState(false);
    const [window, setWindow] = useState(false);
    const [camera, setCamera] = useState({ isOn: false ,detectPerson: false});
    const [tempValue, setTempValue] = useState(0);
    const [gasLeak , setGasLeak] = useState(0);
    const [power , setPower] = useState(0);

    
    //* LED Functions
    const writeLedState = (ledName, state) => {
        if (currentUser) {
            set(ref(db, `users/${currentUser.uid}/leds/${ledName}`), state)
                .then(() => console.log(`${ledName} state updated to ${state}`))
                .catch((error) => console.error("Error writing LED state: ", error));
        }
    };

    const readLedsState = () => {
        if (currentUser) {
            const ledsRef = ref(db, `users/${currentUser.uid}/leds`);
            const unsubscribe = onValue(ledsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setLeds(prev => ({ ...prev, ...data }));
                }
            });
            return unsubscribe;
        }
    };

    const toggleLed = (ledName) => {
        setLeds(prev => {
            const newState = !prev[ledName];
            writeLedState(ledName, newState);
            return { ...prev, [ledName]: newState };
        });
    };

    //* Gas Sensor Functions
    const writeSensorState = async (sensorName, state) => {
        if (currentUser) {
            try {
                await set(ref(db, `users/${currentUser.uid}/sensors/${sensorName}/state`), state);
                return console.log(`${sensorName} state updated to ${state}`);
            } catch (error) {
                return console.error("Error writing sensor state: ", error);
            }
        }
    };

    const readGasSensor = () => {
        if (currentUser) {
            const gasRef = ref(db, `users/${currentUser.uid}/sensors/gas`);
            const unsubscribe = onValue(gasRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setGasSensor(data);
                }
            });
            return unsubscribe;
        }
    };
    const readGasSensorLeak = () => {
        if (currentUser) {
            const gasLeakRef = ref(db, `users/${currentUser.uid}/sensors/gas/leak`);
            const unsubscribe = onValue(gasLeakRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setGasLeak(data);
                }
            });
            return unsubscribe;
        }
    };

    const toggleGasSensor = () => {
        setGasSensor(prev => {
            const newState = !prev.state;
            writeSensorState('gas', newState);
            return { ...prev, state: newState };
        });
    };

    //* Speaker Functions
    const writeSpeakerState = (state) => {
        if (currentUser) {
            set(ref(db, `users/${currentUser.uid}/speaker`), state)
                .then(() => console.log(`Speaker state updated to ${state}`))
                .catch((error) => console.error("Error writing Speaker state: ", error));
        }
    };

    const readSpeakerState = () => {
        if (currentUser) {
            const speakerRef = ref(db, `users/${currentUser.uid}/speaker`);
            const unsubscribe = onValue(speakerRef, (snapshot) => {
                const data = snapshot.val();
                setSpeaker(data !== null ? data : false);
            });
            return unsubscribe;
        }
    };

    const toggleSpeaker = (newState) => {
        setSpeaker(newState);
        writeSpeakerState(newState);
    };

    // * Camera Functions
    const writeCameraState = (state) => {
        if (currentUser) {
            set(ref(db, `users/${currentUser.uid}/camera`), {
                isOn: state.isOn,
                detectPerson: state.detectPerson
            })
                .then(() => console.log(`Camera state updated to isOn: ${state.isOn}, detectPerson: ${state.detectPerson}`))
                .catch((error) => console.error("Error writing camera state: ", error));
        }
    };

    const readCameraState = () => {
        if (currentUser) {
            const cameraRef = ref(db, `users/${currentUser.uid}/camera`);
            const unsubscribe = onValue(cameraRef, (snapshot) => {
                const data = snapshot.val();
                setCamera(data !== null ? {
                    isOn: data.isOn || false,
                    detectPerson: data.detectPerson || false
                } : { isOn: false, detectPerson: false });
            });
            return unsubscribe;
        }
    };

    const toggleCamera = (newIsOn) => {
        setCamera(prev => {
            const newState = {
                ...prev,
                isOn: newIsOn
            };
            writeCameraState(newState);
            return newState;
        });
    };

    const updateCameraDetection = (detectPerson) => {
        setCamera(prev => {
            const newState = {
                ...prev,
                detectPerson: detectPerson
            };
            writeCameraState(newState);
            return newState;
        });
    };
    // * Read DHT Temperature
    const readDhtTemperature = () => {
        if (currentUser) {
            const tempValue = ref(db, `users/${currentUser.uid}/sensors/DHT/temperature`);
            const unsubscribe = onValue(tempValue, (snapshot) => {
                const data = snapshot.val();
                setTempValue(data !== null ? data : false);
            });
            return unsubscribe;
        }
    };
    const readPower = () => {
        if (currentUser) {
            const powerRef = ref(db, `users/${currentUser.uid}/sensors/power/value`);
            const unsubscribe = onValue(powerRef, (snapshot) => {
                const data = snapshot.val();
                setPower(data !== null ? data : false);
            });
            return unsubscribe;
        }
    };
    // * write initialize values in sensors
    const writeSensorValues = async() =>{
        if (!currentUser) return console.log('No current user');
        // const dbPath = `users/${currentUser.uid}/sensors`;
        // try {
        //     const dhtRef = ref(db, `${dbPath}/DHT`);
        //     const dhtSnapshot = await get(dhtRef);
        //     if(!dhtSnapshot.exist()){
        //         await set(dhtRef, {
        //             humidity: 0,
        //             temperature: 0,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        set(ref(db, `users/${currentUser.uid}/sensors/DHT`), {
            state: false,
            humidity: 0,
            temperature: 0,
        })
        set(ref(db, `users/${currentUser.uid}/sensors/gas`), {
            isLeak: false,
            leak: 23,
        })
        set(ref(db, `users/${currentUser.uid}/sensors/gas`), {
            isLeak: false,
            leak: 23,
        })
        set(ref(db, `users/${currentUser.uid}/sensors/power`), {
            value: 1,
        })
        
    }
    //* Write Power to Firestore Hourly
    const savePowerToFirestore = async () => {
        if (!currentUser) return;
        
        try {
            const powerCollection = collection(firestoreDb, `users/${currentUser.uid}/energyReadings`);
            await addDoc(powerCollection, {
                power: power, 
                timestamp: new Date().toISOString(),
            });
            console.log(`Power ${power} kW saved to Firestore at ${new Date().toISOString()}`);
        } catch (error) {
            console.error("Error saving power to Firestore:", error);
        }
    };
    // * render in the first only
    useEffect(()=>{
        writeSensorValues();
    },[])
    useEffect(() => {
        if (currentUser) {
            const unsubscribeLeds = readLedsState();
            const unsubscribeSpeaker = readSpeakerState();
            const unsubscribeCamera = readCameraState();
            const unsubscribeGas = readGasSensor();
            const unsubscribeGasLeak = readGasSensorLeak();
            const unsubscribeTemp = readDhtTemperature();
            const unsubscribePower = readPower();
            
            savePowerToFirestore();

            // Save every minute for testing
            const interval = setInterval(() => {
                savePowerToFirestore();
            }, 60000);

            return () => {
                unsubscribeLeds && unsubscribeLeds();
                unsubscribeSpeaker && unsubscribeSpeaker();
                unsubscribeCamera && unsubscribeCamera();
                unsubscribeGas && unsubscribeGas();
                unsubscribeGasLeak && unsubscribeGasLeak();
                unsubscribeTemp && unsubscribeTemp();
                unsubscribePower && unsubscribePower();
                clearInterval(interval);
            };
        }
    }, [currentUser,power]);

    return (
        <div className='container flex flex-wrap gap-40 mb-8 max-2xl:gap-5'>
            <div className="flex gap-4 flex-wrap w-150 max-2xl:w-full">
                <h3 className='flex items-center text-2xl my-4 w-full'>Devices</h3>
                <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <WbSunnyIcon sx={{ opacity: leds.led1 ? 1 : 0.3, width: '3rem', height: '3rem', color: '#A1FFFF' }} />
                        </div>
                        <SwitchComponent isOn={leds.led1} onToggle={() => toggleLed('led1')} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>LED 1</p>
                        <p className='text-[#EDBAFF]'>3KW</p>
                    </div>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <WbSunnyIcon sx={{ opacity: leds.led2 ? 1 : 0.3, width: '3rem', height: '3rem', color: '#A1FFFF' }} />
                        </div>
                        <SwitchComponent isOn={leds.led2} onToggle={() => toggleLed('led2')} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>LED 2</p>
                        <p className='text-[#EDBAFF]'>3KW</p>
                    </div>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="flex justify-between">
                        <div>
                            <SpeakerIcon sx={{ opacity: speaker ? 1 : 0.3, width: '3rem', height: '3rem', color: '#A1FFFF' }} />
                        </div>
                        <SwitchComponent isOn={speaker} onToggle={toggleSpeaker} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>Speaker</p>
                        <p className='text-[#EDBAFF]'>3KW</p>
                    </div>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="flex justify-between">
                        <div>
                            <EmergencyRecordingIcon sx={{ opacity: camera.isOn ? 1 : 0.3, width: '3rem', height: '3rem', color: '#A1FFFF' }} />
                        </div>
                        <SwitchComponent isOn={camera.isOn} onToggle={toggleCamera} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>Camera</p>
                        <p className='text-[#EDBAFF]'>5KW</p>
                    </div>
                </div>
                <div className="p-4 border-1 border-[#EDBAFF] w-70 rounded-sm">
                    <div className="logo_switch flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <AirIcon sx={{ opacity: gasSensor.state ? 1 : 0.3, width: '3rem', height: '3rem', color: '#A1FFFF' }} />
                        </div>
                        <SwitchComponent isOn={gasSensor.state} onToggle={toggleGasSensor} />
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <p className='text-[#A1FFFF]'>Gas Sensor</p>
                        <p className='text-[#EDBAFF]'>1KW</p>
                    </div>
                </div>
                <DHTSensor currentUser={currentUser}/>
            </div>
            <div>
                <h3 className='flex items-center text-2xl my-4 w-full'>Information</h3>
                <div className='flex flex-col gap-4 max-2xl:flex-row flex-wrap'>
                    <div className="p-4 border-1 border-[#EDBAFF] w-80 rounded-sm">
                        <div className='flex justify-between'>
                            <p className='text-2xl'>Power</p>
                            <BoltIcon sx={{ width: '2rem', height: '2rem', color: '#A1FFFF' }} />
                        </div>
                        <p className='text-2xl'>{power} W</p>
                        <p>{new Date().toLocaleString()}</p>
                    </div>
                    <div className="p-4 border-1 border-[#EDBAFF] w-80 rounded-sm">
                        <div className='flex justify-between'>
                            <p className='text-2xl'>Temperature</p>
                            <ThermostatAutoIcon sx={{ width: '2rem', height: '2rem', color: '#A1FFFF' }} />
                        </div>
                        <p className='text-2xl my-1'>{tempValue} °C</p>
                        <p>{new Date().toLocaleString()}</p>
                    </div>
                    <div className="p-4 border-1 border-[#EDBAFF] w-80 rounded-sm">
                        <div className='flex justify-between'>
                            <p className='text-2xl'>Gas</p>
                            <AirIcon sx={{ width: '2rem', height: '2rem', color: '#A1FFFF' }} />
                        </div>
                        <p className='text-2xl'>{gasLeak}</p>
                        <p>{new Date().toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Devices;