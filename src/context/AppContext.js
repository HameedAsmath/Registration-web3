import React, { useState, createContext } from 'react';
import { ContractABI, Contractaddress } from "../utils/AppUtils";
import { ethers } from "ethers";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [wallet, setWallet] = useState();
  const [limitPeopleInEvent, setLimitPeopleInEvent] = useState("")
  const [attendeeList, setAttendeeList] = useState([])
  const [totalPeople, setTotalPeople] = useState()
  // name, age, occupation, city, email
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("please download metamask")
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWallet(accounts[0]);
  }
  const disconnectWallet = () => {
    setWallet("");
  }
  const getEthereumContract = () => {
    if (!window.ethereum) {
      alert("Please Download Metamask")
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Contractaddress, ContractABI, signer)
    console.log(contract, provider, signer)
    return contract
  };
  const getLimitPeopleInEvent = async () => {
    try {
      const contract = getEthereumContract()
      const limitPeopleInEvent = await contract.getLimitPeople()
      console.log(limitPeopleInEvent.toString())
      setLimitPeopleInEvent(limitPeopleInEvent.toString())
    } catch (error) {
      console.log(error)
    }
  }
  const setPeopleInEvent = async (numberOfPeople) => {
    try {
      const contract = getEthereumContract()
      const tx = await contract.setLimitPeople(numberOfPeople)
      await tx.wait()
      console.log(tx)
      getLimitPeopleInEvent()
    } catch (error) {
      console.log(error)
    }
  }
  const getAttendeeList = async () => {
    try {
      const contract = getEthereumContract();
      const attendeeList = await contract.getAttendeesList();
      console.log("exact response", attendeeList);
      console.log("response converted to String", attendeeList.toString());
      setAttendeeList(attendeeList.toString());
    } catch (error) {
      console.log(error);
    }
  }
  const setAttendeeInformation = async () => {
    try {
      const contract = getEthereumContract();
      const tx = await contract.setAttendDetails(name, age, occupation, city, email);
      await tx.wait();
      console.log("transaction mined", tx);
      getAttendeeList();
    } catch (error) {
      console.log(error)
    }
  }
  const getTotalPeople = async () => {
    try {
      const contract = getEthereumContract();
      const totalPeople = await contract.getTotalPeople()
      console.log("response converted to String", totalPeople.toString());
      setTotalPeople(totalPeople.toString());
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <AppContext.Provider value={{ wallet, setWallet, connectWallet, disconnectWallet, getLimitPeopleInEvent, limitPeopleInEvent, setPeopleInEvent, setLimitPeopleInEvent, attendeeList, getAttendeeList, setAttendeeInformation, setName, setAge, setCity, setEmail, setOccupation, getTotalPeople, totalPeople }}>
      {children}
    </AppContext.Provider>
  )
}