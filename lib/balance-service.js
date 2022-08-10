const config = require('./config');
const { Operation } = require('./operation');

class Balance {
  constructor(data = {}) {
    this.balance = data.balance;
    this.processedDT = data.processedDT;
    this.clientOrderId = data.clientOrderId;
    this.status = data.status;
    if (this.status !== 0 && data.error) {
      this.error = data.error;
    }
  }
}

class BalanceService {
  constructor() {
    this.operation = new Operation('balanceRequest', 'balanceResponse', config.network.balancePath);
  }

  async getBalanceByAgentId(agentId, data = {}) {
    const result = await this.operation.execute({ agentId, ...data });
    return new Balance(result);
  }
}

module.exports = {
  BalanceService
};
