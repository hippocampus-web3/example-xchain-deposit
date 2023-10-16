const { Client: thorchainClient } = require('@xchainjs/xchain-thorchain');
const { Network } = require('@xchainjs/xchain-client');
const { register9Rheader } = require('@xchainjs/xchain-util');
const cosmosclient = require('@cosmos-client/core');
const axios = require('axios');

register9Rheader(axios);
register9Rheader(cosmosclient.default.config.globalAxios);

const chainIds = {
  [Network.Mainnet]: 'thorchain-mainnet-v1',
  [Network.Stagenet]: 'chain-id-stagenet',
  [Network.Testnet]: 'deprecated',
};

const thor = new thorchainClient({
  phrase: process.env.PHRASE,
  chainIds: chainIds,
});

const address = thor.getAddress()
console.log('address', address)
