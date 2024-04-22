import { ethers } from "ethers";
import { useEffect, useState } from "react";

const App = () => {
  const [userAccount, setUserAccount] = useState<any>(null);
  const [balance, setBalance] = useState<any>(0) as any;

  const onConnect = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts: any[]) => {
          setUserAccount(accounts[0]);
          getBalance(accounts[0]);
        })
        .catch((error: Error) => {
          console.error(error);
        });
      window.ethereum.on("accountsChanged", onConnect);
      window.ethereum.on("chainChanged", chainChanedHanlder);
    } else {
      alert("Metamask не установлен");
    }
  };
  const chainChanedHanlder = () => {
    window.location.reload();
  };
  const getBalance = () => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [userAccount, "latest"],
      })
      .then((balance: any) => {
        setBalance(ethers.formatEther(balance));
      })

      .catch((error: any) => {
        console.error(error);
      });
  };
  useEffect(() => {
    if (window.ethereum) {
      onConnect();
    } else {
      alert("Metamask не установлен");
    }
  });
  return (
    <main>
      {userAccount && balance ? (
        <>
          <span className=' fa fa-user'>{userAccount}</span> <br />
          <span>Баланс: {balance}</span>
        </>
      ) : (
        <>
          <h2>Подключение к MetaMask</h2>
          <button onClick={onConnect}>Подключиться</button>
        </>
      )}
    </main>
  );
};

export default App;
