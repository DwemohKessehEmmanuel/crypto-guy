import { LinearProgress, Button, Typography, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import {numberWithCommas} from '../components/Banner/Carousel'
import {AiFillDelete} from 'react-icons/ai';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PieChart from '../components/PieChart';

const useStyles = makeStyles((theme)=>({
container:{
  display:"flex",
  paddingBottom: 20,
  margin: 5,
  backgroundColor: "initial",
  // borderRadius: 10,
  flexDirection:"column-reverse",
  alignItems: "center",
  //justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      alignItems: "center",
      
    }
},
sidebar:{
  minWidth: "80%",
  //minHeight: "80vh",
  [theme.breakpoints.down("md")]: {
    width: "100%", 
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  //borderRight: "2px solid black",
},
coin:{
  padding: 5,
  marginBottom: 5,
  borderRadius: 5,
  color: "black",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#e4451df3",
  boxShadow: "0 0 3px black",
},
row:{
  backgroundColor: "fcdbc4",
  cursor: "pointer",
  "&:hover":{
      backgroundColor:"#cac9c9",
  },
  fontFamily: "Montserrat",
  
},
tolChart:{
  display: "flex",
  flexDirection: "row",
  minHeight: "50vh",
  width: "70vw",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    minHeight: "40vh",
  },
  [theme.breakpoints.down(480)]: {
    width: "80vw"
  }
},
chart: {
  height: "100%",
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 0,
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
  [theme.breakpoints.down(750)]: {
    width: "80%",
  },
  [theme.breakpoints.down(600)]: {
    width: "90%",
  },
  [theme.breakpoints.down(480)]: {
    width: "100%",
  },[theme.breakpoints.down(430)]: {
    width: "105%",
  },
  [theme.breakpoints.down(390)]: {
    width: "110%",
  }
},
totalAssets: {
  display: "flex",
  //width: "50%",
  flexDirection: "row",
  padding:18, 
  //fontFamily: "Montserrat", 
  fontSize: 30,
  
},
typo: {
  fontSize: "2.2vw",
  fontFamily: "Montserrat",
  [theme.breakpoints.down("md")]: {
    fontSize: "3vw",
  },
  [theme.breakpoints.down(750)]: {
    fontSize: "4vw",
  },
  [theme.breakpoints.down(480)]: {
    fontSize: "4.5vw",
  },
  [theme.breakpoints.down(390)]: {
    fontSize: "4.8vw",
  }
}
}))

