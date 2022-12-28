import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

interface BarChartProps {
  labels: string[];
  data: number[];
  label: string;
  min: number;
  max: number;
}

const BarChart: React.FC<BarChartProps> = (props) => {
  const backgroundColors: string[] = [];

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getBackgroundColors = () => {
    for (let i = 0; i < props.labels.length; i += 1) {
      backgroundColors.push(getRandomColor());
    }
    return backgroundColors;
  };

  const state = {
    labels: props.labels,
    datasets: [
      {
        label: props.label,
        fill: true,
        backgroundColor: getBackgroundColors(),
        borderColor: 'rgba(0,0,0,0.9)',
        borderWidth: 2,
        data: props.data,
      },
    ],
  };

  const options1 = {
    title: {
      display: true,
      fontSize: 20,
    },
    legend: {
      display: true,
      position: 'right',
    },
    scales: {
      y: {
        min: props.min,
        max: props.max,
        ticks: {
          stepSize: 1
        }
      },
    },
  }

  const option2 = {
    title: {
      display: true,
      fontSize: 20,
    },
    legend: {
      display: true,
      position: 'right',
    },
    scales: {
      y: {
        min: props.min,
        max: props.max,
        ticks: {
          stepSize: 1
        }
      },
    },
  }
  return (
    <div className="charts">
      <Bar
        style={{ textAlign: 'center' }}
        data={state}
        options={options1}
      />
      <Line
        style={{ textAlign: 'center' }}
        data={state}
        options={option2}
      />
    </div>
  );
};

export default BarChart;
