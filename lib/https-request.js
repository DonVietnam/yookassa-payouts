const https = require('https');

const request = (options, body) =>
  new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(data);
        } else {
          resolve(data);
        }
      });

      res.on('error', (error) => {
        reject(error);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.method === 'POST' && body) {
      req.write(body);
    }

    req.end();
  });

module.exports.request = request;
