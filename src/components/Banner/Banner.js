import { Container, makeStyles, Typography} from '@material-ui/core';
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
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
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    }
  
}))

const Banner = () => {

    const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
            <Typography
            variant="h2" 
            style={{
                fontWeight: "bold",
                marginBottom: 20,
                fontFamily: "Montserrat",
                color:"white"
            }}>
                Cryptocurrency Market
            </Typography>
            <Typography
            variant="subtitle2" 
            style={{
                color: "darkgrey",
                textTransform: "capitalize",
                fontFamily: "Montserrat",
                marginBottom:170
                
            }}>
               up-to-date info on all your favorite Crpto Currencies in one place
            </Typography>
            
        </div>
            <Carousel>Carousel</Carousel>
      </Container>
    </div>
  )
}

export default Banner
