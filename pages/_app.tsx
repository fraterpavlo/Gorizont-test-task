import "../styles/global.scss";
import NavigationLoader from "../components/NavigationLoader";
import { Provider } from "react-redux";
import { store } from "../store/store";
import React from "react";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationLoader />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
