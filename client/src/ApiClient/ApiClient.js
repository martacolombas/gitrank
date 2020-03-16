import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, IntrospectionFragmentMatcher } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

// Apollo client cache will use heuristic fragment matcher, however...
// ...he heuristic fragment matcher will not work accurately when using ...
// ...fragments with unions or interfaces. This is required in order to be able
// to corrextly retrieve the data
// more info here: https://www.apollographql.com/docs/react/data/fragments/
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [],
    },
  },
});

const GRAPHQL_ENDPOINT =
  JSON.parse(localStorage.getItem('enterpriseUrl')) ||
  'https://api.github.com/graphql';

const cache = new InMemoryCache({ fragmentMatcher });
const link = new createHttpLink({
  uri: `${GRAPHQL_ENDPOINT}`,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token')
        ? `bearer ${localStorage.getItem('token')}`
        : '',
    },
  };
});

export const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
});
