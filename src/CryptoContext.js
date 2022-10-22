import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { CoinList } from './config/api';
import { auth } from './firebase';
import { db } from './firebase';


const Crypto = createContext()
const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("USD") ; 
  const [symbol, setSymbol] = useState("$")  ;
  const [coins, setCoins] = useState([]);
 const [loading, setLoading] = useState(false);
 const [user, setUser] = useState(null);
 const [alert,setAlert] = useState({
  open: false,
  message: "",
  type: "success"
 })
 const [portfolio, setPortfolio] = useState([])
 console.log(portfolio);
 useEffect(()=>{
  if(user){
    const coinRef = doc(db,"portfolio",user.uid );

   var unsubscribe = onSnapshot(coinRef, coin => {
      if(coin.exists()){
        setPortfolio(coin.data().coins)
      }else{
        console.log("No Item in Portfolio")
      }
    })
  return ()=> {
    unsubscribe();
  }
  }
  
 },[user]);

  useEffect(()=>{
    onAuthStateChanged(auth, user =>{
      if(user) setUser(user);
      else  setUser(null);
    })
  },[])
  
  const fetchCoins = async () => {
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false)
  };

  useEffect(()=>{
    if(currency === "USD") setSymbol("$");
    else if (currency === "GHS") setSymbol("GHS");
    else if (currency === "EUR") setSymbol("€");
  }, [currency])

  return <Crypto.Provider value={{currency,
    symbol, setCurrency,
     coins,loading,fetchCoins,
     alert,setAlert,user,portfolio}}>{children}</Crypto.Provider>
  
}

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
}
