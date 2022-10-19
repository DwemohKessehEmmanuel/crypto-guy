import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    portbutton: {
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Cursive",
        cursor: "pointer",
        backgroundColor: "#F9842C",
        color: "white",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "#e4451df3",
          color: "#D3D3D3",
          boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
        },
      }
}))


const PortfolioButton = ({coin}) => {
  const [coinId, setcoinId] = useState("");
  const classes = useStyles();
  //setcoinId(id);
  return (
    <span className={classes.portbutton}>
        Add to Portfolio
    </span>
  )
}

export default PortfolioButton;