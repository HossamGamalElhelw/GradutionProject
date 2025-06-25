import React from 'react'
import Header from './homepage/Header';
import Devices from './homepage/Devices';
import SystemHumidity from './homepage/SystemHumidity';
import SystemTemp from './homepage/SystemTemp';
import Using from './Using';
import Sidebar from './homepage/Sidebar';

function HomePage() {
  return (
    <>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Header />
        <Using />
        <Devices />
      </main> 
    </>
  )
}

export default HomePage