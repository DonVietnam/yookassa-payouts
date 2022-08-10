const { request } = require('./https-request');
const { parseObject, parseXML } = require('xml-converter');
const { smime } = require('openssl-smime');
const config = require('./config');

class RequestYookassaService {
  constructor() {
    this.host = config.network.host;
    this.port = config.network.port;
    this.cert = config.certs.cert;
    this.key = config.certs.key;
    this.certPath = config.certs.certPath;
    this.keyPath = config.certs.keyPath;
    this.decryptCertPath = config.certs.decryptCertPath;
  }

  async parseYookassaData(data) {
    return parseXML(await this.verify(data));
  }

  async packDataForYookassa(xmlObject) {
    const xml = parseObject(xmlObject);
    return this.sign(xml);
  }

  async request(path, xmlObject) {
    const options = {
      hostname: this.host,
      port: this.port,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/pkcs7-mime'
      },
      cert: this.cert,
      key: this.key
    };

    return this.parseYookassaData(await request(options, await this.packDataForYookassa(xmlObject)));
  }

  sign(data) {
    return smime(
      'sign',
      {
        nointern: true,
        nodetach: true,
        nocerts: true,
        nochain: true,
        outform: 'PEM',
        signer: this.certPath,
        inkey: this.keyPath
      },
      data
    );
  }

  verify(data) {
    return smime(
      'verify',
      {
        noverify: true,
        inform: 'PEM',
        nointern: true,
        certfile: this.decryptCertPath,
        CAfile: this.decryptCertPath
      },
      data
    );
  }
}

module.exports = {
  RequestYookassaService
};
