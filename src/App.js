 

import { makeStyles } from "@material-ui/core";
import {BrowserRouter,Link,Router,Route,Routes} from 'react-router-dom'
import {CoinPage} from "./pages/CoinPage";
import {Header} from "./components/Header";
import {HomePage} from "./pages/HomePage";

import './App.css';




const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));





function App() {
const classess =useStyles()

  return (

   

   
    <div className= {classess.App}>
    <BrowserRouter>
   <Header/>
    <Routes>

    <Route path ='/' element={<HomePage/>} exact/>
    <Route path ="/coinpage/:id" element={<CoinPage/>}/>

    </Routes>
    </BrowserRouter>


    </div>
 
  );
}

export default App;
