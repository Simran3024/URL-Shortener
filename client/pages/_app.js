// pages/_app.js
import '../styles/globals.css';

import '../src/output.css';
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
