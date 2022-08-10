export interface NetworkOptions {
  host?: string;
  port?: number;
  balancePath?: string;
  makeDepositionPath?: string;
  testDepositionPath?: string;
  storeCardHost?: string;
  storeCardPath?: string;
}

export interface CertOptions {
  cert?: string;
  key?: string;
  decryptCertPath?: string;
  certPath?: string;
  keyPath?: string;
}

export interface YookassaOptions {
  network?: NetworkOptions;
  certs?: CertOptions;
}

export interface BalanceData {
  agentId?: string;
  requestDT?: string;
  clientOrderId?: string;
}

export interface DepositionData {
  dstAccount: string;
  amount: string;
  currency: string;
  contract: string;
  clientOrderId?: string;
  requestDT?: string;
  agentId?: string;
}

export interface DepositionParamsData {
  skr_destinationCardSynonim: string;
  pdr_firstName: string;
  pdr_middleName: string;
  pdr_lastName: string;
  pdr_docNumber: string;
  pdr_postcode: string;
  pdr_country: string;
  pdr_city: string;
  pdr_address: string;
  pdr_birthDate: string;
  pdr_birthPlace: string;
  pdr_docIssueYear: string;
  pdr_docIssueMonth: string;
  pdr_docIssueDay: string;
  pdr_docIssuedBy: string;
  pof_offerAccepted: 0 | 1;
  smsPhoneNumber: string;
}

export interface DepositionParams {
  name: 'paymentParams';
  data: DepositionParamsData;
}

export class Balance {
  constructor(data: object);
  balance: string;
  processedDT: string;
  clientOrderId: string;
  status: string;
  error?: string;
}

export class Deposition {
  constructor(data: object);
  status: string;
  processedDT: string;
  clientOrderId: string;
  error?: string;
  balance?: string;
  techMessage?: string;
  indentification?: string;
}

export class ErrorNotification {
  constructor(data: object);
  clientOrderId?: string;
  requestDT?: string;
  dstAccount?: string;
  amount?: string;
  currency?: string;
  error?: string;
}

export function getRFCDate(): string;

export class YookassaPayout {
  constructor(agentId: number, options?: YookassaOptions);
  balance(data?: BalanceData): Promise<Balance>;
  makeDeposition(data: DepositionData, params?: DepositionParams): Promise<Deposition>;
  testDeposition(data: DepositionData, params?: DepositionParams): Promise<Deposition>;
  getErrorNotification(data: String | Buffer): Promise<ErrorNotification>;
  packNotificationResponse(status: number, clientOrderId: string): Promise<Buffer>;
}

export class Card {
  constructor(data: object);
  panmask: string;
  synonim: string;
  reason: string;
  bankName: string;
  countryCode: string;
  paymentSystem: string;
  productName: string;
  productCode: string;
}

export class CardService {
  constructor();
  store(cardNumber: string): Promise<Card>;
}
