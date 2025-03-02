import React from 'react'
import './rooms.css'


function Rooms() {
  return (
    <div className='rooms_container container'>
        <div className="rooms_control">
            <button className='btn_room btn_active'>BathRoom</button>
            <button className='btn_room'>BadRoom</button>
            <button className='btn_room'>BadRoom</button>
            <button className='btn_room'>BadRoom</button>
        </div>
        <div>
            <button className='btn_add_room'> <span className='plus'>+</span>Add Room</button>
        </div>
    </div>
  )
}

export default Rooms