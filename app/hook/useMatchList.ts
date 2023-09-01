import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import { FullMatch } from '../types';
import { AxiosError } from 'axios';

const useMatchList = () => {
    const { data, error, isLoading } = useSwr<FullMatch[], AxiosError>('/api/match', fetcher, {
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

export default useMatchList;