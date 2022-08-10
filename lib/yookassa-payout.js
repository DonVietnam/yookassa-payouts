const fs = require('fs');
const config = require('./config');
const { BalanceService } = require('./balance-service');
const { DepositionService, TestDepositionService } = require('./deposition-service');
const { ErrorNotificationService } = require('./error-notificaton-service');

class YookassaPayout {
  constructor(agentId, options = {}) {
    this.agentId = agentId;
    config.network = { ...config.network, ...options.network };
    config.certs = { ...config.certs, ...options.certs };
    config.certs.cert = fs.readFileSync(config.certs.certPath);
    config.certs.key = fs.readFileSync(config.certs.keyPath);
    this.balanceService = new BalanceService();
    this.depositionService = new DepositionService();
    this.testDepositionService = new TestDepositionService();
    this.errorNotificationService = new ErrorNotificationService();
  }

  balance(data) {
    return this.balanceService.getBalanceByAgentId(this.agentId, data);
  }

  makeDeposition(data, params = null) {
    return this.depositionService.makeDeposition(this.agentId, data, params);
  }

  testDeposition(data, params = null) {
    return this.testDepositionService.testDeposition(this.agentId, data, params);
  }

  getErrorNotification(data) {
    return this.errorNotificationService.getErrorNotification(data);
  }

  packNotificationResponse(status, clientOrderId) {
    return this.errorNotificationService.getNotificationResponse(status, clientOrderId);
  }
}

module.exports = { YookassaPayout };
