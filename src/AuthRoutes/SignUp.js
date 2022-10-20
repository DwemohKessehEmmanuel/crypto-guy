import { Box, Button, makeStyles, TextField } from '@material-ui/core';
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
      marginTop: 100,
      borderRadius: 5,
      alignItems: "center",
      boxShadow: "5px 5px 10px #ccc",
      "&:hover":{
          boxShadow:"10px 10px 20px #ccc",
      },
      
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


    <div>
      <form onSubmit={handleSubmit}>
        <Box className={classes.box}>
            <div>
              <h2>Sign for a free User Account</h2>
              
            </div>
            
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
             >
                Sign Up
             </Button>
             <p style={{marginTop:10,marginBottom:20, borderRadius: 3 }}>
              Already a User? <Link to='/login' onClick={resetState}>Login .</Link></p>

            
        </Box>
      </form>
    </div>
  )
}

export default SignUp
