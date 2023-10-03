const fs = require('fs');
const axios = require('axios');

const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

let SPC;
let resultObject;

axios.get(url)
  .then(response => {
    const json = response.data;
    parseJson(json);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function parseJson(json) {
  const usdRate = parseFloat(json.bpi.USD.rate.replace(',', ''));
  SPC = (usdRate / 6500).toFixed(4);
  createJsonObject();
}

function createJsonObject() {
  resultObject = {
    "bpi": {
      "SPC": {
        "code": "SPC",
        "symbol": "SPC",
        "rate": SPC,
        "description": "SPC",
        "rate_float": parseFloat(SPC)
      }
    }
  };
  
  console.log(`SPC Rate ${resultObject.bpi.SPC.rate}`);
}
