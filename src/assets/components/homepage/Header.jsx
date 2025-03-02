import React from 'react'
import './header.css'
import notifications_img from '../../images/notification.png'
import search_icon from '../../images/search-normal.png'

function Header() {
  return (
    <div className='header'>
        <div className="dashboard">
            <h3 className='dashboard_title'>Dashboard</h3>
            <form className='form_search'>
                <label className='label_search'>
                    <input className='input_search' type="text" placeholder='Search type of keywords'/>
                    <picture className='search_icon_picture'><img className='search_icon_img' src={search_icon} alt="search_icon" /></picture>
                </label>
            </form>
        </div>
        <div className="user_info">
            <picture className='picture_notifications'>
                <img className='img_notifications' src={notifications_img} alt="notifications_img" />
            </picture>

            <picture>
                <img src="./" alt="" />
            </picture>
            <p>logout</p>
        </div>
    </div>
  )
}

export default Header