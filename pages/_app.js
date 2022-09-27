import "styles/global.scss";
import "antd/dist/antd.css";

import NextNprogress from "nextjs-progressbar";
import { Provider } from "react-redux";

import store from "appstore";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNprogress options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
