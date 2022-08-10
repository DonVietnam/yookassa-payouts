const { request } = require('./https-request');
const { network } = require('./config');
const { URLSearchParams } = require('url');

class Card {
  constructor(data = {}) {
    this.panmask = data['skr_destinationCardPanmask'] || '';
    this.synonim = data['skr_destinationCardSynonim'] || '';
    this.reason = data.reason || '';
    this.bankName = data['skr_destinationCardBankName'] || '';
    this.countryCode = data['skr_destinationCardCountryCode'] || '';
    this.paymentSystem = data['skr_destinationCardPaymentSystem'] || '';
    this.productName = data['skr_destinationCardProductName'] || '';
    this.productCode = data['skr_destinationCardProductCode'] || '';
  }
}

class CardService {
  constructor() {
    this.host = network.storeCardHost;
    this.path = network.storeCardPath;
  }

  async store(cardNumber) {
    const data = new URLSearchParams([
      ['skr_destinationCardNumber', cardNumber],
      ['skr_responseFormat', 'json']
    ]).toString();
    const result = JSON.parse(
      await request(
        {
          host: this.host,
          path: this.path,
          port: '443',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
          }
        },
        data
      )
    ).storeCard;
    return new Card(result);
  }
}

module.exports = {
  CardService
};
