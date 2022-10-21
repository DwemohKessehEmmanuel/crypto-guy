import { LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { CryptoState } from '../CryptoContext'
import {numberWithCommas} from '../components/Banner/Carousel'
import {AiFillDelete} from 'react-icons/ai';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useStyles = makeStyles((theme)=>({
container:{
  display:"flex",
  backgroundColor: "initial",
  borderRadius: 10,
  flexDirection:"row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 5,
  overflowY:"scroll",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      
    }
},
sidebar:{
  width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 1,
    justifyContent: "space-between",
    paddingTop: 40,
    marginTop: 2,
    borderRight: "2px solid black",
},
coin:{
  padding: 10,
  marginBottom: 10,
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
  
}
}))

const PortfolioPage = () => {
  
  const {portfolio, symbol,setAlert,user,currency, coins, loading,fetchCoins} = CryptoState()
  
  useEffect(()=>{
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[currency]);
  
  const classes = useStyles()

  const removeFromPortfolio = async(coin) =>{
    const coinRef = doc(db,"portfolio",user.uid );
    try{
      await setDoc(coinRef,
        {coins:portfolio.filter((coin)=> coin !== coin?.id)},
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

  return (

    <div className={classes.container}>
       <div className={classes.sidebar}>
       <TableContainer>
         {
           loading? (
             <LinearProgress style={{backgroundColor: "#e4451df3"}} />
           ) :(
               <Table>
                 <TableHead style={{backgroundColor: "#EEBC1D"}}>
                   <TableRow>
                     {["Coin", "Price", "+/- 1 hrs", "+/- 24hrs", "+/- 1 month"].map((head)=>(
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
                   {coins.map((coin) =>{
                    const profit = coin.price_change_percentage_24h > 0;
                    if (portfolio.includes(coin.id))
                          return(
                                 <TableRow 
                                  className={classes.row}
                                  key={coin.name}>
                                    <TableCell 
                                        component='th' 
                                        scope="row"
                                        style={{display: "flex",
                                        gap:15,
                                        }}
                                      >
                                          <img
                                          src={coin?.image}
                                          alt={coin.name}
                                          height="50"
                                          style={{marginBottom: 6}}
                                        />
                                      <div
                                        style={{display: "flex",
                                        flexDirection: "column",
                                        }}
                                      >
                                          <span
                                              style={{
                                                  textTransform: "uppercase",
                                                  fontSize: 22,
                                              }}
                                          >
                                              {coin.symbol}
                                          </span>
                                          <span style={{color: "#e4451df3"}}>{coin.name}</span>
                                      </div>
                                    </TableCell>
                                    <TableCell align="right" >
                                          {symbol}{" "}
                                          {numberWithCommas(coin.current_price.toFixed(2))}
                                                                          
                                  </TableCell> 
                                  <TableCell align="right"
                                          style={{color:profit > 0? "rgb(14,203,129" : "red",
                                          fontweight: 500,}}
                                          >
                                          {profit && '+'}{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                                                                          
                                  </TableCell>
                                  <TableCell align="right"
                                          style={{color:profit > 0? "rgb(14,203,129" : "red",
                                          fontweight: 500,}}
                                          >
                                          {profit && '+'}{coin.price_change_percentage_24h?.toFixed(2)}%
                                                                          
                                  </TableCell>
                                  <TableCell align="right"
                                          style={{color:profit > 0? "rgb(14,203,129" : "red",
                                          fontweight: 500,}}
                                          >
                                          {profit && '+'}{coin.price_change_percentage_30d_in_currency?.toFixed(2)}%
                                                                          
                                  </TableCell>
                                   

                                  </TableRow>
                              );
                   }
                     
                       

                       
                 )}</TableBody>
               </Table>
           )
         }
       </TableContainer>
       
      </div>
        {/* pieChart area */}
        
    </div>
  )
}

export default PortfolioPage
