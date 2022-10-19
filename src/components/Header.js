import React from 'react'

import { AppBar, Container, Typography, Toolbar, Select, MenuItem, makeStyles, 
        FormControl, InputLabel, createTheme, ThemeProvider } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles(()=>({
  title:{
    display: "flex",
    flex: 1,
    flexDirection: "row",
    //justifyContent: "space-between",
    //marginRight: 20,
    color: "#e4451df3",
    fontFamily: "Cursive",
    fontWeight: "bold",
    cursor: "pointer",
  },
  formControl:{
    minWidth: 110,
    //paddingBottom: 10,
  },
  bar:{
    padding: 10
  },
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
              <Typography onClick={()=>navigate("/portfolio")} variant={"h6"}>
                Portfolio
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
            
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
    
  )
}

export default Header
