import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import PortfolioPage from "./Pages/PortfolioPage";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(()=>({
    App:{
      backgroundColor:"white",
      color: "black",
      minHeight:"100vh"
    },
  })
);


function App() {
  // styles object
  const classes = useStyles();
    
  return (
    <BrowserRouter >
      <div className={classes.App}> 
        <Header/>
        <Routes >
          <Route  path="/" element={<Homepage/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>} />
          <Route path="/portfolio" element={<PortfolioPage/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;