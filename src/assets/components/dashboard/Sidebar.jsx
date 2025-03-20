import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { useAuth } from '../context/AuthProvider'
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CottageIcon from '@mui/icons-material/Cottage';

function Sidebar() {
    const {currentUser,logout} = useAuth();

 return (
    <div className='sidebar'>
        <div className="logo">
            <CottageIcon sx={{width:'3rem',height:'3rem',color:'#A1FFFF'}}/>
            <h1 className='title_logo'>Integrated Home</h1>
        </div>
        <div className="options">
            <div className="option active">
                <DashboardIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} />
                <p>Dashboard</p>
            </div>
            <div className="option">
                <HistoryIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} />
                <p>Recent</p>
            </div>
            <div className="option">
                <SettingsIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} />
                <p>Setting</p>
            </div>
            <div className="option">
                <LogoutIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} />
                <p onClick={logout}>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar