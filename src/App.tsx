import React, { useEffect } from "react";
import "./App.css";
import Navigation from "./navigation/navigation";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const useClickOutside = (ref: any, action: () => void) => {
  useEffect(() => {
    if (ref) {
      const handleClickOutside = (evt: MouseEvent) => {
        if (ref.current && !ref.current.contains(evt.target)) {
          action();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, action]);
};
const App: React.FC = () => {
  const httpLink = createHttpLink({
    uri: "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    const auth = store.getState().auth;
    return {
      headers: {
        ...headers,
        ...auth,
      },
    };
  });
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navigation />
          </Router>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
