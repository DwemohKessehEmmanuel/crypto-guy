import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import {TrendingCoins} from '../../config/api';
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
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 5,
        marginleft: 5,
        color: "black",
        width: 100,
        padding: 10,
        borderRadius: 5
    }
}));

export function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

const Carousel = () => {
   const [trending, setTrending] = useState([])
    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
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
                        style={{color:profit > 0? "rgb(14,203,129" : "red",
                    fontweight: 400}}
                        >
                            {profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                </div>
                <div style={{fontSize: 16, fontWeight: 400}}>
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
