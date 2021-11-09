const path = require( 'path' );
const crypto = require( 'crypto' );
const https = require('https');
const parser = require('fast-xml-parser');
const fs = require( 'fs' );

const certPath = path.resolve( '/home/donvietnam/certs/yookassa/cert.pem' );
const keyPath = path.resolve( '/home/donvietnam/certs/yookassa/key.pem' );

const cert = fs.readFileSync( certPath );
const key = fs.readFileSync( keyPath );

const xml = '<balanceRequest agentId="500685" clientOrderId="12345" requestDT="2011-07-01T20:38:00.000Z"/>';
const url = 'https://payouts.yookassa.ru:9094/webservice/deposition/api/balance';

//const encodedData = crypto.publicEncrypt( publicKey, Buffer.from( xml ) );

const options = {
  hostname: 'payouts.yookassa.ru',
  port: 9094,
  path: '/webservice/deposition/api/balance',
  method: 'POST',
  headers: {
    'Content-Type': 'application/pkcs7-mime',
  },
  cert,
  key
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write( xml );

req.end()
//console.log( encodedData );
