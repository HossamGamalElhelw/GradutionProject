import ChartMonthly from './recent/ChartMonthly'
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreDb } from './FirebaseConfig';
import { useAuth } from "./context/AuthProvider";
import ChartDaily from './recent/ChartDaily' // Fixed typo
import ChartCostMonthly from './recent/ChartCostMonlty';
import AirIcon from '@mui/icons-material/Air';

function Recent() {
  const { currentUser } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);
  const [error, setError] = useState(null);

  const groupByMonth = (rawData) => {
      const twelveMonthsAgo = new Date().getTime() - 12 * 30 * 24 * 60 * 60 * 1000;
      const monthlyMap = {};
      const now = new Date(); // Added missing now declaration

      for (let i = 0; i < 12; i++) {
          const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthLabel = monthDate.toLocaleString('default', { month: 'short', year: 'numeric' });
          monthlyMap[monthLabel] = { month: monthLabel, energy: 0 };
      }

      rawData.forEach(item => {
          const date = new Date(item.timestamp);
          if (isNaN(date.getTime())) {
              console.error(`Invalid timestamp in document ${item.id}: ${item.timestamp}`);
              return;
          }
          if (date.getTime() >= twelveMonthsAgo) {
              const monthLabel = date.toLocaleString('default', { month: 'short', year: 'numeric' });
              if (monthlyMap[monthLabel]) {
                  monthlyMap[monthLabel].energy += item.power / 1000;
              }
          }
      });

      return Object.values(monthlyMap)
          .sort((a, b) => new Date(a.month) - new Date(b.month))
          .map(item => ({
              ...item,
              energy: Number(item.energy.toFixed(2)) // Added rounding for consistency
          }));
  };

  const groupByDay = (rawData) => {
      const twelveDaysAgo = new Date().getTime() - 12 * 24 * 60 * 60 * 1000;
      const dailyMap = {};
      const now = new Date();

      for (let i = 0; i < 7; i++) {
          const dayDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
          const dayLabel = dayDate.toLocaleString('default', { 
              day: 'numeric', 
              month: 'short'
          });
          dailyMap[dayLabel] = { day: dayLabel, energy: 0 };
      }

      rawData.forEach(item => {
          const date = new Date(item.timestamp);
          if (isNaN(date.getTime())) {
              console.error(`Invalid timestamp in document ${item.id}: ${item.timestamp}`);
              return;
          }
          if (date.getTime() >= twelveDaysAgo) {
              const dayLabel = date.toLocaleString('default', { 
                  day: 'numeric', 
                  month: 'short',
              });
              if (dailyMap[dayLabel]) {
                  dailyMap[dayLabel].energy += item.power / 1000;
              }
          }
      });

      return Object.values(dailyMap)
          .sort((a, b) => new Date(a.day) - new Date(b.day))
          .map(item => ({
              ...item,
              energy: Number(item.energy.toFixed(2))
          }));
  };

    useEffect(() => {
        if (!currentUser) {
            setError("Please log in to view energy data");
            return;
        }

    const sensorCollection = collection(firestoreDb, `users/${currentUser.uid}/energyReadings`);
    const unsubscribe = onSnapshot(sensorCollection, (snapshot) => {
        const rawData = snapshot.docs.map(doc => ({
            id: doc.id,
            power: doc.data().power,
            timestamp: doc.data().timestamp
        }));
        console.log("Raw data from Firestore:", rawData);
        
        const monthlyAggregatedData = groupByMonth(rawData);
        const dailyAggregatedData = groupByDay(rawData);
        
        setMonthlyData(monthlyAggregatedData);
        setDailyData(dailyAggregatedData);
        setError(null);
    }, (error) => {
        setError("Error fetching data: " + error.message);
        console.error("Error fetching data:", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

    return (
        <div div className="py-4">
            <div className='flex justify-between max-md:flex-col'>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : dailyData.length > 0 ? (
                    <ChartDaily dailyData={dailyData} />
                ) : (
                    <p>No data available for the last 7 days...</p>
                )}
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : monthlyData.length > 0 ? (
                    <ChartMonthly monthlyData={monthlyData} />
                ) : (
                    <p>No data available for the last 12 months...</p>
                )}
            </div>
            <div className='flex justify-between px-4'>
                <div className='w-full'>
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : monthlyData.length > 0 ? (
                        <ChartCostMonthly monthlyData={monthlyData}/>
                    ) : (
                        <p>No data available for the last 12 months...</p>
                    )}
                </div>
                <div className="notifications w-1/3 m-2">
                    <h3 className='text-xl mb-2'>Lastest Alerts</h3>
                    <div className="content_notifications h-80 overflow-y-scroll border-1 p-4">
                        <div className="alert p-2 bg-gray-900 rounded-sm my-2">
                            <div className='flex justify-between'>
                                <p>Gas Sensor</p>
                                <AirIcon />
                            </div>
                            <p className='text-red-500'>There is a leak in Gas</p>
                            <div className='flex justify-between'>
                                <p>jan 24 , 12:12pm</p>
                                <p>jan 24 , 12:12pm</p>
                            </div>
                        </div>
                        <div className="alert p-2 bg-gray-900 rounded-sm my-2">
                            <div className='flex justify-between'>
                                <p>Gas Sensor</p>
                                <AirIcon />
                            </div>
                            <p className='text-red-500'>There is a leak in Gas</p>
                            <div className='flex justify-between'>
                                <p>jan 24 , 12:12pm</p>
                                <p>jan 24 , 12:12pm</p>
                            </div>
                        </div>
                        <div className="alert p-2 bg-gray-900 rounded-sm my-2">
                            <div className='flex justify-between'>
                                <p>Gas Sensor</p>
                                <AirIcon />
                            </div>
                            <p className='text-red-500'>There is a leak in Gas</p>
                            <div className='flex justify-between'>
                                <p>jan 24 , 12:12pm</p>
                                <p>jan 24 , 12:12pm</p>
                            </div>
                        </div>
                        <div className="alert p-2 bg-gray-900 rounded-sm my-2">
                            <div className='flex justify-between'>
                                <p>Gas Sensor</p>
                                <AirIcon />
                            </div>
                            <p className='text-red-500'>There is a leak in Gas</p>
                            <div className='flex justify-between'>
                                <p>jan 24 , 12:12pm</p>
                                <p>jan 24 , 12:12pm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recent;