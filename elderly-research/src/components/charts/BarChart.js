import React from "react";

// import { Bar, Bubble, Doughnut, Pie, Line, Scatter } from 'react-chartjs-2';
import { Bar, Line } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
// import Sidebar from "../sidebar/Sidebar";
// import 'elderly-research/src/App.css'
import 'C:\\Users\\Stav\\final project\\finalProject-system-for-elderly\\elderly-research\\src\\App.css';

const BarChart = (props) => {
    console.log("props ", props)
    const backgroundColors = []

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const getBackgroundColors = () => {
        // for (var i=0;i<props.labels.length; i++){

        // }
        backgroundColors.push(getRandomColor());
        return backgroundColors;
    }
    const colorObjective = getRandomColor();
    const colorSubjective = getRandomColor();

    const labels = props.labels.map(a => a.toString())
    let state = {
        labels: labels,
        datasets: [
            {
                label: props.labelObjective,
                fill: false,
                backgroundColor: colorObjective,
                borderColor: 'rgba(0,0,0,0.9)',
                borderWidth: 2,
                data: props.dataObjective,
                yAxisID: 'A',
                pointStyle: 'circle',
                pointRadius: 2
            },
            {
                label: props.labelSubjective,
                fill: false,
                backgroundColor: colorSubjective,
                borderColor: 'rgba(0,0,0,0.9)',
                borderWidth: 2,
                data: props.dataSubjective,
                yAxisID: 'B',
                pointStyle: props.pointsStyle,
                pointRadius: props.pointsRadius

            }
        ]
    }
    console.log("state ", state.labels)
    console.log("dataset ", state.datasets[0].data)
    return (
        <div className="charts">
            <Bar style={{ textAlign: 'center' }}
                data={state}
                options={{
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        // position: 'right'
                    },
                    scales: {
                        A:
                        {
                            type: 'linear',
                            min: props.minObjective,
                            max: props.maxObjective,
                            // ticks: {
                            //     stepSize: 1
                            //     },
                            position: 'left',
                        },
                        B:
                        {
                            type: 'linear',
                            min: props.minSubjective,
                            max: props.maxSubjective,
                            // ticks: {
                            // stepSize: 1
                            // },
                            position: 'right',
                        }

                    }
                }}
            />
            <Line style={{ textAlign: 'center' }}
                data={state}
                options={{
                    plugins:{
                    annotation: {
                        annotations: [{
                         point1: {
                            type: 'point',
                            xValue: 1,
                            yValue: 5,
                            borderColor: 'red',
                            borderWidth: 4,
                            backgroundColor: 'pink'
                          }
                        }
                        ],
                      },
                    },
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        // position: 'right'
                    },
                    scales: {
                        A:
                        {
                            type: 'linear',
                            min: props.minObjective,
                            max: props.maxObjective,
                            // ticks: {

                            //     stepSize: 1
                            //     },
                            position: 'left',
                        },
                        B:
                        {
                            type: 'linear',
                            min: props.minSubjective,
                            max: props.maxSubjective,
                            // ticks: {
                            // stepSize: 1
                            // },
                            position: 'right',
                            grid: {
                                drawOnChartArea: true
                            }
                        }
                    }
                }} />
        </div>
    );

}
export default BarChart;