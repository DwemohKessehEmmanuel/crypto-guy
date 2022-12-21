import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { Line} from 'react-chartjs-2';
import { CryptoState } from '../CryptoContext';
import { chartData } from '../config/data';
import SelectButton from './SelectButton';


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const useStyles = makeStyles((theme)=>({
  container:{
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
    //marginBottom: -55,
    padding: 20,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
      
    },
  }
}));

interface Props {
  coin: any;
}

const CoinInfo:React.FC<Props> = ({coin}) => {
  const [historicData,setHistoricData] = useState<any>();
  const [days, setDays] = useState(1);
  const {currency} = CryptoState();

  // const fetchHistoricData = async () => {
  //   const {data} = await axios.get(HistoricalChart(coin.id, days, currency))

  //   setHistoricData(data.prices);
  // };

  const options = {
    method: "GET",
    url: `https://crypto-emmaaug-api.up.railway.app/historicchart/${coin.id}/market_chart`,
    params: { vs_currency: currency, days: days },
    headers: {
      accept: "application/json",
    },
  };
  
  
  const fetchHistoricData = async () => {
     const {data} = await axios.request(options);
      setHistoricData(data.prices);
    };
   
  
  useEffect(()=>{
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  const chartTheme = createTheme({
    palette:{
      primary:{
        main: "#e4451df3",
      }
      
    },
    typography:{
      fontFamily: "Montserrat"
    }
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={chartTheme}>
      <div className={classes.container}>
        {
          !historicData?(
            <CircularProgress 
              style={{color: "#e4451df3"}}
              size={250}
              thickness={1}
            />
          ) : (
          <>
            <Line
            data={{
              labels: historicData.map((coin: any) => {
                let date = new Date(coin[0]);
                  let time = date.getHours() > 12
                    ? `${date.getHours() -12}:${date.getMinutes()} PM` : `${date.getHours()}.${date.getMinutes()} AM`;

              return days === 1? time : date.toLocaleDateString();
              }),
              datasets:[{
                data:historicData.map((coin: any)=> coin[1]),
                 label : `Price ( Past ${days} Days) in ${currency}`,
                 borderColor: "#e4451df3",
              }
              ]
          }}
          options = {{
            elements:{ 
            point: {
                radius: 1 
            },
          }}}
            
            
            />
            <div
            style={{
              //display: "flex",
              marginTop: 40,
              //justifyContent: "space-around",
              //width: "100%"
            }}
            >
              {chartData.map((day)=> (
               <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                  >
                    
                    {day.label}
                </SelectButton> 
              ))}
            </div>
          </>
          )}
      </div>
    

    </ThemeProvider>
  )
}

export default CoinInfo
