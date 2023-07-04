import { GoogleAnalytics } from "@reactivers/next-ga";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { preventZoom } from "utils/functions";
import "../styles/globals.css";
import { OGHead } from "@reactivers/next-og";

const APP_NAME = "Coffeebot | Murat Güney";
const APP_DESCRIPTION = "A Coffee shop bot. | Murat Güney";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    preventZoom();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>{APP_NAME}</title>
          <meta
            name="viewport"
            content={`user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, viewport-fit=cover`}
          />
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <OGHead
          title={APP_NAME}
          description={APP_DESCRIPTION}
          url={`https://coffeebot.appysode.com`}
        />
        <Component {...pageProps} />
        <GoogleAnalytics gaId="G-J6J4YTCSJH" />
      </Provider>
    </>
  );
}

export default MyApp;
