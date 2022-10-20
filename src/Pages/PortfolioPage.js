//import { makeStyles } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext'
import { makeStyles, Table, TableCell, TableContainer,TableHead, TableRow, 
   Typography } from '@material-ui/core';

// const useStyles = makeStyles((theme)=>({
// container:{
//   display:"flex",
//   backgroundColor: "initial",
//   borderRadius: 10,
//   flexDirection:"column",
//   alignItems: "center",
//   gap: 5,
//   overflow:"scroll",
//     [theme.breakpoints.down("md")]: {
//       flexDirection: "column",
//       alignItems: "center",
      
//     }
// },
// sidebar:{
//   width: "20%",
//     [theme.breakpoints.down("md")]: {
//       width: "100%",
      
//     },
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: 2,
//     borderRight: "2px solid black",
// }
// }))

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    paddingBottom: 20,
    margin: 10,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center", 
    },
  },
  sidebar:{
      width: "55%",
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
}))    

const PortfolioPage = () => {

  const {portfolio, coins} = CryptoState()
  console.log(coins);
  const classes = useStyles()
  return (
<div className={classes.container}>
      <div className={classes.sidebar}>
      <Typography variant="h4" 
         style={{margin:18, fontFamily: "Montserrat"}}>
           Your Assets
       </Typography>
       <TableContainer style={{marginRight: 5}}>
         
          <Table >
                 <TableHead style={{backgroundColor: "#EEBC1D"}}>
                   <TableRow>
                     {["Coin", "Price", "+/- 1 hour", "+/- 24 hours", "+/- 1 month"].map((head)=>(
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

                 {/* <TableBody>
                   {dataArray
                     .map(row=>{
                        console.log(row);
                       const twtyfourhprofit = row.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()] > 0;
                       const onehprofit = row.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()] > 0;
                       const thtydprofit = row.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()] > 0;
                      console.log(row);
                       return(
                           <TableRow 
                           className={classes.row}
                           key={row.name}>
                               <TableCell component='th' 
                               scope="row"
                               style={{display: "flex",
                               gap:15,
                               }}
                               >
                                   <img
                                   src={row?.image.thumb}
                                   alt={row.name}
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
                                       {row.symbol}
                                   </span>
                                   <span style={{color: "#e4451df3"}}>{row.name}</span>
                               </div>
                               </TableCell>
                               <TableCell align="right" >
                                   {symbol}{" "}
                                   {numberWithCommas(row.market_data.current_price[currency.toLowerCase()].toFixed(2))}
                                                                   
                                </TableCell> 
                               <TableCell align="right"
                                   style={{color:onehprofit > 0? "rgb(14,203,129" : "red",
                                   fontweight: 500,}}
                                   >
                                   {onehprofit && '+'}{row.market_data.price_change_percentage_1h_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                                   
                                </TableCell>
                           
                                <TableCell align="right"
                                   style={{color:twtyfourhprofit > 0? "rgb(14,203,129" : "red",
                                   fontweight: 500,}}
                                   >
                                   {twtyfourhprofit && '+'}{row.market_data.price_change_percentage_24h_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                                   
                                </TableCell> 
                                <TableCell align="right"
                                   style={{color:thtydprofit > 0? "rgb(14,203,129" : "red",
                                   fontweight: 500,}}
                                   >
                                   {thtydprofit && '+'}{row.market_data.price_change_percentage_30d_in_currency[currency.toLowerCase()]?.toFixed(2)}%
                                                                   
                                </TableCell> 

                           </TableRow>
                       );
                 })}</TableBody> */}
               </Table>
        
       </TableContainer>
        {/* {coindata?.name}
        {numOfCoins} */}
      </div>
        
      {/* {!coindata ? (
        <div>
          PortfolioPage test
        </div>
      ) : (
        <div>
          PortfolioPage
      {coindata.name}
      {numOfCoins}
        </div>
      )} */}
    </div>
  )
}

export default PortfolioPage
