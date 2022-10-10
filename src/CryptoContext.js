import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
const Crpto = createContext()

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("USD") ; 
  const [symbol, setSymbol] = useState("$")  ;

  useEffect(()=>{
    if(currency === "USD") setSymbol("$");
    else if (currency === "GHS") setSymbol("GH₵");
    else if (currency === "EUR") setSymbol("€");
  }, [currency])

  return <Crpto.Provider value={{currency,symbol, setCurrency}}>{children}</Crpto.Provider>
  
}

export default CryptoContext;

export const CryptoState = () => {
   return useContext(Crpto);
}
