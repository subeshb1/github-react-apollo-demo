import React from "react";
import { ApolloProvider } from "@apollo/client";
import "tailwindcss/tailwind.css";
import client from "lib/apolloClient";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
