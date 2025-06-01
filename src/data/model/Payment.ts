// Tipos base
type DocumentType = 'ruc' | 'ci' | 'other';

interface Document {
  type: DocumentType;
  number: string;
}

interface BankAccount {
  label: string;
  number: string;
  bank: string;
  document: Document;
}

interface ElectronicWalletAccount {
  label: string;
  number: string;
}

// Tipos para campos de formulario
interface BaseField {
  name: string;
  label: string;
  readonly?: boolean;
  hint?: string;
}

interface NumericField extends BaseField {
  type: 'numeric';
  format?: 'money' | 'number' | 'decimal';
}

interface TextField extends BaseField {
  type?: 'text' | 'email';
}

interface BankAccountsField {
  type: 'bank-accounts';
  label: string;
  hint?: string;
  accounts: BankAccount[];
}

interface QRField {
  type: 'qr';
  label: string;
}

// Unión de todos los tipos de campos posibles
type FormField = NumericField | TextField;
type PaymentFields = FormField[] | BankAccountsField | QRField;

// Tipos para acciones
interface ConfirmAction {
  type: 'confirm' | 'confirm-generate-qr';
  label: string;
}

interface AddFileConfirmAction {
  type: 'add-file-confirm';
  label: string;
}

type PaymentAction = ConfirmAction | AddFileConfirmAction;


export enum PaymentMethodName {
  CASH = 'cash',
  BANK_TRANSFER = 'bank-transfer',
  QR = 'qr',
  ELECTRONIC_WALLET = 'electronic-wallet',
}


// Tipos específicos para cada método de pago
type PayMethodBase<Method extends PaymentMethodName> = {
  name: Method;
  description: string;
  icon: string;
}

type CashPaymentMethod = PayMethodBase<PaymentMethodName.CASH> & {
  fields: FormField[];
  action: ConfirmAction;
}

type BankTransferPaymentMethod = PayMethodBase<PaymentMethodName.BANK_TRANSFER> & {
  fields: BankAccountsField;
  action: AddFileConfirmAction;
}

type QRPaymentMethod = PayMethodBase<PaymentMethodName.QR> & {
  fields: QRField;
  action: ConfirmAction;
}

type ElectronicWalletPaymentMethod = PayMethodBase<PaymentMethodName.ELECTRONIC_WALLET> & {
  accounts: ElectronicWalletAccount[];
  action: AddFileConfirmAction;
}


type PayMethodMap = {
  [PaymentMethodName.CASH]: CashPaymentMethod,
  [PaymentMethodName.BANK_TRANSFER]: BankTransferPaymentMethod,
  [PaymentMethodName.QR]: QRPaymentMethod,
  [PaymentMethodName.ELECTRONIC_WALLET]: ElectronicWalletPaymentMethod
};


type PaymentMethod = PayMethodMap[keyof PayMethodMap];


export type {
  DocumentType,
  Document,
  BankAccount,
  ElectronicWalletAccount,
  BaseField,
  NumericField,
  TextField,
  BankAccountsField,
  QRField,
  FormField,
  PaymentFields,
  ConfirmAction,
  AddFileConfirmAction,
  PaymentAction,
  CashPaymentMethod,
  BankTransferPaymentMethod,
  QRPaymentMethod,
  ElectronicWalletPaymentMethod,
  PaymentMethod
};