const PortfolioPage = () => {
  const [prices, setPrices] = useState([]);
  const {portfolio, symbol,setAlert,user,currency, coins, loading,fetchCoins} = CryptoState()
  console.log(portfolio);
  useEffect(()=>{
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[currency]);
  //let pricelist = [...[0], prices];
  let totalAsset = 0;
  let totalsArray = [];
  let coinnames = [];

  // let chartdata = {
  //   totalsArray: totalsArray,
  //   coinnames: coinnames
  // }

  const classes = useStyles();

  const removeFromPortfolio = async(coin) =>{
    const coinRef = doc(db,"portfolio",user.uid );
    try{
      await setDoc(coinRef,
        // {coins:portfolio.splice(portfolio.findIndex(x => x.coindata.symbol === coinId), 1)},
        {coins:portfolio.filter((x) => x.id !== coin.id)},
        {merge:true}
      );
      setAlert({
        open: true,
        message: `${coin.coindata.name} Removed from your portfolio !`,
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

  return (

    <div className={classes.container}>
      <div className={classes.sidebar}>
       <Typography variant="h4" 
         style={{padding:18, fontFamily: "Montserrat"}}>
           Your Assets
       </Typography>
       <TableContainer>
         {
           loading? (
             <LinearProgress style={{backgroundColor: "#e4451df3"}} />
           ) :(
               <Table>
                 <TableHead style={{backgroundColor: "#EEBC1D"}}>
                   <TableRow>
                     {["Coin", "Price", " 1 hr", " 24 hrs", " 1 month", "Number", ""].map((head)=>(
                       <TableCell 
                       style={{color: "black",
                       fontWeight: "700",
                       fontFamily: "Montserrat",
                       }}
                       key={head}
                       align={head === "Coin" ? "" : "right"}
                       >
                       {head}
                       </TableCell> 
                     ))}
                   </TableRow>
                 </TableHead>

                 <TableBody>
                   {portfolio.map((coin, i) =>{
                      totalAsset += coin.coindata.market_data.current_price[currency.toLowerCase()] * Number(coin.numCoins);
                      totalsArray = [...totalsArray, (coin.coindata.market_data.current_price[currency.toLowerCase()] * Number(coin.numCoins))];
                      console.log(totalsArray);
                      coinnames = [...coinnames, (coin.coindata.name)];
                      console.log(coinnames);
                      const twfourprofit = coin.coindata.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()] > 0;
                      const oneHprofit = coin.coindata.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()] > 0;
                      const oneMprofit = coin.coindata.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()] > 0;
                      // if (portfolio.includes(coin.id))
                        return(
                          <TableRow 
                            className={classes.row}
                            key={coin.coindata.name}
                          >
                            <TableCell 
                              component='th' 
                              scope="row"
                              style={{display: "flex",
                                gap:15,
                              }}
                            >
                              <img
                                src={coin?.coindata.image.small}
                                alt={coin.coindata.name}
                                height="40"
                                style={{marginBottom: 3}}
                              />
                              <div
                                style={{display: "flex",
                                flexDirection: "column",
                                }}
                              >
                                <span
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: 18,
                                  }}
                                >
                                  {coin.coindata.symbol}
                                </span>
                                <span style={{color: "#e4451df3"}}>{coin.coindata.name}</span>
                              </div>
                            </TableCell>
                            <TableCell align="right" >
                              {symbol}{" "}
                              {numberWithCommas(coin.coindata.market_data.current_price[currency.toLowerCase()].toFixed(2))}                                       
                            </TableCell> 
                            <TableCell align="right"
                              style={{color: oneHprofit > 0? "rgb(14,203,129" : "red",
                              fontweight: 500,}}
                            >
                              {oneHprofit && '+'}{coin.coindata.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]?.toFixed(2)}%                                 
                            </TableCell>
                            <TableCell align="right"
                              style={{color: twfourprofit > 0? "rgb(14,203,129" : "red",
                              fontweight: 500,}}
                            >
                              {twfourprofit && '+'}{coin.coindata.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                              
                            </TableCell>
                            <TableCell align="right"
                              style={{color: oneMprofit > 0? "rgb(14,203,129" : "red",
                              fontweight: 500,}}
                            >
                              {oneMprofit && '+'}{coin.coindata.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                              
                            </TableCell>
                            <TableCell align="center" 
                              // style={{display: "flex",
                              // flexDirection: "column",
                              // }}
                            >
                              {Number(coin.numCoins)}
                              {/* {symbol}{" "}{numberWithCommas(coin.coindata.market_data.current_price[currency.toLowerCase()].toFixed(2) * Number(coin.numCoins))} */}
                               
                            </TableCell>
                            {/* <TableCell align="right">
                                                              
                            </TableCell> */}
                            <TableCell align="right">
                              <Button
                                className={classes.portfolioadd}
                                variant='outlined'
                                style={{
                                  height: 40,
                                  width: 20,
                                  fontSize: 12,
                                  color: "white",
                                  backgroundColor: "#dd7171",
                                  
                                }}
                                // value={coin.coindata.symbol}
                                onClick={() => removeFromPortfolio(coin)}
                              >
                                  Remove
                              </Button>                                                              
                            </TableCell>
                              
                          </TableRow>
                        );
                    }
                  )}
                </TableBody>
              </Table>
           )
         }
       </TableContainer>
       
      </div>
      <div className={classes.tolChart}>
        <div className={classes.totalAssets}>
          <Typography 
            className={classes.typo}
            // style={{padding:18, fontFamily: "Montserrat", fontSize: "2.2vw"}}
          >
            Total Assets: 
          </Typography>
          <Typography 
            className={classes.typo}
            // style={{padding:18, fontFamily: "Montserrat", fontSize: "2.2vw"}}
          >
            {symbol}{" "}{numberWithCommas(totalAsset.toFixed(2))}
          </Typography>       
        </div>
        <div className={classes.chart}>
          <PieChart data={{names: coinnames, totals: totalsArray}}/>
        </div>
      </div>
    </div>    
  )
}

export default PortfolioPage
