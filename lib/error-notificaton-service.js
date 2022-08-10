const { RequestYookassaService } = require('./request-yookassa-service');
const { getRFCDate } = require('./helpers');

class ErrorNotification {
  constructor(data) {
    this.clientOrderId = data.clientOrderId || '';
    this.requestDT = data.requestDT || '';
    this.dstAccount = data.dstAccount || '';
    this.amount = data.amount || '';
    this.currency = data.currency || '';
    this.error = data.error || '';
  }
}

class ErrorNotificationService {
  constructor() {
    this.requestService = new RequestYookassaService();
  }
  async getErrorNotification(data) {
    const result = await this.requestService.parseYookassaData(data);
    return new ErrorNotification(result.errorDepositionNotificationRequest[0].attrs);
  }

  getNotificationResponse(status, clientOrderId) {
    const xmlObject = {
      errorDepositionNotificationResponse: [
        {
          value: '',
          attrs: {
            status,
            clientOrderId,
            requestDT: getRFCDate()
          },
          self: true
        }
      ]
    };

    return this.requestService.packDataForYookassa(xmlObject);
  }
}

module.exports = {
  ErrorNotificationService
};
