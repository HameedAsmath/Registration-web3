import "./App.css";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";


function App() { 
  const { wallet, connectWallet, disconnectWallet, getLimitPeopleInEvent, limitPeopleInEvent } = useContext(AppContext);
  return (
    <div className="App">
      <button onClick={connectWallet}>Connect</button>
      <p>{wallet}</p>
      <button className='myButton' onClick={disconnectWallet}>Disconnect Wallet</button>
      <button onClick={getLimitPeopleInEvent}>Get Limit people</button>
      <p>{limitPeopleInEvent}</p>
    </div>
  );
}

export default App;
