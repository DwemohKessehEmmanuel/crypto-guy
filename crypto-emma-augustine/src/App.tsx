import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import PortfolioPage from "./Pages/PortfolioPage";
import { makeStyles } from '@material-ui/core';
import Login from './AuthRoutes/Login';
import SignUp from './AuthRoutes/SignUp';
import Alert  from './components/Alert';
import ProtectRoute from './components/ProtectRoute';
 


const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"#fce2ce",
      color: "black",
      minHeight:"100vh",
      minWidth: "100%"
    },
  })
);


const App: React.FC = () => {
  // styles object
  const classes = useStyles();
    
  return (
    <BrowserRouter >
      <div className={classes.App}> 
        
                 
        <Routes >
          
          <Route  path="/" element={<ProtectRoute><Header/> <Homepage/></ProtectRoute>} />
          <Route path="/coins/:id" element={<><Header/> <CoinPage/></>} />
          <Route path="/portfolio" element={<><Header/> <PortfolioPage/></>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          
        </Routes>
          
    </div>
        
          
      <Alert></Alert>
    </BrowserRouter>
  );
}

export default App;