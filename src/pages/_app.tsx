import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from "next/app";
import { StreamProvider } from '@/contexts/StreamProvider';
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <StreamProvider>
        <Component {...pageProps} />
      </StreamProvider>
    </ClerkProvider>
  );
}
