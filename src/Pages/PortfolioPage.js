import React from 'react'
import { useLocation } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';

const PortfolioPage = () => {
  const location = useLocation();
  let newcoin = location.state;
  const coins = 

  console.log(newcoin);
  return (
    <div>
      PortfolioPage
      {newcoin.name}
    </div>
    
  )
}

export default PortfolioPage