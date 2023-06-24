import createEmotionCache from "@/createEmotionCache";
import "@/styles/globals.css";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import theme from "../theme";
import { SnackbarProvider } from 'notistack';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>OneRecord.fr</title>
          <meta
            name="description"
            content="One record June 2023 hackthon app"
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}
