import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { setContext } from "@apollo/client/link/context";
import { App } from "vue";

export default {
  install: (app: App): void => {
    // HTTP connection to the API
    const httpLink = createHttpLink({
      // You should use an absolute URL here
      uri: "https://api.deadcat.xyz",
      // uri: "http://localhost:4000",
    });

    const authLink = setContext(async (_, { headers }) => {
      // get the authentication token
      // return the headers to the context so httpLink can read them
      const token = await app.config.globalProperties.$auth?.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    // Cache implementation
    const cache = new InMemoryCache();

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache,
    });

    app.provide(DefaultApolloClient, apolloClient);
  },
};
