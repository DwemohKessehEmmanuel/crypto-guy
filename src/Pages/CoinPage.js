import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Button, LinearProgress, makeStyles, Typography, TextField } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Banner/Carousel';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import dateFormat, { masks } from "dateformat";



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
    padding: 10,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData:{
    alignSelf: "start",
    padding: 10,
    paddingTop: 5,
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
  portfolioadd:{
    alignSelf: "start",
    padding: 20,
    fontFamily: "Cursive",
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    //paddingTop: 10,
    width: "65%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9842C",
    color: "white",
    fontWeight: 700,
    fontSize: 14,
    //responsiveness
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start"
      
    },
  },
  
}));



const CoinPage = () => {
  let {id} = useParams();
  const [coin, setCoin] = useState();
  const [numCoins, setNumCoins] = useState(1);
  const {currency, symbol, user, portfolio, setAlert} = CryptoState();
  const classes = useStyles();
  // const navigate = useNavigate();

  
 
  const fetchSingleCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };
  console.log(coin);
  console.log(numCoins);

  useEffect(()=>{
    fetchSingleCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  //const inPortfolio = portfolio.includes(coin?.id);
  const inPortfolio = portfolio.find(eachob => eachob.id === coin?.id);

  const addToPortfolio = async()=> {
    const coinRef = doc(db,"portfolio",user.uid );
    try{
      await setDoc(coinRef,
        {coins:portfolio?[...portfolio,{
          id: coin?.id,
          coindata: {
            market_data: coin?.market_data,
            name: coin?.name,
            image: coin?.image,
            symbol: coin?.symbol
          },
          numCoins: numCoins
        }]:[coin?.id]}
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to our portfolio !`,
        type: "success",
      })
    }catch(error){
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  }

  const removeFromPortfolio = async() =>{
    const coinRef = doc(db,"portfolio",user.uid );
    try{
      await setDoc(coinRef,
        {coins:portfolio.filter((cryptos)=> cryptos.id !== coin?.id)},
        {merge:true}
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from your portfolio !`,
        type: "success",
      })
    }catch(error){
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      })
    }
  }
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
        <div className={classes.marketData}>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Total Supply:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.total_supply
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Circulating Supply:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.circulating_supply
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Last Updated:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>
              {dateFormat(new Date(coin?.last_updated), "dddd, mmmm dS, yyyy, h:MM:ss TT")}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              24hour Volume:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
        </div>
        <div 
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <TextField id="outlined-basic" label="Number of coins" variant="outlined" onChange={e => setNumCoins(e.target.value)}/>
        </div>

        <div >
        {user && (
            <Button
            className={classes.portfolioadd}
            variant='outlined'
            style={{
              height: 40,
              color: inPortfolio?"white" : "black",
              backgroundColor: inPortfolio? "#dd7171": "#EEBC1D",
            }}
            onClick={inPortfolio? removeFromPortfolio: addToPortfolio}
            >
              {inPortfolio? "Remove from portfolio" : "Add to Portfolio"}
            </Button>
          )}
        </div>
        </div>
        
      </div>
      
      
      
      <CoinInfo coin={coin}/>
    </div>
  ) 
}

export default CoinPage;
