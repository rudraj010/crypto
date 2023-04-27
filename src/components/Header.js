import React , {useState} from 'react'

import {useNavigate} from 'react-router-dom'
import {
    AppBar,
    Container,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    makeStyles,createTheme,ThemeProvider
  } from "@material-ui/core";
import {CryptoState} from   '../CryptoContext'

  const useStyles=makeStyles(()=>({
    title:{
      color:'gold',
      flex:1,
      fontWeight:'bold',
      cursor:'pointer',
      fontFamily: "Montserrat"
      
  }
  }))

  const darkTheme=createTheme(()=>({
    palette:{
      primary:{
        main:'#ffff'
      },
      type:'dark',
  },
  }));

export function Header(){

 
const classes=  useStyles()
const [USD,setUSD]=useState()
const [INR,setINR]=useState()

const Navigate =useNavigate()

const{currency,setCurrency} = CryptoState()

console.log(currency,'lllllljuu')
    return(
        <div>
        <ThemeProvider theme={darkTheme}>

       
        <AppBar color="transparent" position="static">    
<Container>
<Toolbar>
<Typography onClick={()=> Navigate('/')} className={classes.title} variant='h6'>
Crypto Hunter
<Select variant='outlined' style={{width:'100',height:40,marginLeft:15}}
  value={currency}
  onChange={(e)=>setCurrency(e.target.value)}
>
    <MenuItem value={'USD'}>USD</MenuItem>
    <MenuItem value={'INR'}> INR</MenuItem>
</Select>
</Typography>

</Toolbar>
</Container>

</AppBar>
 </ThemeProvider>
        </div>
    )
}