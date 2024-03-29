import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";
import { onError } from "@apollo/client/link/error";

import Router from "next/router";

let apolloClient: ApolloClient<NormalizedCacheObject>;

export const typePolicies = {
  Message: {
    fields: {
      error: {
        read(error = "") {
          return error;
        },
      },
      status: {
        read(status = "DEFAULT") {
          return status;
        },
      },
    },
  },
};

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (networkError) {
      Router.replace(
        "/?networkError=A network error ocurred. Try again later",
        {},
        { shallow: true }
      );
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([errorLink, httpLink]),
    defaultOptions: {
      mutate: {
        // Prevent apollo from throwing when there is an error, so we can catch it
        errorPolicy: "all",
      },
    },
    cache: new InMemoryCache({
      typePolicies,
    }),
  });
};

export const initApollo = (initialState?: NormalizedCacheObject) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // The initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState?: NormalizedCacheObject) => {
  const store = useMemo(() => initApollo(initialState), [initialState]);
  return store;
};
