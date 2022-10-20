import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import {  signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { UserAuth } from '../context/AuthContext';
import { CryptoState } from '../CryptoContext';
import { auth } from '../firebase';

const useStyles = makeStyles(()=>({
    
    
    box:{
        display: "flex",
        flexDirection: "column",
        maxWidth : 400,
        justifyContent: "center",
        margin: "auto",
        
        borderRadius: 5,
        alignItems: "center",
        boxShadow: "5px 5px 10px #ccc",
        "&:hover":{
            boxShadow:"10px 10px 20px #ccc",
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


    <div>
      <form onSubmit={handleSubmit}>
        <Box className={classes.box}>
            <div>
              <h2>Sign for a free User Account</h2>
              
            </div>
            
            
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
            
            <Button
             type='submit'
            style={{marginTop:30,marginBottom:30, borderRadius: 3 }} 
            variant="contained"
            color= "warning"
             >
                Login
             </Button>
             <p style={{marginTop:10,marginBottom:20, borderRadius: 3 }}>
              Not registered? <Link to='/signup' onClick={resetState}>Sign up .</Link></p>

            
        </Box>
      </form>
    </div>
  )
}

export default Login;
