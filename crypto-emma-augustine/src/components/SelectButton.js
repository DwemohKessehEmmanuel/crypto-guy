import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((selected) => ({
  selectbutton: {
    marginRight: 5,
    //border: " 1px solid black",
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Cursive",
    cursor: "pointer",
    backgroundColor: selected ? "#F9842C" : "",
    color: selected ? "white" : "",
    fontWeight: selected? 700 : 500,
    "&:hover": {
      backgroundColor: "#e4451df3",
      color: "#D3D3D3",
      boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
    },
    width: "225%",
  }
}))


const SelectButton = ({children, onClick,selected}) => {
    

    const classes = useStyles();

  return (
    <span className={classes.selectbutton}
    onClick={onClick}
    >
      {children}
    </span>
  )
}

export default SelectButton;
