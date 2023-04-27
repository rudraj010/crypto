import React,{useState,useEffect} from 'react'

import Pagination from "@material-ui/lab/Pagination";
 import {useNavigate} from 'react-router-dom'
import {
  
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
    makeStyles
  } from "@material-ui/core";
import axios from 'axios'
import {CryptoState} from   './../CryptoContext'
import  {CoinList} from './../config/api'

        
const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function CoinsTable() {
    const [coins,setCoins]=useState([])
    const [loading,seTLoading]=useState(false)
    const [search,setSearch]=useState('')
    const [data,setData]=useState()
    const [page,setPage]=useState(1)


   
    const { currency, symbol } = CryptoState();

const classes = useStyles();
const Navigate=useNavigate()

const darkTheme = createTheme({
    palette: {  
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
   
  

  

  const fetchCoins= async()=> {
      seTLoading(true) 
      const {data}= await axios.get(CoinList(currency))
    setCoins(data)
    seTLoading(false)
  }
console.log(coins,'ccccc');
 
useEffect(()=>{
fetchCoins()
},[])


function handleSearch(){

    const filterData = coins.filter((coin)=>{
    return(
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
})
setData(filterData)
}           

 
useEffect(()=>{
  handleSearch()

},[data])
     
                                 
                                                        

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
     <Container style={{textAlign: 'center'}}>
     <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency...."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
         onChange={(e)=>setSearch(e.target.value)} />

         <TableContainer> 
         { loading?(
            < LinearProgress style={{backgroundColor: "gold"}}/>
         ):(
            <Table>
                <TableHead style={{backgroundColor:'#EEBC1D'}}>
                           <TableRow>
{ 
    ['Coin','Price','24h Change','Market Cap'].map((head)=>(
        <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
    )
    )}
                           </TableRow>
                </TableHead>
<TableBody>


 {
    data?.slice((page-1),(page-1)+10)?.map((row)=>{
    const profit = row.price_change_percentage_24h > 0;
    return(
      <TableRow
                        onClick={() => Navigate(`/coinpage/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>

    )}
    )
 }  
 

 </TableBody>

            </Table>
         )
           
         }
         </TableContainer>
         <Pagination count={(data?.length/10).toFixed(0)}
 style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
         />
         </Container>
         </ThemeProvider>
    </div>
  )
}

export default CoinsTable
