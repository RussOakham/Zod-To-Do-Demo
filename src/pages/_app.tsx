import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'

import '@/styles/globals.css'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 0,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			<Toaster richColors />
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
		</QueryClientProvider>
	)
}
