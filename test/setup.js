const Web3 = require('web3');
const promisify = require('bluebird').promisify;

const config = require ("./config").config;

async function main () {

  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  web3.eth.getAccountsAsync = promisify(web3.eth.getAccounts);
  web3.eth.getBalanceAsync = promisify(web3.eth.getBalance);
  web3.eth.sendTransactionAsync = promisify(web3.eth.sendTransaction);

  try {
    const account0 = (await web3.eth.getAccountsAsync())[0];

    await web3.eth.sendTransactionAsync({
      from: account0,
      to: config.dp0Acc0,
      value: web3.toWei(10, "ether"),
    });

    await web3.eth.sendTransactionAsync({
      from: account0,
      to: config.dp0Acc1,
      value: web3.toWei(10, "ether"),
    });

    await web3.eth.sendTransactionAsync({
      from: account0,
      to: config.dp1Acc0,
      value: web3.toWei(10, "ether"),
    });

    await web3.eth.sendTransactionAsync({
      from: account0,
      to: config.dp1Acc1,
      value: web3.toWei(10, "ether"),
    });

    console.log(web3.fromWei(await web3.eth.getBalanceAsync(config.dp0Acc0), "ether").toString());
    console.log(web3.fromWei(await web3.eth.getBalanceAsync(config.dp0Acc1), "ether").toString());
    console.log(web3.fromWei(await web3.eth.getBalanceAsync(config.dp1Acc0), "ether").toString());
    console.log(web3.fromWei(await web3.eth.getBalanceAsync(config.dp1Acc1), "ether").toString());

    } catch (e) {
    console.log(e);
  }
}

main().catch(err => console.log(err));
