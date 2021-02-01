
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {
  interface,
  bytecode
} = require('./compile');
const {
  MNEMONIC,
  INFURA_RINKEBY_ENDPOINT
} = require('./config');

const provider = new HDWalletProvider(
  MNEMONIC,
  INFURA_RINKEBY_ENDPOINT
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  // Attempting to deploy from account 0xcF01971DB0CAB2CBeE4A8C21BB7638aC1FA1c38c

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({
      gas: '1000000',
      from: accounts[0]
    });

  console.log('Contract deployed to', result.options.address);
  // Contract deployed to 0xA1665f8C12557Ed9dceA3A7D184f9E541d60317c
};
deploy();
