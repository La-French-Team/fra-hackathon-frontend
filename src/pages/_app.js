import { ColorModeContext } from "@/components/ColorModeContext";
import createEmotionCache from "@/createEmotionCache";
import "@/styles/globals.css";
import '@/styles/label-rect.css';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { useMemo, useState } from "react";
import appTheme from "../theme";
import { ApiContext } from "@/components/ApiContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export async function getServerSideProps() {
  const apiUrl = process.env.API_URL;

  return { props: { apiUrl } };
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  apiUrl
}) {
  const { session } = pageProps;

  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => appTheme(mode), [mode]);

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
        <ColorModeContext.Provider value={colorMode}>
          <ApiContext.Provider value={{ apiUrl }}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider />
              <Component {...pageProps} />
            </ThemeProvider>
          </ApiContext.Provider>
        </ColorModeContext.Provider>
      </CacheProvider>
    </SessionProvider>
  );
}
