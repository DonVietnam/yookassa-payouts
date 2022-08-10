module.exports = {
  network: {
    host: 'payouts.yookassa.ru',
    port: 9094,
    balancePath: '/webservice/deposition/api/balance',
    makeDepositionPath: '/webservice/deposition/api/makeDeposition',
    testDepositionPath: '/webservice/deposition/api/testDeposition',
    storeCardHost: 'paymentcard.yoomoney.ru',
    storeCardPath: '/gates/card/storeCard'
  },
  certs: {
    cert: '',
    key: '',
    decryptCertPath: '',
    certPath: '',
    keyPath: ''
  }
};
