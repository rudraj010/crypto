import React , {useEffect,createContext, useContext,useState} from 'react'

const Crypto = createContext();

export function CryptoContext({children}){

    const[currency,setCurrency]=useState('INR')
       const[symbol,setSymbol] = useState('₹')


        


    useEffect(()=>{
  if(currency==='INR'){
    setSymbol( '₹')
  }else if (currency==='USD'){
    setSymbol('$')
  }


       

    },[currency])

    return(
        <div>
        <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}
        </Crypto.Provider> 
        </div>
    )
}



export const CryptoState=()=>{
  console.log(crypto,'ll')
    return useContext(Crypto)
   
}
