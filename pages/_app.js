import '../styles/globals.css';
import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#52B467" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
