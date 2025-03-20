import React, { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreDb } from './FirebaseConfig';
import { useAuth } from "./context/AuthProvider";
import SystemTemp from "./dashboard/SystemTemp";
import SystemHumidity from "./dashboard/SystemHumidity";
import Chart from "./dashboard/Chart";

function Using() {
    const { currentUser } = useAuth();
    const [hourlyData, setHourlyData] = useState([]);
    const [error, setError] = useState(null);

    const groupByHour = (rawData) => {
        const twelveHoursAgo = new Date().getTime() - 12 * 60 * 60 * 1000;
        const hourlyMap = {};

        // Initialize all 12 hours with zero energy
        const now = new Date();
        for (let i = 0; i < 12; i++) {
            const hourDate = new Date(now.getTime() - i * 60 * 60 * 1000);
            const hourLabel = `${hourDate.getHours()}:00`;
            hourlyMap[hourLabel] = { hour: hourLabel, energy: 0 };
        }

        // Aggregate actual data
        rawData.forEach(item => {
            const date = new Date(item.timestamp);
            if (isNaN(date.getTime())) {
                console.error(`Invalid timestamp in document ${item.id}: ${item.timestamp}`);
                return;
            }
            if (date.getTime() >= twelveHoursAgo) {
                const hourLabel = `${date.getHours()}:00`;
                if (hourlyMap[hourLabel]) {
                    hourlyMap[hourLabel].energy += item.power;
                }
            }
        });

        // Convert to array and sort by hour
        const result = Object.values(hourlyMap)
            .sort((a, b) => {
                const hourA = parseInt(a.hour.split(":")[0]);
                const hourB = parseInt(b.hour.split(":")[0]);
                return hourA - hourB; // Sort descending (most recent first)
            });

        return result;
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
            const aggregatedData = groupByHour(rawData);
            setHourlyData(aggregatedData);
            setError(null);
        }, (error) => {
            setError("Error fetching data: " + error.message);
            console.error("Error fetching data:", error);
        });

        return () => unsubscribe();
    }, [currentUser]);

    return (
        <div className="container flex gap-4 w-full justify-between flex-wrap items-center">
            <div className="flex gap-4 flex-wrap">
                <SystemTemp />
                <SystemHumidity />
            </div>
            <div className="w-1/2">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : hourlyData.length > 0 ? (
                    <Chart hourlyData={hourlyData} />
                ) : (
                    <p>No data available for the last 12 hours...</p>
                )}
            </div>
        </div>
    );
}

export default Using;