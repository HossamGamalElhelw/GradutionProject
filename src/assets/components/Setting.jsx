import React, { useEffect } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from './context/AuthProvider';
import { getDatabase, ref, onValue } from "firebase/database";
import { database } from './FirebaseConfig';

function Setting() {
    const {currentUser} = useAuth();
    const apiKey = database.app._options.apiKey;
    const userId = currentUser.uid;
    const userEmail = currentUser.email;
    console.log(currentUser);
    
    return (
        <div className='p-4'>
            <div className='flex gap-4 mb-4'>
                <SettingsIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}}/>
                <h2 className='text-2xl'>Setting</h2>
            </div>
            <div className='border-1 w-1/2 flex flex-col p-4'>
                <h3 className='text-xl'>Account</h3>
                <label>
                        Email
                        <input type="text" value={`${userEmail || 'not found'}`} disabled className='w-1/2 p-2'/>
                </label>
                <label>
                        userName
                        <input type="text" value={'hossamjamalElehelW'}  disabled className='w-1/2 p-2'/>
                </label>
                <label>
                        Api key : 
                        <input type="text" value={`${apiKey || 'not found'}`} disabled className='w-1/2 p-2'/>
                </label>
                <label>
                        User Id :
                        <input type="text" value={`${userId || 'not found'}`} disabled className='w-1/2 p-2'/>
                </label>
                <label>
                        Password
                        <input type="password"  className='w-1/2 p-2 ml-2  border-1'/>
                </label>
                <label>
                        Confirm Password
                        <input type="password"  className='w-1/2 p-2 ml-2 border-1'/>
                </label>
            </div>
        </div>
    )
}

export default Setting