import React, { useEffect, useState } from 'react'
import './sidebar.css'
import dashboard_option_img from '../../images/dashboard_option.png'
import recent_img from '../../images/video-time.png'
import logo from '../../images/logo.png'
import support_img from '../../images/help.png'
import setting_img from '../../images/setting-2.png'
import { useAuth } from '../context/AuthProvider'
import Grid from '@mui/material/Grid';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
    const {currentUser,logout} = useAuth();

 return (
    <div>
        <div className="logo">
            <picture className='picture_logo'><img className='img_logo' src={logo} alt="logo" /></picture>
            <h1 className='title_logo'>Integrated Home</h1>
        </div>
        <div className="options">
            <div className="option active">
                <Grid> <DashboardIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} /> </Grid>
                <p>Dashboard</p>
            </div>
            <div className="option">
                <Grid> <HistoryIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} /> </Grid>
                <p>Recent</p>
            </div>
            <div className="option">
                <Grid> <SettingsIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} /> </Grid>
                <p>Setting</p>
            </div>
            <div className="option">
                <Grid> <LogoutIcon sx={{width:'2rem',height:'2rem',color:'#A1FFFF'}} /> </Grid>
                <p>Logout</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar