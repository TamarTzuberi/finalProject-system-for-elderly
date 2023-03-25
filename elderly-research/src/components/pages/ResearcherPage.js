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
import Papa from 'papaparse';
import ShowText from '../dropDownSelection/showText';



function ResearcherPage(props) {
    const [showBarObjective, setShowBarObjective] = useState(false);
    const [allFeatures, setAllFeatures] = useState();
    const [allMeetings, setAllMeetings] = useState();
    const [showBarSubjective, setShowBarSubjective] = useState(false);
    const [dataObjective, setDataObjective] = useState([]);
    const [dataSubjective, setDataSubjective] = useState([]);
    const [labelObjective, setLabelObjective] = useState('');
    const [labelSubjective, setLabelSubjective] = useState('');
    const [labels, setLabels] = useState([]);
    const [showLegendObjective, setShowLegendObjective] = useState(false);
    const [showLegendSubjective, setShowLegendSubjective] = useState(false);
    const [minObjective, setMinObjective] = useState(0);
    const [maxObjective, setMaxObjective] = useState(0);
    const [minSubjective, setMinSubjective] = useState(0);
    const [maxSubjective, setMaxSubjective] = useState(0);
    const [pointsStyle, setPointsStyle] = useState([]);
    const [pointsRadius, setPointsRadius] = useState([]);
    const [allElderlys, setAllElderlysData] = useState([]);
    const [elderlyIdChosen, setElderlyId] = useState("");
    const [elderlyData, setElderlyData] = useState("");
    const [showElderly, setShowElderly] = useState(false);
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

    useEffect(() => {
        handleElderly();
      }, [elderlyIdChosen]);

    useEffect(() => {
        getAllElderlys();
      }, []);
    
    const getAllElderlys = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            setAllElderlysData(responseAllElderlys.data)
            const allElderlysIds = (responseAllElderlys.data).map(e => e.id)
            setElderlyId(responseAllElderlys.data[0].id)
            return allElderlysIds;
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleElderly = async () =>
    {
            console.log("NAVIT ELDERLY ID CHOSE in handle Elderly -",elderlyIdChosen);

            setElderlyData(elderlyIdChosen)
            showElderlyData(elderlyIdChosen);
            getAllFeatures();
            
    } 

    const handleSelection = (elderlyId) =>
    {
        clearObjectiveData()
        clearSubjectiveData()
        setElderlyId(elderlyId)
    }

    const showElderlyData =  (elderlyId) =>
    {
        console.log("ELDERLY ID IN SHOW - ", elderlyId)
        const allData = allElderlys.find(item => item.id === elderlyId);
        const data = {"Gender": allData["gender"], "Birth Year": allData["birthYear"], "City": allData["city"]}

        setElderlyData(data);
        setShowElderly(true);

    }

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    
    const getAllFeatures = async () => 
    {
        const allFeaturesFromDB = {steps: [] ,activeMinutes: [], hr: [], loneliness: [],depression: [], physicalCondition: [] }
        const elderlyId = elderlyIdChosen; //just for now
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

        console.log("ALL FEATURES FROM DB -", allFeaturesFromDB)
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
        getAllMeetings();
        //to check valid dates
    }

    const showSteps = async (e) => {
  
        extract(allFeatures.steps,"obj")
        setLabelObjective('Steps');
        setShowLegendObjective(true);
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
        setShowLegendObjective(true);
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
        setShowLegendObjective(true);
        setMinObjective(0);
        setMaxObjective(300);
        setShowBarObjective(true);

    }

    const showDepression = async () => {
        extract(allFeatures.depression,"sub")
        setLabelSubjective('Depression Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);

    }

    const showLoneliness = async () => {
        extract(allFeatures.loneliness, "sub")
        setLabelSubjective('Lonliness Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);

    }
    const showPhysicalCondition = async () => {
        extract(allFeatures.physicalCondition, "sub")
        setLabelSubjective('Physical Condition Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(10);
        setShowBarSubjective(true);
    }

    const clearObjectiveData = async (e) => {
        setDataObjective([])
        setLabelObjective('');
        setShowLegendObjective(false);
        // setShowBarObjective(false);
    }

    const clearSubjectiveData = async (e) => {
        setDataSubjective([]);
        setLabelSubjective('');
        setShowLegendSubjective(false);
        // setShowBarSubjective(false);
    }

    const stringToDate = (date) =>{
        const today = new Date(date);
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const dateString = `${day}/${month + 1}/${year}`;
        return dateString
    }


    const downloadToCsv = async () => {
        const elderlyId = elderlyIdChosen;
        let rows = [];
        rows.push(['Date', 'Steps', 'Heart_Rate', 'Active_Minutes', 'Depression', 'Loneliness', 'Physical Condition'])
        for (let day = 0; day < allFeatures.steps.length; day++) {
            let date = allFeatures.steps[day].date;
            let step = allFeatures.steps[day] ? allFeatures.steps[day].value : "no data";
            let hr = allFeatures.hr[day] ? allFeatures.hr[day].value : "no data";
            let am = allFeatures.activeMinutes[day] ? allFeatures.activeMinutes[day].value : "no data";
            let dep = allFeatures.depression[day] ? allFeatures.depression[day].value : "no data";
            let lonliness = allFeatures.loneliness[day] ? allFeatures.loneliness[day].value : "no data";
            let physicalCond = allFeatures.physicalCondition[day] ? allFeatures.physicalCondition[day].value : "no data";
            rows.push([date, step + '', hr + '', am + '', dep + '', lonliness + '', physicalCond + '']);

        }

        const csv = Papa.unparse(rows);
        const csvData = encodeURI(csv);
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + csvData;
        link.download = `${elderlyId}_data.csv`;;
        document.body.appendChild(link);
        link.click();
    }


    const getAllMeetings = async () =>
    {
        const elderlyId = elderlyIdChosen;
        let meetingsArr = [];
        await axios.get(`http://localhost:3000/elderly/meetingsFullDetails/${elderlyId}`)
        .then(responseMeetings => {
            console.log("MEETING ARR -",responseMeetings);
            meetingsArr = responseMeetings.data;
            })
        .catch(error => {
            console.log(error);
        });

        const meetingDatesArr = meetingsArr.map(m => new Date(m.date).getTime());
        setAllMeetings(meetingDatesArr);

    }

    const extract = async (dataDateArr, dataType) => {
        let dataArr = []
        let dateArr = []
        let pointsStyleArr = []
        let pointsRadiusArr = []
        for (let key in dataDateArr) {
            let dataVal = dataDateArr[key].value
            let date = new Date(dataDateArr[key].date).getTime();
            dataArr.push(dataVal)
            dateArr.push(stringToDate(date))
            if (allMeetings.includes(date)) {
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
        <h2>Subjective Parameters</h2>
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
            <h2>Objective Parameters</h2>
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
                onClick={() => downloadToCsv()}>
                Download To CSV
            </button>
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
            <br></br>
            <div>
                    <select value={elderlyIdChosen} onChange={e => handleSelection(e.target.value)}>
                    {
                        allElderlys.map((option) => (
                     <option key={option.id} value={option.id}>
                     {option.id}
                    </option>
          ))}
                    </select>
                </div>
            <div style={{position: 'absolute'}}>
                    {showElderly &&
                    <ShowText data={elderlyData}/>}
                </div>
            </div>
        </div>
    );
}

export default ResearcherPage;
