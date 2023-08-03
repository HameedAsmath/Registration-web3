import "./App.css";
import { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";


function App() {
  const [limitInput, setLimitInput] = useState()
  const { wallet, connectWallet, disconnectWallet, getLimitPeopleInEvent, limitPeopleInEvent, setPeopleInEvent, setAttendeeInformation, setName, setAge, setCity, setEmail, setOccupation, getAttendeeList, attendeeList, getTotalPeople, totalPeople } = useContext(AppContext);
  return (
    <div className="App">
      <button onClick={connectWallet} className="connect">Connect to Metamask</button>
      <br></br>
      <p>{wallet}</p>
      <button className="disconnect" onClick={disconnectWallet}>Disconnect Wallet</button>
      <br />
      <br></br>
      <div className="container">
        <h1>Get Limit people</h1>
        <button onClick={getLimitPeopleInEvent}>Get Limit people</button>
        <br></br>
        <p>{limitPeopleInEvent}</p>
        <h1>Set Limit People in Event </h1>
        <input type='number' placeholder='Enter the limit of people who can attend this event' onChange={(e) => (setLimitInput(e.target.value))} className="ml-3" />
        <button onClick={() => (setPeopleInEvent(limitInput))} >Set Limit of people </button>
        <br />
        <br />
        <h1>Get Attendee List</h1>
        <button onClick={getAttendeeList} >Get Attendee List</button>
        <p>{attendeeList}</p>
        <br />
        <div className="form">
          <h1>Add Attendee</h1>
          <input type='text' placeholder='Enter your name' onChange={(e) => (setName(e.target.value))} />
          <input type='number' placeholder='Enter your age' onChange={(e) => (setAge(e.target.value))} />
          <input type='text' placeholder='Enter your occupation' onChange={(e) => (setOccupation(e.target.value))} />
          <input type='text' placeholder='Enter your city' onChange={(e) => (setCity(e.target.value))} />
          <input type='text' placeholder='Enter your email' onChange={(e) => (setEmail(e.target.value))} />
          <button onClick={() => (setAttendeeInformation())} >Set Attendee Information</button>
        </div>
        <br />
        <br />
        <button onClick={getTotalPeople}>Get Total People</button>
        <p>{totalPeople}</p>
      </div>
    </div>
  );
}

export default App;
