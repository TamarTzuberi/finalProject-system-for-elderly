import React from "react";

import { Bar, Line } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import '../../../src/App.css'


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
                pointRadius: 2,
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
                pointRadius: props.pointsRadius,

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
                    scales: {
                        A:
                        {
                            type: 'linear',
                            min: props.minObjective,
                            max: props.maxObjective,
                            position: 'left',
                        },
                        B:
                        {
                            type: 'linear',
                            min: props.minSubjective,
                            max: props.maxSubjective,
                            position: 'right',
                        }

                    }
                }}
            />
            <Line style={{ textAlign: 'center' }}
                data={state}
                options={{
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                    },
                    scales: {
                        A:
                        {
                            type: 'linear',
                            min: props.minObjective,
                            max: props.maxObjective,
                            position: 'left',
                        },
                        B:
                        {
                            type: 'linear',
                            min: props.minSubjective,
                            max: props.maxSubjective,
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