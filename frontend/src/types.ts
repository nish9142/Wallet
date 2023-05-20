export interface Wallet {
    id: string;
    walletId: string;
    name: string;
    balance: number;
    date: string;
}

export interface Transaction {
    _id: string;
    walletId: string;
    amount: number;
    description: string;
    balance: number;
    type: string;
    date: string;
    transactionId: string;
}
