import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { auth } from './firebase';
import { db } from './firebase';


const Crypto = createContext<any>("");

interface Props {
  children: React.ReactNode;
}
const CryptoContext: React.FC<Props> = ({children}) => {

  const [currency, setCurrency] = useState<string>("USD") ; 
  const [symbol, setSymbol] = useState<string>("$")  ;
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
 const [alert,setAlert] = useState({
  open: false,
  message: "",
  type: "success"
 })
 const [portfolio, setPortfolio] = useState([])
 

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
  
 
  const option = {
    method: "GET",
    url: "https://crypto-emmaaug-api.up.railway.app/allcoin",
    params: {
      vs_currency: currency,
      page: "1",
      per_page: "100",
      order: "market_cap_desc",
    },
    headers: {
      accept: "application/json",
    },
  };
  
  
  const fetchCoins = async () => {
   setLoading(true);
   const {data} = await axios.request(option);
  
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
