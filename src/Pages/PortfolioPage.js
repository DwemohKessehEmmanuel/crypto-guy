import { makeStyles } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles((theme)=>({
container:{
  display:"flex",
  backgroundColor: "initial",
  borderRadius: 10,
  flexDirection:"column",
  alignItems: "center",
  gap: 5,
  overflow:"scroll",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      
    }
},
sidebar:{
  width: "20%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 2,
    borderRight: "2px solid black",
}
}))

const PortfolioPage = () => {

  const {portfolio, coins} = CryptoState()

  const classes = useStyles()
  return (

    <div className={classes.container}>
      <div>
              <h2>Sign for a free User Account</h2>
              
            </div>
      <div className={classes.sidebar}>
        {coins.map((coin) =>{
          if (portfolio.includes(coin.id))
          return (
            
            <div className={classes.coin}>
              <span><li>{coin.name}</li></span>
            </div>
            
          )
        })}
       
      </div>
        {/* pieChart area */}
        
    </div>
  )
}

export default PortfolioPage
