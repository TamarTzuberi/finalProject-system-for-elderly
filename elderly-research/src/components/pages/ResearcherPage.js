// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { serverURL } from '../../ClientUtils'
import BarChart from '../charts/BarChart';
import './ResearcherPage.css';
// import {hasCookie} from '../CookieManager';


function ResearcherPage(props) {
    const [showBarObjective, setShowBarObjective] = useState(false);
    const [showBarSubjective, setShowBarSubjective] = useState(false);
    const [dataObjective, setDataObjective] = useState([]);
    const [dataSubjective, setDataSubjective] = useState([]);
    const [labelObjective, setLabelObjective] = useState('');
    const [labelSubjective, setLabelSubjective] = useState('');
    const [labels, setLabels] = useState([]);
    const [minObjective, setMinObjective] = useState(0);
    const [maxObjective, setMaxObjective] = useState(0);
    const [minSubjective, setMinSubjective] = useState(0);
    const [maxSubjective, setMaxSubjective] = useState(0);
    const [pointsStyle, setPointsStyle] = useState([]);
    const [pointsRadius, setPointsRadius] = useState([]);
    const handleStart = (s) => {
        if (s) {
            setStart(s)
        }
    }

    const handleEnd = (e) => {
        if (e) {
            setEnd(e);
        }
    }

    const [start, setStart] = useState();
    const [end, setEnd] = useState();


    const result1 = {value: 4000, start: 1671919200000}
    const result2 = {value: 3500, start: 1672005600000}
    const result3 = {value: 8000, start: 1672092000000}
    const arr1 = [result1, result2, result3]

    const showSteps = async (e) => {
        extract(arr1,"obj")
        setLabelObjective('Steps');
        setMinObjective(0);
        setMaxObjective(10000);
        setShowBarObjective(true);
    }

    const result7 = {value: 85, start: 1671919200000}
    const result8 = {value: 100, start: 1672005600000}
    const result9 = {value: 105, start: 1672092000000}
    const arr3 = [result7, result8, result9]

    const showHR = async () => {

        extract(arr3,"obj")
        setLabelObjective('HR');
        setMinObjective(0);
        setMaxObjective(130);
        setShowBarObjective(true);

    }

    const result10 = {value: 8000, start: 1671919200000}
    const result11 = {value: 6500, start: 1672005600000}
    const result12 = {value: 10000, start: 1672092000000}
    const arr4 = [result10, result11, result12]

    const showDistance = async () => {
        extract(arr4,"obj")
        setLabelObjective('Distance');
        setMinObjective(0);
        setMaxObjective(15000);
        setShowBarObjective(true);

    }

    const result13 = {value: 50, start: 1671919200000}
    const result14 = {value: 120, start: 1672005600000}
    const result15 = {value: 80, start: 1672092000000}
    const arr5 = [result13, result14, result15]

    const showAM = async () => {
        extract(arr5,"obj" )
        setLabelObjective('Active Minutes');
        setMinObjective(0);
        setMaxObjective(300);
        setShowBarObjective(true);

    }


    const result4 = {value: 7, start: 1671919200000}
    const result5 = {value: 4, start: 1672005600000}
    const result6 = {value: 3, start: 1672092000000}
    const arr2 = [result4, result5, result6]

    const showSleep = async () => {
        extract(arr2, "obj")
        setLabelObjective('Hours of Sleep');
        setMinObjective(0);
        setMaxObjective(10);
        setShowBarObjective(true);
    }

    const showDepression = async () => {
        extract(arr2,"sub")
        setLabelSubjective('Depression Rate');
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);

    }
    const showLoneliness = async () => {
        extract(arr2, "sub")
        setLabelSubjective('Lonliness Rate');
        setMinSubjective(0);
        setMaxSubjective(20);
        setShowBarSubjective(true);

    }
    const showPhysicalCond = async () => {
        extract(arr2, "sub")
        setLabelSubjective('Physical Condition Rate');
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);
    }

    const clearObjectiveData = async (e) => {
        setDataObjective([])
        setLabelObjective('');
        setShowBarObjective(true);
    }

    const clearSubjectiveData = async (e) => {
        setDataSubjective([]);
        setLabelSubjective('');
        setShowBarSubjective(true);
    }

    const stringToDate = (date) =>{
        const today = new Date(date);
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const dateString = `${day}/${month + 1}/${year}`;
        return dateString
    }

    const meetingDatesArr =[1671919200000,1672005600000]; //getFunction

    const extract = async (dataDateArr, dataType) => {
        let dataArr = []
        let dateArr = []
        let pointsStyleArr = []
        let pointsRadiusArr = []
        for (let key in dataDateArr) {
            let dataVal = dataDateArr[key].value
            let date = dataDateArr[key].start
            dataArr.push(dataVal)
            dateArr.push(stringToDate(date))
            if (meetingDatesArr.includes(date)) {
                pointsStyleArr.push('star')
                pointsRadiusArr.push(10)
            }
            else {
                pointsStyleArr.push('circle')
                pointsRadiusArr.push(2)
            }
        }
        if (dataType ==='obj') {
            setDataObjective(dataArr)
        }
        if (dataType === 'sub'){
            setDataSubjective(dataArr)
        }
        setLabels(dateArr)
        setPointsStyle(pointsStyleArr)
        setPointsRadius(pointsRadiusArr)
    }
    const contentSubjectiveData = (
        <div className="buttons-section">
        <button
            className="sb-btn"
            onClick={() => showDepression()}>
            Depression
        </button>
        <button
            className="sb-btn"
            onClick={() => showLoneliness()}>
            Loneliness
        </button>
        <button
            className="sb-btn"
            onClick={() => showPhysicalCond()}>
            Physical Condition
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button
            className="sb-btn"
            onClick={() => clearSubjectiveData()}>
            Clear Data
        </button>
        </div>
    )
    const contentObjectiveData = (
        <div className="buttons-section">
            <button
                className="sb-btn"
                onClick={() => showSteps()}>
                Steps
            </button>
            <button
                className="sb-btn"
                onClick={() => showHR()}>
                Heart Rate
            </button>
            <button
                className="sb-btn"
                onClick={() => showAM()}>
                Active Minutes
            </button>
            <button
                className="sb-btn"
                onClick={() => showDistance()}>
                Distance
            </button>
            <button
                className="sb-btn"
                onClick={() => showSleep()}>
                Hours of Sleep
            </button>
            {/* <button
                className="sb-btn"
                onClick={() => downloadToCsv()}>
                הורדת קובץ
            </button> */}
            <br></br>
            <button
            className="sb-btn"
            onClick={() => clearObjectiveData()}>
            Clear Data
            </button>

        </div>
    );

    return (
        <div className="page">
            <div className="leftContainer">
            <Sidebar history={props.history} content={contentObjectiveData} />
            </div>
            <div className="middleContainer" style={{}}>
                <div style={{ top: 20, left: '65%', width: '100px', backgroundColor: 'white', marginRight: '150px'}}>
                    <input type='date' className='start' value={start} onChange={e => handleStart(e.target.value)} />
                    <input type='date' className='end' value={end} onChange={e => handleEnd(e.target.value)} />

                </div>
                <div style={{ top: 20, left: '65%', width: '100px', alignSelf: 'center'}}>
                <button className='saveButton'>Save Dates</button>

            </div>

                <div style={{ position: "absolute", top: '100px', left: '25%', height: '50%', width: '40%',backgroundColor: 'white', marginLeft: '70px', marginTop: '70px'}}>
                    {(showBarObjective || showBarSubjective) && <BarChart dataObjective={dataObjective} dataSubjective={dataSubjective} labelObjective={labelObjective} labelSubjective={labelSubjective} labels={labels} minObjective={minObjective} maxObjective={maxObjective} minSubjective={minSubjective} maxSubjective={maxSubjective} pointsStyle={pointsStyle} pointsRadius={pointsRadius}/>}
                </div> 
            </div>  
             <div className="rightContainer">
            <Sidebar history={props.history} content={contentSubjectiveData} />
            </div>
        </div>
    );
}

export default ResearcherPage;
