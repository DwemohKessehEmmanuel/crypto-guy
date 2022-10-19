import { Container,createTheme, LinearProgress,
    makeStyles, Table, TableBody, TableCell, TableContainer,TableHead, TableRow, 
    TextField,ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { numberWithCommas } from './Banner/Carousel';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(()=>({
 row:{
   backgroundColor: "fcdbc4",
   cursor: "pointer",
   "&:hover":{
       backgroundColor:"#cac9c9",
   },
   fontFamily: "Montserrat",
   
 },
 pagination: {
   "& .MuiPaginationItem-root": {
     color: "black",
   },
 }
}));


const CoinsTable = () => {
 const [coins, setCoins] = useState([]);
 const [loading, setLoading] = useState(false);
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1);
 const navigate = useNavigate();
 

 const classes = useStyles();


 const {currency,symbol} = CryptoState();

 const fetchCoins = async () => {
   setLoading(true);
   const {data} = await axios.get(CoinList(currency));

   setCoins(data);
   setLoading(false)
 };

 console.log(coins)

 useEffect(()=>{
     fetchCoins()
     // eslint-disable-next-line react-hooks/exhaustive-deps
 },[currency]);


 const CoinTableTheme = createTheme({
   palette:{
     primary:{
       main: "#e4451df3",
     }
     
   },
   typography:{
     fontFamily: "Montserrat"
   }
 });

 //handling input into the search bar on homepage
 const searchHandling = () =>{
   return coins.filter((coin)=> 
     coin.name.toLowerCase().includes(search) ||
     coin.symbol.toLowerCase().includes(search)
   )
 };

 return (
   <ThemeProvider theme={CoinTableTheme}>
     <Container style={{textAlign: "Center"}}>
       <Typography variant="h4" 
         style={{margin:18, fontFamily: "Montserrat"}}>
           Crytocurrency Prices by Market Cap
       </Typography>
       <TextField label="Search for a Crypto Here!" 
         style={{marginBottom:20, width:"100%"}}
         onChange={(e)=>setSearch(e.target.value)}
       >
       </TextField>
       <TableContainer>
         {
           loading? (
             <LinearProgress style={{backgroundColor: "#e4451df3"}} />
           ) :(
               <Table>
                 <TableHead style={{backgroundColor: "#EEBC1D"}}>
                   <TableRow>
                     {["Coin", "Price", "24hr Change", "Market Cap"].map((head)=>(
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
                   {searchHandling()
                     .slice((page -1) * 10, (page - 1) * 10 + 10)
                     .map(row=>{
                       const profit = row.price_change_percentage_24h > 0;

                       return(
                           <TableRow 
                           onClick={() => navigate(`/coins/${row.id}`)}
                           className={classes.row}
                           key={row.name}>
                               <TableCell component='th' 
                               scope="row"
                               style={{display: "flex",
                               gap:15,
                               }}
                               >
                                   <img
                                   src={row?.image}
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
                                   {numberWithCommas(row.current_price.toFixed(2))}
                                                                   
                           </TableCell> 
                           <TableCell align="right"
                                   style={{color:profit > 0? "rgb(14,203,129" : "red",
                                   fontweight: 500,}}
                                   >
                                   {profit && '+'}{row.price_change_percentage_24h?.toFixed(2)}%
                                                                   
                           </TableCell>
                           <TableCell align="right" >
                                   {symbol}{" "}
                                   {numberWithCommas(row.market_cap.toString().slice(0,-6))} M
                                                                   
                           </TableCell>  

                           </TableRow>
                       );
                 })}</TableBody>
               </Table>
           )
         }
       </TableContainer>
       <Pagination 
         count={(searchHandling()?.length / 10).toFixed(0)}
         style={{
           padding: 20,
           width: "100%",
           display: "flex",
           justifyContent: "center",
         }}
         classes={{ ul: classes.pagination }}
         onChange={(_, value) => {
           setPage(value);
           window.scroll(0, 450);
         }}
       />
     </Container>
   </ThemeProvider>
 )
}

export default CoinsTable
