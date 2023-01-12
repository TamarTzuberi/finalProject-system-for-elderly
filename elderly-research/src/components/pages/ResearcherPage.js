// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
// eslint-disable-next-line no-unused-vars
import axios, { all } from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { serverURL } from '../../ClientUtils'
import BarChart from '../charts/BarChart';
import './ResearcherPage.css';
// import {hasCookie} from '../CookieManager';


function ResearcherPage(props) {
    const [showBarObjective, setShowBarObjective] = useState(false);
    const [allFeatures, setAllFeatures] = useState();
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
            setStart(s);
        }
    }

    const handleEnd = (e) => {
        if (e) {
            setEnd(e); 
        }
    }

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    
    const getAllFeatures = async () => 
    {
        const allFeaturesFromDB = {steps: [] ,activeMinutes: [], hr: [], loneliness: [],depression: [], physicalCondition: [] }
        const elderlyId = "123569485"; //just for now
        const startDate = new Date(start);
        const endDate = new Date(end);

    await axios.get(`http://localhost:3000/researcher/features/steps/${elderlyId}/${startDate}/${endDate}`)
    .then(responseSteps => {
        console.log("STEPS -",responseSteps);
        allFeaturesFromDB.steps = responseSteps.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/activeMinutes/${elderlyId}/${startDate}/${endDate}`)
    .then(responseActiveMinutes => {
        console.log("ACTIVE MINUTES -",responseActiveMinutes);
        allFeaturesFromDB.activeMinutes = responseActiveMinutes.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/hr/${elderlyId}/${startDate}/${endDate}`)
    .then(responseHr => {
        console.log("HR -",responseHr);
        allFeaturesFromDB.hr = responseHr.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/loneliness/${elderlyId}/${startDate}/${endDate}`)
    .then(responseLonliness => {
        console.log("LONLINESS -",responseLonliness);
        allFeaturesFromDB.loneliness = responseLonliness.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/depression/${elderlyId}/${startDate}/${endDate}`)
    .then(responseDepression => {
        console.log("DEPRESSION -",responseDepression);
        allFeaturesFromDB.depression = responseDepression.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/physicalCondition/${elderlyId}/${startDate}/${endDate}`)
    .then(responsePhysicalCondition => {
        console.log("PHYSICAL CONDITION -",responsePhysicalCondition);
        allFeaturesFromDB.physicalCondition = responsePhysicalCondition.data;

        console.log("ALL FEATURES -", allFeatures)
    })
    .catch(error => {
        console.log(error);
    });
    // allFeaturesFromDB.steps = arr1;
    // allFeaturesFromDB.activeMinutes = arr5;
    // allFeaturesFromDB.hr = arr3;
    // allFeaturesFromDB.depression = arr2;
    // allFeaturesFromDB.loneliness = arr2;
    // allFeaturesFromDB.physicalCondition = arr2;
    // console.log("NAVIT -" , JSON.stringify(allFeaturesFromDB));
    setAllFeatures(allFeaturesFromDB);

}



    // const result1 = {value: 4000, start: 1671919200000}
    // const result2 = {value: 3500, start: 1672005600000}
    // const result3 = {value: 8000, start: 1672092000000}
    // const arr1 = [result1, result2, result3]

    const setDate = async(e) =>
    {
        getAllFeatures();
        //to check valid dates
    }

    const showSteps = async (e) => {
  
        extract(allFeatures.steps,"obj")
        setLabelObjective('Steps');
        setMinObjective(0);
        setMaxObjective(10000);
        setShowBarObjective(true);
    }

    // const result7 = {value: 85, start: 1671919200000}
    // const result8 = {value: 100, start: 1672005600000}
    // const result9 = {value: 105, start: 1672092000000}
    // const arr3 = [result7, result8, result9]

    const showHR = async () => {

        extract(allFeatures.hr,"obj")
        setLabelObjective('HR');
        setMinObjective(0);
        setMaxObjective(130);
        setShowBarObjective(true);

    }


    // const result13 = {value: 50, start: 1671919200000}
    // const result14 = {value: 120, start: 1672005600000}
    // const result15 = {value: 80, start: 1672092000000}
    // const arr5 = [result13, result14, result15]

    const showAM = async () => {
        extract(allFeatures.activeMinutes,"obj" )
        setLabelObjective('Active Minutes');
        setMinObjective(0);
        setMaxObjective(300);
        setShowBarObjective(true);

    }

    const showDepression = async () => {
        extract(allFeatures.depression,"sub")
        setLabelSubjective('Depression Rate');
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);

    }

    const showLoneliness = async () => {
        extract(allFeatures.loneliness, "sub")
        setLabelSubjective('Lonliness Rate');
        setMinSubjective(0);
        setMaxSubjective(20);
        setShowBarSubjective(true);

    }
    const showPhysicalCondition = async () => {
        extract(allFeatures.physicalCondition, "sub")
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
        console.log("tamar , type of date:",typeof(date));
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
            let date = dataDateArr[key].date
            console.log("tamar, date in extract :", date );
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
            onClick={() => showPhysicalCondition()}>
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
            {/* <button
                className="sb-btn"
                onClick={() => downloadToCsv()}>
                הורדת קובץ
            </button> */}
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
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
                <button className='saveButton' onClick={() => setDate()}>Set Dates</button>

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
