"use client";

import { SWRConfig } from "swr";

interface SWRProviderProps {
    children: React.ReactNode
}

const SWRProvider = ({children}: SWRProviderProps) => {
    return (
        <SWRConfig value={{
            onError: (error, key) => {
                console.log(error);
                if (error?.response?.status === 404) {
                    console.log("cc");
                }
            }
        }}>
            { children }
        </SWRConfig>
    );
}

export default SWRProvider;