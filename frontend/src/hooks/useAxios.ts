import { useEffect } from 'react';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

const instance = axios.create();
export const useAxios = (): AxiosInstance => {
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
         //@ts-ignore
        if (instance?.setInterceptors) return
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
   
        const successInterceptorId = instance.interceptors.response.use(successHandler, errorHandler);
        //@ts-ignore
        instance.setInterceptors = true
        return () => {
            instance.interceptors.response.eject(successInterceptorId);
        };
    }, [enqueueSnackbar]);

    return instance;
};
