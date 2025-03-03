import React from 'react'

function Header() {
  return (
    <div className='container h-30'>
        <div className="flex items-center h-full justify-between">
            <h3 className='text-2xl'>Dashboard</h3>
            <p className='text-xl'>Hello, user!</p>
        </div>
    </div>
  )
}

export default Header