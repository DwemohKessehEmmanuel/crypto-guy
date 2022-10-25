import { Box, Button, makeStyles, TextField, Container } from '@material-ui/core'
import {  signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';
import { CryptoState } from '../CryptoContext';
import { auth } from '../firebase';

const useStyles = makeStyles((theme)=>({
    
    
    box:{
        display: "flex",
        flexDirection: "column",
        minWidth : "60%",
        minHeight: "50vh",
        justifyContent: "center",
        margin: "auto",
        padding: 50,
        borderRadius: 5,
        alignItems: "center",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "&:hover":{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
        },
        [theme.breakpoints.down("md")]: {
          width: "95%",
          paddingLeft: 5,
          paddingRight: 5,
          height: "95%"
          
        },
    },
    container: {
      width: "70%",
      height: "70vh",
      //background: "yellow",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      [theme.breakpoints.down("md")]: {
        width: "90%",
        height: "60vh",
        paddingTop: "10%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "60vh"
      },
    },
    
    button: {
      "&:hover": {
        fontWeight: 700
      }
    },
    signlink: {
      color: "#7393B3",
      "&:hover": {
        color: "#71797E"
      }
    },
    field: {
      [theme.breakpoints.down("md")]: {
        height: 20,
        marginBottom: 30,
        width: "70%"
      },
      [theme.breakpoints.down("sm")]: {
        height: 20,
        marginBottom: 30,
        width: "90%"
      },
    },
    form: {
      [theme.breakpoints.down("md")]: {
        width: "90%",
        height: "60vh"
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "60vh"
      },
    }
}))

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {setAlert} = CryptoState()
  const [inputs, setInputs] = useState({
     
    email: "", 
    password: "",
  });
  const handleChange = (e) =>{
    setInputs((prevState)=>({
        ...prevState,
        [e.target.name] : e.target.value,
    }))
  };

      let email = inputs.email
      
      let password = inputs.password
      
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!email || !password){
      setAlert({
        open: true,
        message: "Please fill all the blanks",
        type: "error"
      });
      return;
    }
    try{
      const result = await signInWithEmailAndPassword(auth,email,password);
      console.log(result);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      navigate('/')
    }catch(error){
      setAlert({
        open:true,
        message: error.message,
        type: error
      })
    }
    
  }
  const resetState = () => {
    setInputs({email: "", password:""})
  }
  
   

  return (


    <Container className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Box className={classes.box}>
            {/* <div>
              <h2>Sign for a free User Account</h2>
              
            </div> */}
            
            
            <TextField
              onChange={handleChange} 
              name='email'
              value={inputs.email}
              margin='normal' 
              type={'email'}  
              placeholder="Email" 
              variant="outlined"
              className={classes.field}
             />
            <TextField 
              onChange={handleChange} 
              value={inputs.password}
              name='password'
              margin='normal' 
              type={'password'} 
              placeholder="Password"
              variant="outlined"
              className={classes.field}
             />
            
            <Button
             type='submit'
            style={{marginTop:30,marginBottom:30, borderRadius: 3 }} 
            variant="contained"
            color= "warning"
            className={classes.button}
             >
                Login
             </Button>
             <p style={{marginTop:10,marginBottom:20, borderRadius: 3 }}>
              Not registered? <Link to='/signup' onClick={resetState} className={classes.signlink}>Sign up</Link></p>

            
        </Box>
      </form>
    </Container>
  )
}

export default Login;
