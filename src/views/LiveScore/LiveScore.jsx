import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Chartjs} from "./Chartjs";
import {PusherInitializer} from "../../services/PusherService";
import Graph from '../Graph/Graph';

export default function LiveScore() {
    const [teamsData, setTeamsData] = useState(null);
    const [businessUnitsData, setBusinessUnitsData] = useState(null);

    let ServerIP = 'https://connect4-control.clpdcgit.clpdc.local/api/v1';
    // let ServerIP = 'http://localhost:8000/api/v1';

    useEffect(() => {
        (async () => await liveScore())();
        new PusherInitializer(setTeamsData, setBusinessUnitsData)
    }, []);

    const liveScore = async () => {
        const res = await axios.get(`${ServerIP}/liveScore`);
        setTeamsData(res.data.data.teams);
        setBusinessUnitsData(res.data.data.business_units);
    };

    return (
        <div className='d-flex flex-column justify-content-center h-100'>
            <Chartjs teams={teamsData} businessUnits={businessUnitsData}/>
        </div>
    );
}