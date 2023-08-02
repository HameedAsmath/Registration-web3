import React, {useState, createContext} from 'react';
import { ContractABI, Contractaddress } from "../utils/AppUtils";
import {ethers} from "ethers";

export const AppContext = createContext();

export default function AppProvider({children}) {
   const [wallet,setWallet] = useState();
   const[limitPeopleInEvent,setLimitPeopleInEvent] = useState("")
   const connectWallet = async() =>{
    if(!window.ethereum){
      alert("please download metamask")
      return;
    }
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setWallet(accounts[0]);
    }
    const disconnectWallet = () =>{
      setWallet("");
  }
  const getEthereumContract = async () => {
    if(!window.ethereum){
      alert("Please Download Metamask")
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Contractaddress,ContractABI,signer)
    console.log(contract,provider,signer)
    return contract
  };
   const getLimitPeopleInEvent = async() => {
    try {
      const contract = getEthereumContract()
      const limitPeopleInEvent = await contract.getLimitPeople()
      console.log(limitPeopleInEvent.toString())
      setLimitPeopleInEvent(limitPeopleInEvent.toString())
    } catch (error) {
      console.log(error)
    }
   }
  return (
    <AppContext.Provider value={{wallet,setWallet, connectWallet, disconnectWallet, getLimitPeopleInEvent, limitPeopleInEvent}}>
      {children}
    </AppContext.Provider>
  )
}