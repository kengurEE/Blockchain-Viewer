import React from 'react';

function PrikazInformacija({ transakcije }) {
    return (
      <div>
        <h2>Detalji transakcije:</h2>
        {transakcije.map((tx) => (
          <div key={tx.hash}>
            <p>Hash: {tx.hash}</p>
            <p>Iznos: {tx.value / 1e18} ETH</p>
            <p>Pošiljalac: {tx.from}</p>
            <p>Primalac: {tx.to}</p>
            <p>Vreme: {new Date(tx.timeStamp * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  }

  export default PrikazInformacija;