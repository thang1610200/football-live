import useSwr from 'swr';
import fetcher from '@/lib/fetcher';
import { FullMatch } from '../types';

const useMatchbyRound = (id: string) => {
    const { data, error, isLoading } = useSwr<FullMatch[], Error>(id ? `/api/round/${id}` : null, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    })

    return {
        data,
        error,
        isLoading
    }
}

export default useMatchbyRound;