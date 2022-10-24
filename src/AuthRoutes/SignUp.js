import { Box, Button, makeStyles, TextField, Container } from '@material-ui/core';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { auth } from '../firebase';

const useStyles = makeStyles(()=>({
    
    
  box:{
      display: "flex",
      flexDirection: "column",
      maxWidth : 400,
      justifyContent: "center",
      margin: "auto",
      padding: 50,
      borderRadius: 5,
      alignItems: "center",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "&:hover":{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
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
  },
  button: {
    "&:hover": {
      fontWeight: 700
    }
  },
  loginlink: {
    color: "#7393B3",
    "&:hover": {
      color: "#71797E"
    }
  }
}))

const SignUp = ({handleClose}) => {
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
      <form onSubmit={handleSubmit}>
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
            />
            <TextField
            onChange={handleChange} 
            name='email'
            value={inputs.email}
             margin='normal' 
             type={'email'}  
             placeholder="Email" 
             variant="outlined"
             />
            <TextField 
              onChange={handleChange} 
              value={inputs.password}
              name='password'
              margin='normal' 
              type={'password'} 
              placeholder="Password"
              variant="outlined"
             />
            <TextField 
              onChange={handleChange} 
              value={inputs.password1}
              name='password1'
              margin='normal' 
              type={'password'} 
              placeholder="Confirm Password"
              variant="outlined"
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
    </Container>
  )
}

export default SignUp
