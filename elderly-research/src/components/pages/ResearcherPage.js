// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
// import { Bar, Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { serverURL } from '../../ClientUtils'
import BarChart from '../charts/BarChart';
// import {hasCookie} from '../CookieManager';


function ResearcherPage(props) {
    const [showBar, setShowBar] = useState(false);
    // const [showLine, setShowLine] = useState(false);
    const [data, setData] = useState([]);
    const [label, setLabel] = useState('');
    const [labels, setLabels] = useState([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);

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


    // const setLabelsValue = (array,st) => {
    //     let arr = [];
    //     let s = (start) ? new Date(start) : new Date(st);
    //     for (let index = 0; index < array.length; index++) {
    //         s.setDate(s.getDate() + 1);
    //         arr.push(`${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`);
    //     }
    //     setLabels(arr)
    // }

    // const getFeatures = async () => {
    //     return await axios.get(`${serverURL}/researcher/features/${start}/${end}`);

    // }

    // const setForGragh = async (arr) => {
    //     if (arr.length > 0) {
    //         setData(arr[0]);
    //         setLabelsValue(arr[0], +arr[1]);
    //     } else {
    //         setData(arr);
    //         setLabelsValue(arr);
    //     }

    //     (showBar) ? setShowBar(false) : setShowBar(true);
    // }


    const result1 = {value: 4000, start: 1671919200000}
    const result2 = {value: 3500, start: 1672005600000}
    const result3 = {value: 8000, start: 1672092000000}
    const arr1 = [result1, result2, result3]

    const showSteps = async (e) => {
        // let response = [10, 20, 45, 30, 55, 70, 60]//await getFeatures();
        extract(arr1)
        // let response = await getFeatures();
        // let arr = [];
        // if (response.data.Steps.length > 0) {
        //     arr = extract(response.data.Steps[0].days, response.data.Steps[0].start);
        //     arr = extract(response.data.Steps[0].days, response.data.Steps[0].start);


        // }
        setLabel('Steps');
        setMin(0);
        setMax(10000);
        setShowBar(true);
    }

    const result7 = {value: 85, start: 1671919200000}
    const result8 = {value: 100, start: 1672005600000}
    const result9 = {value: 105, start: 1672092000000}
    const arr3 = [result7, result8, result9]

    const showHR = async () => {
        extract(arr3)
        // let response = await getFeatures();
        // let arr = [];
        // // console.log(response);
        // if (response.data.HR.length > 0) {
        //     arr = extract(response.data.HR[0].days, response.data.HR[0].start);


        // }
        setLabel('HR');
        setMin(0);
        setMax(130);
        // setForGragh(arr);
        setShowBar(true);
    }

    const result10 = {value: 8000, start: 1671919200000}
    const result11 = {value: 6500, start: 1672005600000}
    const result12 = {value: 10000, start: 1672092000000}
    const arr4 = [result10, result11, result12]

    const showDistance = async () => {
        extract(arr4)
        // let response = await getFeatures();
        // let arr = [];
        // if (response.data.Distance.length > 0) {
        //     arr = extract(response.data.Distance[0].days, response.data.Distance[0].start);

        // }
        setLabel('Distance');
        setMin(0);
        setMax(15000);
        // setForGragh(arr);
        setShowBar(true);
    }

    const result13 = {value: 50, start: 1671919200000}
    const result14 = {value: 120, start: 1672005600000}
    const result15 = {value: 80, start: 1672092000000}
    const arr5 = [result13, result14, result15]

    const showAM = async () => {
        extract(arr5)
        // let response = await getFeatures();
        // let arr = [];
        // if (response.data.Active_min.length > 0) {
        //     arr = extract(response.data.Active_min[0].days, response.data.Active_min[0].start);

        // }
        setLabel('Active Minutes');
        setMin(0);
        setMax(300);
        // setForGragh(arr);
        setShowBar(true);
    }


    const result4 = {value: 7, start: 1671919200000}
    const result5 = {value: 4, start: 1672005600000}
    const result6 = {value: 3, start: 1672092000000}
    const arr2 = [result4, result5, result6]

    const showSleep = async () => {
        extract(arr2)
        // let arr ={'days' :[
        //     { 'day1': 3 }, { 'day2': 5 }, { 'day3': 4 }, { 'day4': 6 }, { 'day5': 8 }, { 'day6': 7 }, { 'day7': 4 }, { 'day8': 4 }, { 'day9': 7 }, { 'day10': 5 }, { 'day11': 3 }, { 'day12': 4 }, { 'day13': 5 }, { 'day14': 8 }, { 'day15': 7 }, { 'day16': 3 }, { 'day17': 5 }, { 'day18': 9 }, { 'day19': 4 }, { 'day20': 5 }, { 'day21': 7 }, { 'day22': 6 }, { 'day23': 5 }, { 'day24': 7 }, { 'day25': 4 }, { 'day26': 3 }, { 'day27': 6 }, { 'day28': 8 }, { 'day29': 10 }, { 'day30': 6 }
        // ]}
        // let response = await getFeatures();
        // let arr = [];
        // if (response.data.Sleeping.length > 0) {
        // arr = extract(arr, 1647076066984);

        // }
        setLabel('Hour of Sleeps');
        setMin(0);
        setMax(10);
        // setForGragh(arr);
        setShowBar(true);

    }

    const stringToDate = (date) =>{
        const today = new Date(date);
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const dateString = `${day}/${month + 1}/${year}`;

        return dateString
    } 

    const extract = (arr) => {
        let dataArr = []
        let dateArr = []
        for (let key in arr) {
            dataArr.push(arr[key].value)
            dateArr.push(stringToDate(arr[key].start))
        }
        setData(dataArr)
        setLabels(dateArr)
    }
    // const extract = (days_dict, startPulled) => {
    //     let result = []
    //     if (!start || !end || start < startPulled) {
    //         for (let key in days_dict) {
    //             result.push(Object.values(days_dict[key])[0])
    //         }
    //     }
    //     else {
    //         let arr = [];
    //         let s = new Date(start);
    //         let e = new Date(end);
    //         const numOfDaysGraph = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
    //         if (parseInt(startPulled) === s.getTime()) {
    //             arr = days_dict.slice(0, numOfDaysGraph);
    //         }
    //         let startP = new Date(+startPulled);
    //         const DiffStarts = Math.ceil(Math.abs(s - startP) / (1000 * 60 * 60 * 24));
    //         arr = (numOfDaysGraph + DiffStarts > days_dict.length) ? days_dict.slice(DiffStarts, days_dict.length) : days_dict.slice(DiffStarts, numOfDaysGraph + DiffStarts);
    //         console.log(arr);
    //         for (let key in arr) {
    //             result.push(Object.values(arr[key])[0])
    //         }
    //     }

    //     return [result, startPulled];
    // }

    // const downloadToCsv = async () => {
    //     // setStart(null);
    //     // setEnd(null);
    //     let features = await axios.get(`${serverURL}/researcher/features/${null}/${null}`);
    //     features = features.data;
    //     console.log(features);
    //     let rows = [];
    //     rows.push(['user', 'Steps', 'Calories', 'Speed', 'Distance', 'Active_min'])
    //     for (let day = 0; day < features['Steps'][0].days.length; day++) {
    //         let step = (day < features['Steps'][0].days.length) ? Object.values(features['Steps'][0].days[day])[0] : 0;
    //         let calories = (day < features['Calories'][0].days.length) ? Object.values(features['Calories'][0].days[day])[0] : 0;
    //         let speed = (day < features['Speed'][0].days.length) ? Object.values(features['Speed'][0].days[day])[0] : 0;
    //         let distance = (day < features['Distance'][0].days.length) ? Object.values(features['Distance'][0].days[day])[0] : 0;
    //         let am = (day < features['Active_min'][0].days.length) ? Object.values(features['Active_min'][0].days[day])[0] : 0;
    //         let uid = features['Active_min'][0].googleid;
    //         rows.push([uid, step + '', calories + '', speed + '', distance + '', am + '']);
    //     }


    //     let csvContent = "data:text/csv;charset=utf-8,"
    //         + rows.map(e => e.join(",")).join("\n");


    //     let encodedUri = encodeURI(csvContent);
    //     window.open(encodedUri);

    //     // console.log(hasCookie());
    //     let forms = await axios.get(`${serverURL}/researcher/allDailyForms`);
    //     forms =forms.data;
    //     let rowsDaily = [];
    //     rowsDaily.push(['user', 'happy', 'lonely', 'pain', 'sad', 'sleep', 'Date']);
    //     for (let i = 0; i < forms.length; i++) {
    //         rowsDaily.push([forms[i].googleid,forms[i].answers.happy +'',forms[i].answers.lonely +'',forms[i].answers.pain+'',forms[i].answers.sad+'',forms[i].answers.sleep+'', forms[i].Date]);
    //     }

    //     let csvContentDaily = "data:text/csv;charset=utf-8,"
    //         + rowsDaily.map(e => e.join(",")).join("\n");


    //     let encodedUriDaily = encodeURI(csvContentDaily);
    //     window.open(encodedUriDaily);


    // }

    const content = (
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
                Acive Minutes
            </button>
            <button
                className="sb-btn"
                onClick={() => showDistance()}>
                Distance
            </button>
            <button
                className="sb-btn"
                onClick={() => showSleep()}>
                Hour of Sleeps
            </button>
            {/* <button
                className="sb-btn"
                onClick={() => downloadToCsv()}>
                הורדת קובץ
            </button> */}


        </div>
    );

    return (
        <div className="page">
            <Sidebar history={props.history} content={content} />

            <div style={{ position: 'absolute', top: 20, left: '65%', width: '100px', backgroundColor: 'white' }}>
                <input type='date' className='start' value={start} onChange={e => handleStart(e.target.value)} />
                <input type='date' className='end' value={end} onChange={e => handleEnd(e.target.value)} />
            </div>
            {showBar &&
                <div style={{ position: "absolute", top: '100px', left: '25%', height: '50%', width: '40%', backgroundColor: 'white' }}>

                    <BarChart data={data} label={label} labels={labels} min={min} max={max} />
                </div>
            }

        </div>
    );
}

export default ResearcherPage;
