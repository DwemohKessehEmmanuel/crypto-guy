import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext';
// import {TrendingCoins} from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme)=>({
    carousel:{
        height: "50%",
        display: "flex",
        alignItems: "center"
    },
    carouselItem:{
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white"
    }
}));

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
   const [trending, setTrending] = useState([])
    const classes = useStyles();

    const {currency, symbol} = CryptoState();

    const options = {
        method: 'GET',
        url: 'http://localhost:3002/trendlist',
        params: {
          vs_currency: currency,
          price_change_percentage: '24',
          page: '1',
          sparkline: 'false',
          per_page: '10',
          order: 'geckodesc'
        },
        headers: {
          'X-RapidAPI-Key': '7c5e697bcamsh67b9d2a73035814p146b5fjsn82d8af536696',
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
      };
      
      
      const fetchTrendingCoins = async () => {
       
       const {data} = await axios.request(options);
      
       setTrending(data);
       
      };


    console.log(trending)

    useEffect(()=>{
        fetchTrendingCoins(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);

const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h >= 0;
    return(
        <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom: 10}}
                />
                <span>
                    {coin?.symbol}
                        &nbsp;
                        <span
                        style={{color:profit > 0? "rgb(14,203,129" : "red",
                    fontweight: 500}}
                        >
                            {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                </span>
                <span style={{fontSize: 22, fontWeight: 500}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}

                </span>
        </Link>
    )
}
) 

    const responsive ={
        0:{
            items: 2,
        },
        512:{
            items: 4,
        },
    };

  return <div className={classes.Carousel}>
    <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
    />
    </div>
  
}

export default Carousel
