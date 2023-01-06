import type { AppProps } from "next/app";
import GlobalStyles from "../common/styles/GlobalStyles";
import "normalize.css";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { provider } from "web3-core";

const getLibrary = (provider: provider) => {
  return new Web3(provider);
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}
