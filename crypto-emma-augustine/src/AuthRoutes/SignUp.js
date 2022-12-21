import { Box, Button, makeStyles, TextField, Container } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { auth } from '../firebase';

const useStyles = makeStyles((theme)=>({
    
    
  box:{
      display: "flex",
      flexDirection: "column",
      maxWidth : 400,
      justifyContent: "center",
      margin: "auto",
      padding: 50,
      borderRadius: 5,
      alignItems: "center",
      //boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "&:hover":{
          //boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
      },
      
  },
  container: {
    backgroundImage:"url(./bannnerIMG.jpg)",
    backgroundSize: "cover",
    backgroundColor: "none",
    backgroundPosition: "center",
   //backgroundRepeat: "repeat",
   minWidth: "100%",
   height: "100vh",
   //background: "yellow",
   display: "flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
   [theme.breakpoints.down("md")]: {
     width: "100%",
     minHeight: "60vh",
     //paddingTop: "10%",
   },
   [theme.breakpoints.down(650)]: {
     minHeight: "80vh",
   },
   [theme.breakpoints.down(560)]: {
     minHeight: "60vh",
   },
   [theme.breakpoints.down("sm")]: {
     width: "90%",
     minHeight: "60vh"
   },
  },
  contentDiv: {
    
    minWidth: "80%",
    height: "70vh",
    //background: "#fce2ce",
    //opacity: 0.2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      minWidth: "90%",
    },
    [theme.breakpoints.down(560)]: {
      minWidth: "80%",
      flexDirection: "column",
      minHeight: "70vh",
    },
    [theme.breakpoints.down(650)]: {
      height: "60vh",
    }
  },
  // welcome: {
    
  //   width: "50%",
  //   minHeight: "100%",
  //   background: "black",
  //   opacity: 0.85,
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "#fce2ce",
  //   [theme.breakpoints.down("md")]: {
  //     width: "50%",
  //   },
  //   [theme.breakpoints.down(560)]: {
  //     width: "100%",
  //     minHeight: "20%"
  //     //display: "none"
  //   }
  // },
  form: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    minHeight: "100%",
    background: "white",
    opacity: 0.9,
    [theme.breakpoints.down("md")]: {
      width: "60%",
      // height: "60vh"
    },
    [theme.breakpoints.down(650)]: {
      //height: "60vh",
      width: "70%",
    },
    [theme.breakpoints.down(560)]: {
      width: "100%",
      //minHeight: "60%"
    }
  },
  button: {
    minWidth: "25%",
    background: "black",
    color: "white",
    "&:hover": {
      fontWeight: 700,
      color: "black",
    }
  },
  loginlink: {
    color: "#7393B3",
    "&:hover": {
      color: "#71797E"
    }
  },
  field: {
    color: "black",
    minWidth: "80%",
    [theme.breakpoints.down("md")]: {
      height: 20,
      marginBottom: 30,
      minWidth: "70%"
    },
    [theme.breakpoints.down("sm")]: {
      height: 20,
      marginBottom: 30,
      minWidth: "90%"
    },
    // [theme.breakpoints.down(560)]: {
    //   color: "white",
    // }
  },
}))

const SignUp = () => {
      const classes = useStyles();
      const navigate = useNavigate();
      const {setAlert} = CryptoState()

      const [inputs, setInputs] = useState({
        name: "", 
        email: "", 
        password: "",
        password1: "",
      });

      const handleChange = (e) =>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
      };
      
      let email = inputs.email
      let password = inputs.password
      let password1 = inputs.password1
      
      const handleSubmit = async(e) => {
        e.preventDefault();
        if (password !== password1){
          setAlert({
          open: true,
          message: 'Passwords do not match',
          type: 'error'
        })
        return;
        }
        try{
          const result = await createUserWithEmailAndPassword(auth, email,password);
          console.log(result)
          setAlert({
            open: true,
            message: `Sign Up Successful. Welcome ${result.user.email}`,
            type: "success",
          });
          
          navigate('/login')
        }catch(error){
            setAlert({
              open:true,
              message: error.message,
              type: "error"
            })
        }
       

      };
      const resetState = () => {
        setInputs({name:"", email: "", password:""})
      }
  return (


    <Container className={classes.container}>
      <div className={classes.contentDiv}>
        {/* <div className={classes.welcome}>
          <p className={classes.welcomeText}>Welcome to the <span className={classes.title}>cryptocurrency market</span></p>
          
        </div> */}
        <form onSubmit={handleSubmit} className={classes.form}>
          <Box className={classes.box}>
              {/* <div>
                <h2>Sign for a free User Account</h2>
                
              </div> */}
              
              <TextField
              onChange={handleChange} 
                name='name'
                value={inputs.name}
                margin='normal' 
                type={'text'}  
                placeholder="Username" 
                variant="outlined"
                className={classes.field}
              />
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
              <TextField 
                onChange={handleChange} 
                value={inputs.password1}
                name='password1'
                margin='normal' 
                type={'password'} 
                placeholder="Confirm Password"
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
                  Sign Up
              </Button>
              <p style={{marginTop:10,marginBottom:20, borderRadius: 3 }}>
                Already a User? <Link to='/login' onClick={resetState} className={classes.loginlink}>Login</Link></p>

              
          </Box>
        </form>
      </div>
      
    </Container>
  )
}

export default SignUp
