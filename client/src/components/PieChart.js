import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Title, ArcElement, Legend } from 'chart.js';

ChartJS.register(
    Tooltip, Title, ArcElement, Legend
)

// function get_random_color() {
//   function c() {
//     let hex = Math.floor(Math.random()*256).toString(16);
//     return ("0"+String(hex)).slice(-2); // pad with zero
//   }
//   return "#"+c()+c()+c();
// }

function getRandColor(brightness){

  // Six levels of brightness from 0 to 5, 0 being the darkest
  let rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  let mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
  let mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
  return "rgb(" + mixedrgb.join(",") + ")";
}

const PieChart = (data) => {
  //console.log(data);
  const { names, totals } = data.data;
  let chartColors = [];
  for (let i=0; i < names.length; i++){
    chartColors = [...chartColors, getRandColor(3)];
  }
  console.log(chartColors);
  const piedata = {
    labels: names,
    datasets: [{
      label: 'My First Dataset',
      data: totals,
      backgroundColor: chartColors,
      hoverOffset: 4
    }]
  };
  return (
    <div style={{width: "90%", height: "90%"}}>
      <Pie data={piedata}/>
    </div>
  )
}

export default PieChart;