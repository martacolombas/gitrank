import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient, IntrospectionFragmentMatcher } from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { gql } from 'apollo-boost';

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

const repositoriesFragment = `
repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
	nodes {
		id
		name
		pullRequests(
			last: 20
			states: OPEN
			orderBy: { field: UPDATED_AT, direction: DESC }
		) {
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
						avatarUrl
						login
					}
				}
				repository {
					name
					nameWithOwner
					url
					id
				}
				assignees(first: 10) {
					nodes {
						name
						email
						avatarUrl
						login
					}
				}
				reviews(first: 10) {
					nodes {
						author {
							... on User {
								id
								name
								email
								avatarUrl
								login
							}
						}
						state
						createdAt
						updatedAt
					}
				}
			}
		}
	}
}`;

export const GET_PRS = gql`
	query PRinfo($login: String!) {
		user(login: $login) {
			id
			${repositoriesFragment}
			organizations (first: 10) {
				totalCount
				nodes {
					${repositoriesFragment}
				}
			}
		}
	}
`;

export const GET_REPOS = gql`
	query getRepos($login: String!) {
		user(login: $login) {
			id
			repositories(last: 10) {
				nodes {
					id
					nameWithOwner
				}
			}
			organizations(first: 10) {
				nodes {
					repositories(last: 10) {
						nodes {
							id
							nameWithOwner
						}
					}
				}
			}
		}
	}
`;
