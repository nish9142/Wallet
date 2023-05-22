import { Wallet, Transaction } from "../types";
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const useApi = () => {
    const baseUrl = process.env.REACT_APP_BASE_URL || "";
    const instance = Axios.getInstance()
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        const successHandler = (response: AxiosResponse<any>) => {
            if (response.data && response.data.message) {
                enqueueSnackbar(response.data.message, { variant: 'success' });
            }
            return response;
        };

        const errorHandler = (error: AxiosError<{ error: any }>) => {
            console.log({ error: error?.response?.data })
            if (error.response && error.response.data) {
                enqueueSnackbar(error.response.data.error, { variant: 'error' });
            } else {
                enqueueSnackbar(error.message, { variant: 'error' });
            }
            return Promise.reject(error);
        };
        instance.interceptors.response.clear();
        instance.interceptors.response.use(successHandler, errorHandler);
        return () => {
            instance.interceptors.response.clear();
        };
    }, []);

    const createWallet = async (name: string, balance: number): Promise<Wallet> => {
        const response = await instance.post(`${baseUrl}/api/setup`, { name, balance });
        return response.data;
    };

    const getWallet = async (walletId: string): Promise<Wallet> => {
        const response = await instance.get(`${baseUrl}/api/wallet/${walletId}`);
        return response.data;
    };

    const createTransaction = async (
        walletId: string,
        amount: number,
        description: string
    ): Promise<Transaction> => {
        const response = await instance.post(`${baseUrl}/api/transact/${walletId}`, { amount, description });
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
        const response = await instance.get(`${baseUrl}/api/transactions/${walletId}`, {
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
}

class Axios{
    public static axiosInstance:AxiosInstance | null = null
    public static getInstance() {
        if (!this.axiosInstance) {
            this.axiosInstance= axios.create()
        }
        return this.axiosInstance
    }
}

export default useApi;
