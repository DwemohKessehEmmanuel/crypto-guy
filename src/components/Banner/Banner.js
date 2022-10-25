import { Container, makeStyles, Typography, createTheme } from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';

// const theme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 900,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

const useStyles = makeStyles((theme)=>({
   banner:{
    backgroundImage:"url(./bannerIMG5.jpg)",
    backgroundSize: "cover",
   },
   bannerContent:{
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    }, 
    tagline:{
        display: "flex",
        height: "45%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "black", 
        marginTop: -20,
        marginLeft: "auto",
        marginRight: "auto",
        width: '65%',
        opacity: 0.65,
        border: 20,
        //borderRadius: "50%"
        // margin: "auto"
        //paddingTop: 50,
    },
    bannerText: {
      [theme.breakpoints.down("sm")]: {
        height: "30%",
        fontSize: "2vw",
        paddingLeft: 20,
        paddingRight: 20,

      },
    },
    bannerHead: {
      fontWeight: "bold",        
      marginBottom: 20,
      fontFamily: "Montserrat",
      color:"white",
      fontSize: '4vw',
      [theme.breakpoints.down("sm")]: {
        marginBottom: 10
      }
    }
  
}))

const Banner = () => {

    const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}
        >
            <Typography
            //variant="h2" 
            className={classes.bannerHead}
            style={{
                

            }}>
                Cryptocurrency Market
            </Typography>
            <Typography
            className={classes.bannerText}
            variant="subtitle2" 
            style={{
              color: "white",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              //marginBottom:170,
              //fontSize: '1.2vw',     
            }}>
               up-to-date info on all your favorite Crypto Currencies in one place
            </Typography>
            
        </div>
            <Carousel>Carousel</Carousel>
      </Container>
    </div>
  )
}

export default Banner
