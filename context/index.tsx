'use client'

import { projectId, config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { bsc } from 'wagmi/chains';
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';


// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'ucchain',
    description: 'Ucchain network',
    url: 'https://ucchain.org', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}



function ContextProvider({ children }: { children: ReactNode }) {

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default ContextProvider