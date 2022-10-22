import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from 'chart.js';

ChartJS.register(
    Tooltip, Title, ArcElement, Legend
)

const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
const PieChart = () => {
  return (
    <div style={{width: "90%", height: "90%"}}>
      <Pie data={data}/>
    </div>
  )
}

export default PieChart;