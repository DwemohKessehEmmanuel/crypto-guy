import React from 'react'

import { AppBar, Container, Typography, Toolbar, Select, MenuItem, makeStyles, 
        FormControl, InputLabel } from '@material-ui/core';
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

  
  
  return (
      
    <AppBar position="static" color="transparent">
      <Container >
        <Toolbar>
          <Typography onClick={()=>navigate("/")} className={classes.title}>
            Cryptocurrency Market
          </Typography>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Currency</InputLabel>
            <Select label="Currency">
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"GHS"}>GHS</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </FormControl>

        </Toolbar>
      </Container>
    </AppBar>
      
    
  )
}

export default Header
