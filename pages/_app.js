import "../styles/global.scss";
import NavigationLoader from "../components/NavigationLoader";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavigationLoader />
      <Component {...pageProps} />
    </>
  );
}
