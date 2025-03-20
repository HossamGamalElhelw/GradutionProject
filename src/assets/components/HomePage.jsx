import React, { useState } from 'react'
import Sidebar from './dashboard/Sidebar';
import Dashboard from './Dashboard';
import Recent from './Recent';
import Setting from './Setting';

function HomePage() {

  const [activeDashboard ,setActiveDashboard] = useState(true);
  const [activeRecent ,setActiveRecent] = useState(false);
  const [activeSetting ,setActiveSetting] = useState(false);
  const [activePage , setActivePage] = useState('');
  
  const handleClick = (e) =>{
    const clickedElement = e.target.closest('p');
    if(clickedElement){
      const pageName = clickedElement.textContent;
      setActivePage(pageName);

      setActiveRecent(false);
      setActiveSetting(false);
      setActiveDashboard(false);

      switch(pageName){
        case 'Dashboard' :
          setActiveDashboard(true);
          break;
        case 'Recent':
          setActiveRecent(true);
          break;
        case 'Setting':
          setActiveSetting(true);
          break;
        default:
          setActiveDashboard(true);
      }
    }
  }

  return (
    <>
      <aside onClick={handleClick}>
        <Sidebar />
      </aside>
      <main>
        {activeDashboard && <Dashboard/>}
        {activeRecent && <Recent />}
        {activeSetting && <Setting />}
      </main> 
    </>
  )
}

export default HomePage