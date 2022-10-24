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
  // flexDirection:"column",
  // alignItems: "center",
  //justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      
    }
},
sidebar:{
  width: "65%",
  minHeight: "80vh",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid black",
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
// portfolioadd: {
  
// }
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
         style={{margin:18, fontFamily: "Montserrat"}}>
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
                     {["Coin", "Price", "+/- 1 hr", "+/- 24hrs", "+/- 1 month", "Number", ""].map((head)=>(
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
                                gap:10,
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
                            <TableCell align="center" style={{display: "flex",
                              flexDirection: "column",
                              }}
                            >
                              <span>({Number(coin.numCoins)})</span>
                              {symbol}{" "}{numberWithCommas(coin.coindata.market_data.current_price[currency.toLowerCase()].toFixed(2) * Number(coin.numCoins))}
                               
                            </TableCell>
                            {/* <TableCell align="right">
                                                              
                            </TableCell> */}
                            <TableCell align="right">
                              <Button
                                className={classes.portfolioadd}
                                variant='outlined'
                                style={{
                                  height: 40,
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
      <div>
        <div>
          <Typography variant="h4" 
            style={{margin:18, fontFamily: "Montserrat"}}>
            Total Assets: {symbol}{" "}{numberWithCommas(totalAsset.toFixed(2))}
          </Typography>       
        </div>
        <div>
          <PieChart data={{names: coinnames, totals: totalsArray}}/>
        </div>
      </div>
    </div>    
  )
}

export default PortfolioPage
