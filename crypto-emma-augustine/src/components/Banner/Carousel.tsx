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
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
        
    },
    cointiles: {
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 5,
        marginleft: 5,
        color: "white",
        width: 100,
        padding: 10,
        borderRadius: 5
    }
}));

export function numberWithCommas(x: number){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel: React.FC = () => {
   const [trending, setTrending] = useState<any[]>([]);
    const classes = useStyles();

    const {currency, symbol} = CryptoState();

    const options = {
      method: "GET",
      url: "https://crypto-emmaaug-api.up.railway.app/trendlist",
      params: {
        vs_currency: currency,
        price_change_percentage: "24",
        page: "1",
        sparkline: "false",
        per_page: "15",
        order: "geckodesc",
      },
      headers: {
        accept: "application/json",
      },
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
                <div className={classes.cointiles}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="60"
                    style={{marginBottom: 10}}
                />
                <div>
                    {coin?.symbol}
                        &nbsp;
                        <span
                        style={{color: coin.price_change_percentage_24h > 0? "rgb(14,203,129" : "red"}}
                        >
                            {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                </div>
                <div style={{fontSize: 22, fontWeight: 500}}>
                    {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}

                </div>
            </div>    
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

  return <div className={classes.carousel}>
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
