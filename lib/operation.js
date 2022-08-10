const { RequestYookassaService } = require('./request-yookassa-service');
const { randomUUID } = require('crypto');
const { getRFCDate } = require('./helpers');

class Operation {
  constructor(requestName, responseName, path) {
    this.requestName = requestName;
    this.responseName = responseName;
    this.path = path;
    this.requestService = new RequestYookassaService();
  }

  async execute(data, params = null) {
    const requestData = {
      [this.requestName]: [
        {
          value: '',
          attrs: {
            clientOrderId: randomUUID(),
            requestDT: getRFCDate(),
            ...data
          },
          self: !params
        }
      ]
    };

    if (params) {
      requestData[this.requestName][0][params.name] = [this.prepareParams(params)];
    }

    const response = await this.requestService.request(this.path, requestData);
    return response[this.responseName][0].attrs;
  }

  prepareParams(params) {
    const result = {
      value: '',
      attrs: {},
      self: false
    };

    for (const param in params.data) {
      result[param] = [
        {
          value: params.data[param],
          self: false,
          attrs: {}
        }
      ];
    }

    return result;
  }
}

module.exports = {
  Operation
};
