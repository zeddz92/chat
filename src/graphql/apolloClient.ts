import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
    }),
    defaultOptions: {
      mutate: {
        // Prevent apollo from throwing when there is an error, so we can catch it
        errorPolicy: "all",
      },
    },
    cache: new InMemoryCache(),
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

// export const apolloClient = new ApolloClient({
//   uri: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
//   cache: new InMemoryCache(),
// });
