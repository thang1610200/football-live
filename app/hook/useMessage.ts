import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import { FullMessage } from '../types';
import { AxiosError } from 'axios';

const useMessage = (id?: string) => {
    const { data, error, isLoading } = useSwr<FullMessage[], AxiosError>(id ? `/api/messages/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 500
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useMessage;