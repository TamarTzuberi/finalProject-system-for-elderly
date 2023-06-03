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
    const [economyChosen, setEconomy] = useState("");
    // const [ageChosen, setAge] = useState("");
    const [cityData, setCityData] = useState("");
    const [genderData, setGenderData] = useState("");
    const [economyData, setEconomyData] = useState("");
    // const [ageData, setAgeData] = useState("");
    // const [showCity, setShowCity] = useState(false);
    const [isDemographicSubmitted, setIsDemographicSubmitted] = useState(false);
    const [isElderlySubmitted, setIsElderlySubmitted] = useState(false);        
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

      useEffect(() => {
        handleEconomy();
      }, [economyChosen]);

    //   useEffect(() => {
    //     handleAge();
    //   }, [ageChosen]);

    useEffect(() => {
        getAllCities();
      }, []);

      useEffect(() => {
        getAllGenders();
      }, []);

      useEffect(() => {
        getAllEconomy();
      }, []);
    
      const getAllElderlys = async () => {
        await axios
          .get(`http://localhost:3000/elderly/allElderlyUsers`)
          .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            const filteredElderlys = responseAllElderlys.data.filter(
              elderly => Object.values(elderly).every(value => value !== null)
            );
            setAllElderlysData(filteredElderlys);
            const allElderlysIds = filteredElderlys.map(e => e.elderlyNum);
            return allElderlysIds;
          })
          .catch(error => {
            console.log(error);
          });
      };

    const getAllCities = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            const allCities = responseAllElderlys.data.map((e) => e.city).filter((city) => city !== null);        
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
            const allGenders = responseAllElderlys.data.map((e) => e.gender).filter((gender) => gender !== null);            
            setGender(responseAllElderlys.data[0].gender)
            console.log("ALLGENDER ", allGenders)
            // console.log("ALLGENDER2 ", responseAllElderlys.data[0])

            return allGenders;
        })
        .catch(error => {
            console.log(error);
        });

    }

    const getAllEconomy = async () =>
    {
        await axios.get(`http://localhost:3000/elderly/allElderlyUsers`)
        .then(responseAllElderlys => {
            console.log("ALL ELDERLYS -", responseAllElderlys.data);
            const allEconomy = responseAllElderlys.data.map((e) => e.economy).filter((economy) => economy !== null);        
            setEconomy(responseAllElderlys.data[0].economy)
            return allEconomy;
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

    const handleEconomy = async () =>
    {
            console.log("STAV ECONOMY CHOSEN in handle economy -", economyChosen);

            setEconomyData(economyChosen);
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

    const handleSelectionEconomy = (economy) =>
    {
        clearObjectiveData();
        clearSubjectiveData();
        setEconomy(economy);
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
        const allFeaturesFromDB = {steps: [] ,activeMinutes: [], hr: [], loneliness: [],depression: [], physicalCondition: [], sleeping: [] }
        const city = cityChosen;
        const gender = genderChosen;
        const economy = economyChosen;
        const startDate = new Date(start);
        const endDate = new Date(end);
        console.log("startDate: ", startDate)
        console.log("endDate: ", endDate)


    await axios.get(`http://localhost:3000/researcher/features/${"Steps"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseSteps => {
        console.log("STEPS -",responseSteps);
        allFeaturesFromDB.steps = responseSteps.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"ActiveMinutes"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseActiveMinutes => {
        console.log("ACTIVE MINUTES -",responseActiveMinutes);
        allFeaturesFromDB.activeMinutes = responseActiveMinutes.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"HR"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseHr => {
        console.log("HR -",responseHr);
        allFeaturesFromDB.hr = responseHr.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"Loneliness"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseLonliness => {
        console.log("LONLINESS -",responseLonliness);
        allFeaturesFromDB.loneliness = responseLonliness.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"Depression"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseDepression => {
        console.log("DEPRESSION -",responseDepression);
        allFeaturesFromDB.depression = responseDepression.data;
    })
    await axios.get(`http://localhost:3000/researcher/features/${"PhysicalCondition"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responsePhysicalCondition => {
        console.log("PHYSICAL CONDITION -",responsePhysicalCondition);
        allFeaturesFromDB.physicalCondition = responsePhysicalCondition.data;

    })
    await axios.get(`http://localhost:3000/researcher/features/${"Sleeping"}/${city}/${gender}/${economy}/${startDate}/${endDate}`)
    .then(responseSleeping => {
        console.log("SLEEPING -",responseSleeping);
        allFeaturesFromDB.sleeping = responseSleeping.data;

    })
    .catch(error => {
        console.log(error);
    });
    setAllFeatures(allFeaturesFromDB);
    console.log("allFeaturesFromDB: ", allFeaturesFromDB)
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
        console.log("MIN DATE: ", minD.toISOString())
        return minD.toISOString();

    }

    const maxDate = async () => {
        const arrOfMaxDates = [];
        for (const key in allFeatures) {
            console.log("key= ", key)
            const arr = allFeatures[key];
            console.log("ARR= ", arr)
            if (Array.isArray(arr) && arr.length > 0) {
                const a = arr.map(item => new Date(item.date));
                const max = new Date(Math.max(...a));
                arrOfMaxDates.push(max);
            }
        }
        const maxD = new Date(Math.max(...arrOfMaxDates));
        console.log("max DATE: ", maxD.toISOString())
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
        for (let d = startDate; d.getTime() <= endDate.getTime(); d.setDate(d.getDate() + 1)) {
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
        setMaxSubjective(5);
        setShowBarSubjective(true);
    }

    const showLoneliness = async () => {
        extract(allFeatures.loneliness, "sub")
        setLabelSubjective('Lonliness Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(5);
        setShowBarSubjective(true);        
    }

    const showPhysicalCondition = async () => {
        extract(allFeatures.physicalCondition, "sub")
        setLabelSubjective('Physical Condition Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(5);
        setShowBarSubjective(true);
    }

    const showSleeping = async () => {
        extract(allFeatures.sleeping, "sub")
        setLabelSubjective('Sleeping Rate');
        setShowLegendSubjective(true);
        setMinSubjective(0);
        setMaxSubjective(5);
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
        const timestampArr = dataDateArr.map(item => new Date(item.date).getTime());

        console.log("dataDateArr: ", dataDateArr)
        // console.log("DATES IN EXTRACT: ", dataDateArr);
        let dataArr = []
        let dateArr = []
        // let pointsStyleArr = []
        // let pointsRadiusArr = []
        console.log("DATES IN EXTRACT: - datesArray ", datesArray);

        for (let key1 in datesArray) {
            // console.log("1: ", key1);
            // console.log("date n.1: ", datesArray[key1]);
            dateArr.push(stringToDate(datesArray[key1]))
            // let date = new Date(datesArray[key1].date).getTime();
            // if (!dataDateArr.includes(date)){
            //     dataArr.push(0)
            // }
        }
        // for (let key in dataDateArr) {
        //     console.log("key: ", key)
        //     let dataVal = dataDateArr[key].value;
        //     console.log("dataVal: ", dataVal)
        //     let date = new Date(dataDateArr[key].date).getTime();
        //     console.log("DATE:",date)
        //     console.log("datesArray:",datesArray)
        //     if (datesArray.includes(date)){
        //         dataArr.push(dataVal)
        //         // dateArr.push(stringToDate(date))
        //     }
        //     else{
        //         dataArr.push(0)
        //         // dateArr.push(stringToDate(date))
        //     }
        // }

        console.log("dataDateArr: ",dataDateArr)

        for (let key in datesArray) {
            let date = datesArray[key];
            console.log("date: ",date)
            let dataIndex = timestampArr.findIndex(item => item === date);
            console.log("dataIndex: ",dataIndex)

            if (dataIndex !== -1) {
              let dataVal = dataDateArr[dataIndex].value;
              dataArr.push(dataVal);
            } else {
              dataArr.push(0);
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
            // setPointsStyle(pointsStyleArr)
            // setPointsRadius(pointsRadiusArr)
        }

    }

    const downloadToCsv = async () => {
        const cityName = cityChosen;
        const gender = genderChosen;
        const economy = economyChosen;
        let rows = [];
        rows.push(['Date', 'Average Steps', 'Average Heart_Rate', 'Average Active_Minutes', 'Average Depression', 'Average Loneliness', 'Average Physical Condition', 'Average Sleeping'])
        
        for (let day = 0; day < datesArray.length; day++) {
            let timestamp = datesArray[day];
            let date = new Date(timestamp).toISOString().slice(0, 10); // Convert timestamp to ISO string and extract yyyy-mm-dd            
            let stepItem = allFeatures.steps.find(item => item.date === date);
            let step = stepItem ? stepItem.value : "no data";
            let hrItem = allFeatures.hr.find(item => item.date === date);
            let hr = hrItem ? hrItem.value : "no data";
            let amItem = allFeatures.activeMinutes.find(item => item.date === date);
            let am = amItem ? amItem.value : "no data";
            let depressionItem = allFeatures.depression.find(item => item.date === date);
            let dep = depressionItem ? depressionItem.value : "no data";
            let lonlinessItem = allFeatures.loneliness.find(item => item.date === date);
            let lonliness = lonlinessItem ? lonlinessItem.value : "no data";
            let physicalItem = allFeatures.physicalCondition.find(item => item.date === date);
            let physicalCond = physicalItem ? physicalItem.value : "no data";
            let sleepingItem = allFeatures.sleeping.find(item => item.date === date);
            let sleeping = sleepingItem ? sleepingItem.value : "no data";
            rows.push([date, step + '', hr + '', am + '', dep + '', lonliness + '', physicalCond + '', sleeping + '']);

        }

        const csv = Papa.unparse(rows);
        const csvData = encodeURI(csv);
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + csvData;
        link.download = `summary of city ${cityName}, gender ${gender}, economy ${economy}.csv`;
        document.body.appendChild(link);
        link.click();
    }

    const downloadElderliesData = async () => {
        let rows = [];
        rows.push(['Elderly Num', 'Birth Year', 'City', 'Gender', 'Economy'])

        await axios
          .get(`http://localhost:3000/elderly/allElderlyUsers`)
          .then(responseAllElderlys => {
            const elderlyUsers = responseAllElderlys.data;

            for (const elderly of elderlyUsers) {
                const elderlyNum = elderly.elderlyNum || "no data";
                const birthYear = elderly.birthYear || "no data";
                const city = elderly.city || "no data";
                const gender = elderly.gender || "no data";
                const economy = elderly.economy || "no data";
            
            // Filter out the rows with null values in any field
            if (birthYear !== "no data" && city !== "no data" && gender !== "no data" && economy !== "no data") {
                rows.push([elderlyNum, birthYear, city, gender, economy]);}            
            }

            const csv = Papa.unparse(rows);
            const csvData = encodeURI(csv);
            const link = document.createElement('a');
            link.href = 'data:text/csv;charset=utf-8,' + csvData;
            link.download = `Elderlies data.csv`;
            document.body.appendChild(link);
            link.click();

          })
          .catch(error => {
            console.log(error);
          });
    }

    const handleButtonClick = () => {
        setIsDemographicSubmitted(true);
        setIsElderlySubmitted(false);
    };

    if (isDemographicSubmitted) {
        return <Redirect to="/ResearcherPage" />;
    }

    const handleInsertButtonClick = () => {
        setIsElderlySubmitted(true);
        setIsDemographicSubmitted(false);

    }

    if (isElderlySubmitted) {
        return <Redirect to="/InsertElderly" />;
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
        <button
            className="sb-btn"
            onClick={() => showSleeping()}>
            Sleeping
        </button>
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
            <br></br>
            <br></br>
            <button
                className="sb-btn"
                onClick={() => downloadToCsv()}>
                Download to CSV
            </button>
            <button
            className="sb-btn-1"
            onClick={() => downloadElderliesData()}>
            Download Elderlies Data to CSV
        </button>
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
                            <li onClick={handleInsertButtonClick}>Insert elderly</li>
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
                <div style={{backgroundColor: '#f9f9f9', fontWeight: 'bold', textAlign: 'center'}}>Economy: 
                    <select value={economyChosen} onChange={e => handleSelectionEconomy(e.target.value)}>
                        {[...new Set(allElderlys.map(option => option.economy))].map(economy => (
                        <option key={economy} value={economy}>
                            {economy}
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
