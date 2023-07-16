import Sidebar from '@/components/layout/Sidebar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto hover:overflow-scroll h-screen">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}
