const config = require('./config');
const { Operation } = require('./operation');

class Deposition {
  constructor(data = {}) {
    this.status = data.status;
    this.processedDT = data.processedDT;
    this.clientOrderId = data.clientOrderId;
    this.error = data.error && this.status !== 0 ? data.error : '';
    this.balance = data.balance || '';
    this.techMessage = data.techMessage || '';
    this.indentification = data.indentification || '';
  }
}

class DepositionService {
  constructor() {
    this.path = config.network.makeDepositionPath;
    this.operation = new Operation('makeDepositionRequest', 'makeDepositionResponse', this.path);
  }

  async makeDeposition(agentId, data, params) {
    const result = await this.operation.execute({ agentId, ...data }, params);
    return new Deposition(result);
  }
}

class TestDepositionService {
  constructor() {
    this.path = config.network.testDepositionPath;
    this.operation = new Operation('testDepositionRequest', 'testDepositionResponse', this.path);
  }

  async testDeposition(agentId, data, params) {
    const result = await this.operation.execute({ agentId, ...data }, params);
    return new Deposition(result);
  }
}

module.exports = {
  DepositionService,
  TestDepositionService
};
