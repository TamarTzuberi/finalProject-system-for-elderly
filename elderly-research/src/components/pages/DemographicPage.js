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
import { Redirect } from 'react-router-dom';
// import { validateHeaderName } from 'http';




function DemographicPage(props) {
    const [showBarObjective, setShowBarObjective] = useState(false);
    const [allFeatures, setAllFeatures] = useState();
    // const [allMeetings, setAllMeetings] = useState();
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
    // const [pointsStyle, setPointsStyle] = useState([]);
    // const [pointsRadius, setPointsRadius] = useState([]);
    const [allElderlys, setAllElderlysData] = useState([]);
    // const [elderlyIdChosen, setElderlyId] = useState("");
    // const [elderlyData, setElderlyData] = useState("");
    // const [showElderly, setShowElderly] = useState(false);
    const [datesArray, setDatesArray] = useState([]);
    // const [allCites, setAllCitiesData] = useState([]);
    const [cityChosen, setCity] = useState("");
    const [genderChosen, setGender] = useState("");
    // const [ageChosen, setAge] = useState("");
    const [cityData, setCityData] = useState("");
    const [genderData, setGenderData] = useState("");
    // const [ageData, setAgeData] = useState("");
    // const [showCity, setShowCity] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDropdownFocus=(state) =>
    {
        setOpen(!state)
    }


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

    // useEffect(() => {
    //     handleElderly();
    //   }, [elderlyIdChosen]);

    useEffect(() => {
        getAllElderlys();
      }, []);

      useEffect(() => {
        datesArr();
      }, [allFeatures]);

      useEffect(() => {
        handleCity();
      }, [cityChosen]);

      useEffect(() => {
        handleGender();
      }, [genderChosen]);

    //   useEffect(() => {
    //     handleAge();
    //   }, [ageChosen]);

    useEffect(() => {
        getAllCities();
      }, []);

      useEffect(() => {
        getAllGenders();
      }, []);
    
    const getAllElderlys = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            setAllElderlysData(responseAllElderlys.data)
            const allElderlysIds = (responseAllElderlys.data).map(e => e.elderlyNum)
            return allElderlysIds;
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getAllCities = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            const allCities = (responseAllElderlys.data).map(e => e.city)
            setCity(responseAllElderlys.data[0].city)
            return allCities;
        })
        .catch(error => {
            console.log(error);
        });

    }

    const getAllGenders = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            const allGenders = (responseAllElderlys.data).map(e => e.gender)
            setGender(responseAllElderlys.data[0].gender)
            return allGenders;
        })
        .catch(error => {
            console.log(error);
        });

    }

    const handleCity = async () =>
    {
            console.log("STAV CITY CHOSEN in handle city -", cityChosen);

            setCityData(cityChosen);
            // showCityData(cityChosen);
            getAllFeatures();
            
    } 

    const handleGender = async () =>
    {
            console.log("STAV GENDER CHOSEN in handle gender -", genderChosen);

            setGenderData(genderChosen);
            // showGenderData(genderChosen);
            getAllFeatures();
            
    } 
    
    // const handleAge = async () =>
    // {
    //         console.log("STAV Age CHOSEN in handle gender -", genderChosen);

    //         setGenderData(ageChosen);
    //         // showGenderData(genderChosen);
    //         getAllFeatures();
            
    // } 

    const handleSelectionCity = (cityName) =>
    {
        clearObjectiveData();
        clearSubjectiveData();
        setCity(cityName);
    }

    const handleSelectionGender = (gender) =>
    {
        clearObjectiveData();
        clearSubjectiveData();
        setGender(gender);
    }

    // const handleSelectionAge = (age) =>
    // {
    //     clearObjectiveData();
    //     clearSubjectiveData();
    //     setAge(age);
    // }

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    
    const getAllFeatures = async () => 
    {
        const allFeaturesFromDB = {steps: [] ,activeMinutes: [], hr: [], loneliness: [],depression: [], physicalCondition: [] }
        const city = cityChosen;
        const gender = genderChosen;
        const startDate = new Date(start);
        const endDate = new Date(end);

    await axios.get(`http://localhost:3000/researcher/features/${"Steps"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responseSteps => {
        console.log("STEPS -",responseSteps);
        allFeaturesFromDB.steps = responseSteps.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"ActiveMinutes"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responseActiveMinutes => {
        console.log("ACTIVE MINUTES -",responseActiveMinutes);
        allFeaturesFromDB.activeMinutes = responseActiveMinutes.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"HR"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responseHr => {
        console.log("HR -",responseHr);
        allFeaturesFromDB.hr = responseHr.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"Loneliness"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responseLonliness => {
        console.log("LONLINESS -",responseLonliness);
        allFeaturesFromDB.loneliness = responseLonliness.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"Depression"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responseDepression => {
        console.log("DEPRESSION -",responseDepression);
        allFeaturesFromDB.depression = responseDepression.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"PhysicalCondition"}/${city}/${gender}/${startDate}/${endDate}`)
    .then(responsePhysicalCondition => {
        console.log("PHYSICAL CONDITION -",responsePhysicalCondition);
        allFeaturesFromDB.physicalCondition = responsePhysicalCondition.data;

    })
    .catch(error => {
        console.log(error);
    });
    setAllFeatures(allFeaturesFromDB);
    return allFeaturesFromDB;

}

    const minDate = async () =>{
        let minD = new Date();

        for (const key in allFeatures) {
            const arr = allFeatures[key];

            if (Array.isArray(arr) && arr.length > 0) {
                const a = arr.map(item => new Date(item.date));
                const min = new Date(Math.min(...a));
                if (min < minD) {
                    minD = min;
                }
            }
        }
        return minD.toISOString();

    }

    const maxDate = async () => {
        const arrOfMaxDates = [];
        for (const key in allFeatures) {
            const arr = allFeatures[key];
            console.log("ARR= ", arr)
            if (Array.isArray(arr) && arr.length > 0) {
                const a = arr.map(item => new Date(item.date));
                const max = new Date(Math.max(...a));
                arrOfMaxDates.push(max);
            }
        }
        const maxD = new Date(Math.max(...arrOfMaxDates));
        return maxD.toISOString();

    }


    const setDates = async(e) =>
    {
        getAllFeatures();
    }

    const datesArr = async() => {
        const newDates = [];
        const min = await minDate();
        const max = await maxDate();
        const startDate = new Date(min);
        const endDate = new Date(max);
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            newDates.push(d.getTime());
            }
            setDatesArray(newDates);

    }

    const showSteps = async (e) => {
        console.log("STAV ALL:::",allFeatures.steps);
        extract(allFeatures.steps,"obj")
        setLabelObjective('Steps');
        setShowLegendObjective(true);
        setMinObjective(0);
        setMaxObjective(10000);
        setShowBarObjective(true);
    }


    const showHR = async () => {
        extract(allFeatures.hr,"obj")
        setLabelObjective('HR');
        setShowLegendObjective(true);
        setMinObjective(0);
        setMaxObjective(130);
        setShowBarObjective(true);
    }


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

    const extract = async (dataDateArr, dataType) => {
        // console.log("DATES IN EXTRACT: ", dataDateArr);
        let dataArr = []
        let dateArr = []
        console.log("DATES IN EXTRACT: ", datesArray);

        for (let key1 in datesArray) {
            dateArr.push(stringToDate(datesArray[key1]))
        }
        for (let key in dataDateArr) {
            let dataVal = dataDateArr[key].value;
            let date = new Date(dataDateArr[key].date).getTime();
            if (datesArray.includes(date)){
                dataArr.push(dataVal)
                // dateArr.push(stringToDate(date))
            }
            else{
                dataArr.push(0)
                // dateArr.push(stringToDate(date))
            }
        }

        // console.log("DATE ARR FORMAT: ", dataArr)
        if (dataType ==='obj') {
            setDataObjective(dataArr)
        }
        if (dataType === 'sub'){
            setDataSubjective(dataArr)
        }
        if (dataDateArr.length === 0){
            alert("There is no data on the selected dates")
        }
        else{
            setLabels(dateArr)
        }

    }

    const downloadToCsv = async () => {
        const cityName = cityChosen;
        const gender = genderChosen;
        let rows = [];
        rows.push(['Date', 'Average Steps', 'Average Heart_Rate', 'Average Active_Minutes', 'Average Depression', 'Average Loneliness', 'Average Physical Condition'])
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
        link.download = `${cityName}_${gender}_data.csv`;
        document.body.appendChild(link);
        link.click();
    }

    const handleButtonClick = () => {
        setIsSubmitted(true);
      };

    if (isSubmitted) {
        return <Redirect to="/ResearcherPage" />;
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
            <div className="leftContainer" style={{marginTop:"45px"}}>
            <Sidebar history={props.history} content={contentObjectiveData} />
            </div>
            <div className="middleContainer" style={{}}>
                <div style={{ top: 20, left: '65%', width: '100px', backgroundColor: 'white', marginRight: '150px'}}>
                    <input type='date' className='start' value={start} onChange={e => handleStart(e.target.value)} />
                    <input type='date' className='end' value={end} onChange={e => handleEnd(e.target.value)} />
                </div>
                <div style={{ top: 20, left: '65%', width: '100px', alignSelf: 'center'}}>
                <button className='saveButton' onClick={() => setDates()}>Set Dates</button>
            </div>
                <div style={{ position: "absolute", top: '100px', left: '25%', height: '50%', width: '40%',backgroundColor: 'white', marginLeft: '70px', marginTop: '0px'}}>
                    {(showBarObjective || showBarSubjective) && <BarChart dataObjective={dataObjective} dataSubjective={dataSubjective} labelObjective={labelObjective} labelSubjective={labelSubjective} labels={labels} minObjective={minObjective} maxObjective={maxObjective} minSubjective={minSubjective} maxSubjective={maxSubjective} />}
                </div> 
            </div>  
             <div className="rightContainer">
                <div className='app-drop-down-container'>
                    <button onClick={e=>handleDropdownFocus(open)}>Other options</button>
                    {open && (
                        <ul>
                            <li onClick={handleButtonClick}>Personal information</li>
                        </ul>
                    )}
                </div>
                <Sidebar history={props.history} content={contentSubjectiveData} />
                <br></br>
                <div style={{backgroundColor: '#f9f9f9', fontWeight: 'bold', textAlign: 'center'}}>City: 
                    <select value={cityChosen} onChange={e => handleSelectionCity(e.target.value)}>
                        {[...new Set(allElderlys.map(option => option.city))].map(city => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                        ))}
                        <option>{"All"}</option>
                    </select>
                </div>
                <div style={{backgroundColor: '#f9f9f9', fontWeight: 'bold', textAlign: 'center'}}>Gender: 
                    <select value={genderChosen} onChange={e => handleSelectionGender(e.target.value)}>
                        {[...new Set(allElderlys.map(option => option.gender))].map(gender => (
                        <option key={gender} value={gender}>
                            {gender}
                        </option>
                        ))}
                        <option>{"All"}</option>
                    </select>
                </div>
                {/* <div style={{backgroundColor: '#f9f9f9', fontWeight: 'bold', textAlign: 'center'}}>Age: 
                    <select value={ageChosen} onChange={e => handleSelectionAge(e.target.value)}>
                        {[...new Set(allElderlys.map(option => option.birthYear))].map(age => (
                        <option key={age} value={age}>
                            {age}
                        </option>
                        ))}
                        <option>{"All"}</option>
                    </select>
                </div> */}
            </div>
        </div>
    );
}

export default DemographicPage;