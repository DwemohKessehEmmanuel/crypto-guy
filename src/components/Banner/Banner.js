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
            style={{
                fontWeight: "bold",
                
                marginBottom: 20,
                fontFamily: "Montserrat",
                color:"white",
                fontSize: '4vw'

            }}>
                Cryptocurrency Market
            </Typography>
            <Typography
            variant="subtitle2" 
            style={{
              color: "white",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              //marginBottom:170,
              fontSize: '1.2vw',     
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
