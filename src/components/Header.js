import React from 'react'

import { AppBar, Container, Typography, Toolbar, Select, MenuItem, makeStyles, 
        FormControl, InputLabel, createTheme, ThemeProvider } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "#e4451df3",
    fontFamily: "Cursive",
    fontWeight: "bold",
    cursor: "pointer",
  },
  formControl:{
    minWidth: 110
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
      <AppBar position="static" color="transparent">
        <Container >
          <Toolbar>
            <Typography onClick={()=>navigate("/")} className={classes.title} variant={"h5"}>
              Cryptocurrency Market
            </Typography>
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
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
    
  )
}

export default Header
