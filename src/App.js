import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    rpc: '',
    chainId: '42161',
    blockScan: 'https://arbiscan.io'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, rpc, chainId, blockScan } = formData;
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${Number(chainId).toString(16)}`,
            chainName: name,
            rpcUrls: [rpc],
            blockExplorerUrls: [blockScan],
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18
            }
          }
        ]
      });
      alert('Ağ eklendi!');
    } catch (error) {
      console.error(error);
      alert('Ağ eklenemedi!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Network Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        RPC:
        <input
          type="text"
          name="rpc"
          value={formData.rpc}
          onChange={handleChange}
        />
      </label>
      <label>
        Chain ID:
        <input
          type="number"
          name="chainId"
          value={formData.chainId}
          onChange={handleChange}
          disabled
        />
      </label>
      <label>
      BlokcScan:
        <input
          type="text"
          name="blockScan"
          value={formData.blockScan}
          onChange={handleChange}
          disabled
        />
      </label>
      <button type="submit">Add Network</button>
    </form>
  );
}

export default App;