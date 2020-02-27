import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { gql } from 'apollo-boost';

const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: 'https://api.github.com/graphql',
  credentials: 'omit'
});

const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `bearer ${process.env.REACT_APP_GRAPHQL_KEY}`,
    }
  })
);

export const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const  GET_PRS = gql`
query PRinfo {
  user(login: "${process.env.REACT_APP_USERNAME}") {
    id
    repositories(first: 30, orderBy: {field: NAME, direction: ASC}) {
      nodes {
        id
        name
        pullRequests(last: 100, orderBy: {field: CREATED_AT, direction: ASC}) {
          nodes {
            id
            title
            createdAt
            updatedAt
            state
            url
            author {
              ... on User {
                id
                name
                email
              }
            }
            repository {
              name
              url
            }
            assignees(first: 10) {
              nodes {
                name
                email
              }
            }
            reviews(first: 10) {
              nodes {
                author {
                  ... on User {
                    id
                    name
                  }
                }
                state
              }
            }
          }
        }
      }
    }
  }
}
`;
