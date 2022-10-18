import { makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((selected) => ({
        selectbutton: {
            border: " 1px solid black",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Cursive",
            cursor: "pointer",
            backgroundColor: selected ? "#e4451df3" : "",
            color: selected ? "white" : "",
            fontWeight: selected? 700 : 500,
            "&:hover": {
                backgroundColor: "#e4451df3",
                color: "white",
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

export default SelectButton
