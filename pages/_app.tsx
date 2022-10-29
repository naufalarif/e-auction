import { useState } from 'react';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import '../styles/globals.css';

interface OwnAppProps extends AppProps {
  pageProps: {
    session?: any;
    dehydratedState?: any;
  }
}

function MyApp({ Component, pageProps }: OwnAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <SessionProvider session={pageProps.session}> */}
          <Component {...pageProps} />
        {/* </SessionProvider> */}
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp
