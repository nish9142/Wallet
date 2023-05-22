import { useAxios } from './useAxios';
import { Wallet, Transaction } from "../types";

const useApi = () => {
    const axios = useAxios();
    const baseUrl = process.env.REACT_APP_BASE_URL || "";

    const createWallet = async (name: string, balance: number): Promise<Wallet> => {
        const response = await axios.post(`${baseUrl}/api/setup`, { name, balance });
        return response.data;
    };

    const getWallet = async (walletId: string): Promise<Wallet> => {
        const response = await axios.get(`${baseUrl}/api/wallet/${walletId}`);
        return response.data;
    };

    const createTransaction = async (
        walletId: string,
        amount: number,
        description: string
    ): Promise<Transaction> => {
        const response = await axios.post(`${baseUrl}/api/transact/${walletId}`, { amount, description });
        return response.data;
    };

    const getTransactions = async (
        walletId: string,
        page: number = 0,
        size: number = 5,
        sort: string = "date",
        order: string = "asc",
        format: string = "json",
    ): Promise<Transaction[]> => {
        if (format === 'csv' && window) {
            window.open(`${baseUrl}/api/transactions/${walletId}?page=${page}&limit=${size}&sort=${sort}&order=${order}&format=${format}`, '_blank');
            return [];
        }
        const response = await axios.get(`${baseUrl}/api/transactions/${walletId}`, {
            params: {
                page,
                size,
                sort: sort,
                order: order,
                format,
            },
        });
        return response.data;
    };

    return { createWallet, getWallet, createTransaction, getTransactions };
};

export default useApi;
