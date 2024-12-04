import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import StranicaUnos from './StranicaUnos';
import PrikazInformacija from './PrikazInformacija';
import logo from './logo.svg';
import { useEffect } from 'react';

function App() {
  const [transakcija, setTransakcija] = useState(null);
  const [error, setError] = useState(null);
  const [gasInfo, setGasInfo] = useState(null);

  const fetchTransactionData = async (input) => {
    setError(null);
    setTransakcija(null);
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${input}&startblock=0&endblock=99999999&sort=asc&apikey=8UYC4BS6BHT6HWQ1EV8D2842CHGHHJH3GD`
      );
      const data = await response.json();
      if (data.status === '1') {
        setTransakcija(data.result);
      } else {
        setError('Nevažeća adresa ili nema podataka.');
      }
    } catch (error) {
      setError('Greška u komunikaciji sa API-jem.');
    }
  };

  const GasTransakcije = async () =>{
    const response = await fetch(
      'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=8UYC4BS6BHT6HWQ1EV8D2842CHGHHJH3GD'
    );
    const data = await response.json();
    if(data.status === '1'){
      setGasInfo(data.result);
    }else{
      setError('(GAS)Nevažeća adresa ili nema podataka.');
    }
  }


useEffect(()=>{
  GasTransakcije();
}, []);





  return (

/** 
    <Router>
      <div className='App'>
        <header className='App-headre'>
          <nav>
            Navigacija:|
            <Link to="/">Pocetna</Link>  | 
            <Link to="/SU">Stranica za unos</Link> |
            <Link to="/PT">Prikaz informacija</Link>
          </nav>
          <Routes>
            <Route path="/" element={<PocetnaStranica/>}></Route>
            <Route path="/SU" element={<StranicaUnos/>}></Route>
            <Route path="/PT" element={<PrikazInformacija/>}></Route>
          </Routes>
        </header>
      </div>
        </Router>
*/

<div>
<h1>Pregled Blockchain Transakcija</h1>
<h3>Binance Wallet: 0x28c6c06298d514db089934071355e5743bf21d60</h3>
<h3>Kraken Wallet: 0x0a869d79a7052c7f1b55a8ebabbea3420f0d1e13</h3>
<h3>Vitalik Buterin's Wallet (osnivač Ethereuma): 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</h3>
<h3>Uniswap V2 Router (decentralizovana berza): 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f</h3>
<StranicaUnos onSearch={fetchTransactionData} />
<h1>Gas Informacije</h1>
    {gasInfo && (
      <div>
        <p>Blok: {gasInfo.LastBlock}</p>
        <p>Safe Gas Price: {gasInfo.SafeGasPrice} Gwei</p>
        <p>Proposed Gas Price: {gasInfo.ProposeGasPrice} Gwei</p>
        <p>Fast Gas Price: {gasInfo.FastGasPrice} Gwei</p>
      </div>
    )}
{error && <p style={{ color: 'red' }}>{error}</p>}
{transakcija && <PrikazInformacija transakcije={transakcija} />}

</div>

    
  );
}

/**function PocetnaStranica(){
    return (
        <img src={logo} alt="Blockchain Viewer Logo" className="App-logo" />

    );
  }
 */
  

export default App;
