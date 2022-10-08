import React from 'react'

import { AppBar, Container, Typography, Toolbar, Select, MenuItem, makeStyles } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';


const useStyles = makeStyles(()=>({
  title:{
    flex: 1,
    color: "#e4451df3",
    fontFamily: "Cursive",
    fontWeight: "bold",
    cursor: "pointer",
  }
}))



  
const Header = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  
  
  return (
      
        <AppBar position="static" color="transparent">
        <Container >
          <Toolbar>
            <Typography onClick={()=>navigate("/")} className={classes.title}
            >
            Cryptocurrency Market
            </Typography>

            <Select 
            // currency select button//
              variant="outlined"
              style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
              }}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"GHS"}>GHS</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>

           </Toolbar>
          </Container>
        </AppBar>
      
    
  )
}

export default Header
