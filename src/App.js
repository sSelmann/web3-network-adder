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

  const connectMetamask = async () => {

   if (typeof window.ethereum !== "undefined") {
       console.log("MetaMask installed")
       await window.ethereum.request({ method: 'eth_requestAccounts' });
       document.getElementById("form").style.display = 'block';
       document.getElementById("connectButton").style.display = 'none';
   } else {
       window.open("https://metamask.io/download/", "_blank");
   }

  };

  return (
    <div className="w-full flex items-center m-auto justify-center bg-slate-400 h-screen">
      <button id="connectButton" onClick={connectMetamask}>Connect Metamask</button>
      <div id="form" className="flex flex-col" onSubmit={handleSubmit} style={{"display": "none"}}>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg border-none focus:border-none focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] pl-4 pr-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Network name"
          required />


        <input
          type="text"
          name="rpc"
          value={formData.rpc}
          onChange={handleChange}
          className="bg-gray-50 border text-gray-900 text-sm rounded-lg border-none focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] pl-4 pr-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          placeholder="RPC url"
          required />

        <input
          type="text"
          name="chainId"
          value={formData.chainId}
          onChange={handleChange}
          className="bg-gray-100 border text-gray-900 text-sm rounded-lg border-none focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] pl-4 pr-4  cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="Chain ID: 42161"
          disabled />

        <input
          type="number"
          name="blockScan"
          value={formData.blockScan}
          onChange={handleChange}
          className="bg-gray-100 border text-gray-900 text-sm rounded-lg border-none focus:ring-blue-500 focus:border-blue-500 block w-full py-[10px] pl-4 pr-4 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          placeholder="https://arbiscan.io"
          disabled />

        <button className="py-[10px] bg-orange-500 rounded-lg text-white hover:text-black hover:bg-white ease-in-out duration-500" type="submit">Add Network</button>
      </div>
    </div>
  );
}

export default App;