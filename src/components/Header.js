import React from 'react'

import { AppBar, Container, Typography, Toolbar, Select, MenuItem, makeStyles, 
        FormControl, InputLabel, createTheme, ThemeProvider } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import {  useNavigate} from 'react-router-dom';
import UserSideBar from './UserSideBar';



const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "#e4451df3",
    fontFamily: "Cursive",
    fontWeight: "bold",
    cursor: "pointer",
  },
  formControl:{
    minWidth: 110,
    paddingRight: 50,
  },
  bar:{
    padding: 10
  },
  logout: {
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    borderRadius: 5,
    padding: 5,
    
    // paddingLeft: 20,
    // paddingRight: 20,
    fontFamily: "Cursive",
    cursor: "pointer",
    backgroundColor: "#F9842C",
    color: "white",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "#e4451df3",
      color: "#D3D3D3",
      boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
    },
  }  
}))

  
const Header = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const {currency, setCurrency} = CryptoState();

  // console.log(currency);

  const headerTheme = createTheme({
    palette:{
      primary:{
        main: "#e4451df3",
      }
      
    },
    typography:{
      fontFamily: "Montserrat"
    }
  });
  
  
  return (
    <ThemeProvider theme={headerTheme}>
      <AppBar position="static" color="transparent" className={classes.bar}>
        <Container >
          <Toolbar>
                    
            <div className={classes.title}>
              <Typography onClick={()=>navigate("/")} variant={"h5"} style={{marginRight: 20}}>
                Cryptocurrency Market
              </Typography>
              
            </div>
            <div>
              
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>Currency</InputLabel>
              <Select label="Currency" 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"GHS"}>GHS</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
              </Select>
              
            </FormControl>
            
            
            
            
            </div>
            <UserSideBar></UserSideBar>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
    
  )
}

export default Header
