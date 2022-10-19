import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Banner/Carousel';

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      
    },
  },
  sidebar:{
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid black",
  },
  heading:{
    fontWeight : "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
    
  },
  description:{
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData:{
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    //responsiveness
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
      
    },
    [theme.breakpoints.down("sd")]: {
      flexDirection: "column",
      alignItems: "center",
      
    },
    [theme.breakpoints.down("md")]: {
      alignItems: "start"
      
    },
  },
  portbutton: {
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Cursive",
    cursor: "pointer",
    backgroundColor: "#F9842C",
    color: "white",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "#e4451df3",
      color: "#D3D3D3",
      boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
    },
  }  
}));



const CoinPage = () => {
  let {id} = useParams();
  const [coin, setCoin] = useState();
  const {currency, symbol} = CryptoState();
  const classes = useStyles();
  const navigate = useNavigate();
 
  const fetchSingleCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    //console.log(data);
    setCoin(data);
  };
  //console.log(coin);
  useEffect(()=>{
    fetchSingleCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  
  if(!coin) return <LinearProgress style={{backgroundColor: "#e4451df3"}}/>
  
  return (
    
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{marginBottom: 20}}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{display: "flex"}}>
            <Typography variant="h6" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{
              fontFamily:"Montserrat",}
            }>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h6" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h6" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h6" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          
        </div>
        <Link to={'/portfolio'} className={classes.portbutton} state={coin}>Add to portfolio</Link>
      </div>
      
      
      <CoinInfo coin={coin}/>
    </div>
  ) 
}

export default CoinPage;
