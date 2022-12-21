import { LinearProgress, Button, Typography, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import {numberWithCommas} from '../components/Banner/Carousel';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import PieChart from '../components/PieChart';

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    paddingBottom: 20,
    minHeight: 'auto',
    margin: 5,
    backgroundColor: "initial",
    // borderRadius: 10,
    flexDirection:"row",
    // alignItems: "center",
    // justifyContent: "center",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column-reverse",
        alignItems: "center",
        width: "90%",
        justifyContent: "center",
        margin: "auto",
      }
  },
  sidebar:{
    minWidth: "65%",
    minHeight: "30vh",
    [theme.breakpoints.down("md")]: {
      width: "100%", 
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 25,
    marginRight: 5,
    //borderRight: "2px solid black",
    //borderBottom: "2px solid gray",
    //overflowY: "auto",
  },
  table: {
    borderBottom: "2px solid gray",
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
    flexDirection: "column",
    minHeight: "70vh",
    width: "35%",
    alignItems: "center",
    justifyContent: "top",
    //boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    [theme.breakpoints.down("md")]: {
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      flexDirection: "column",
      minHeight: "40vh",
      width: "80%",
    },
    [theme.breakpoints.down(480)]: {
      width: "80vw"
    }
  },
  chart: {
    minHeight: "80%",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("md")]: {
      width: "60%",
      boxShadow: "none",
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
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding:18, 
    marginTop: 0,
    //fontFamily: "Montserrat", 
    fontSize: 30,
    //background: "gray",
    color: "#0a2351",
    [theme.breakpoints.down("md")]: {
      boxShadow: "none",
      flexDirection: "row",
    },
  },
  typo: {
    fontSize: "1vw",
    fontWeight: 600,
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
  },
  typo1: {
    fontSize: "2.2vw",
    fontWeight: 600,
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
  },
  assetname: {
    padding:18, 
    fontFamily: "Montserrat",
    fontWeight: "bold",
    color: "#0a2351",
  }

}))

const PortfolioPage:React.FC = () => {
  const {portfolio, symbol,setAlert,user,currency, loading,fetchCoins} = CryptoState()
  console.log(portfolio);
  useEffect(()=>{
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[currency]);
  //let pricelist = [...[0], prices];
  let totalAsset: number = 0;
  let totalsArray: number[] = [];
  let coinnames: string[] = [];

  // let chartdata = {
  //   totalsArray: totalsArray,
  //   coinnames: coinnames
  // }

  const classes = useStyles();

  const removeFromPortfolio = async(coin: any) =>{
    const coinRef = doc(db,"portfolio",user.uid );
    try{
      await setDoc(coinRef,
        // {coins:portfolio.splice(portfolio.findIndex(x => x.coindata.symbol === coinId), 1)},
        {coins:portfolio.filter((x: any) => x.id !== coin.id)},
        {merge:true}
      );
      setAlert({
        open: true,
        message: `${coin.coindata.name} Removed from your portfolio !`,
        type: "success",
      })
    }catch(error: any){
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
       <Typography variant="h4" className={classes.assetname}
        //  style={{padding:18, fontFamily: "Montserrat"}}
        >
           Your Assets
       </Typography>
       <TableContainer className={classes.table}>
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
                       align={head === "Coin" ? "left" : "right"}
                       >
                       {head}
                       </TableCell> 
                     ))}
                   </TableRow>
                 </TableHead>

                 <TableBody>
                   {portfolio.map((coin: any, i: number) =>{
                      totalAsset += coin.coindata.market_data.current_price[currency.toLowerCase()] * Number(coin.numCoins);
                      totalsArray = [...totalsArray, (coin.coindata.market_data.current_price[currency.toLowerCase()] * Number(coin.numCoins))];
                      console.log(totalsArray);
                      coinnames = [...coinnames, (coin.coindata.name)];
                      console.log(coinnames);
                      const twfourprofit = coin.coindata.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()] > 0;
                      const twfour = coin.coindata.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()];
                      const oneHprofit = coin.coindata.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()] > 0;
                      const oneH = coin.coindata.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()];
                      const oneMprofit = coin.coindata.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()] > 0;
                      const oneM = coin.coindata.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()];
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
                              style={{color: oneH > 0 ? "rgb(14,203,129" : "red"}}
                            >
                              {oneHprofit && '+'}{coin.coindata.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]?.toFixed(2)}%                                 
                            </TableCell>
                            <TableCell align="right"
                              style={{color: twfour > 0 ? "rgb(14,203,129" : "red"}}
                            >
                              {twfourprofit && '+'}{coin.coindata.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                              
                            </TableCell>
                            <TableCell align="right"
                              style={{color: oneM > 0? "rgb(14,203,129" : "red"}}
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
            className={classes.typo1}
            // style={{padding:18, fontFamily: "Montserrat", fontSize: "2.2vw"}}
          >
            {symbol}{" "}{numberWithCommas(Number(totalAsset.toFixed(2)))}
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
