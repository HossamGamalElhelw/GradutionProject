import React from 'react'
import Header from './dashboard/Header';
import Devices from './dashboard/Devices';
import Using from './Using';

function Dashboard() {
  return (
    <>
        <Header />
        <Using />
        <Devices />
    </>
  )
}

export default Dashboard