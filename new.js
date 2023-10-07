const { Client: thorchainClient } = require('@xchainjs/xchain-thorchain');
const { Network } = require('@xchainjs/xchain-client');
const { assetToBase, assetAmount, register9Rheader } = require('@xchainjs/xchain-util');
const cosmosclient = require('@cosmos-client/core');
const axios = require('axios');
const { AssetRuneNative } = require('@xchainjs/xchain-util');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const phrase = process.env.PHRASE;

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

async function depositrune(amount, memo) {
  var DECIMAL = 8;
  let total = assetToBase(assetAmount(Number(amount), DECIMAL));
  try {
    const txid = await thor.deposit({
      "amount": total,
      "memo": memo,
      "asset": AssetRuneNative,
      "walletIndex": 0
    });
    console.log('txid', txid)
  } catch(e) {
    console.log('Error', e.message);
  }
}

depositrune(0.00001, "test");
