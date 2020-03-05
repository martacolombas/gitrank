import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { gql } from 'apollo-boost';

const GRAPHQL_ENDPOINT =
	JSON.parse(localStorage.getItem('enterpriseUrl')) ||
	'https://api.github.com/graphql';

const cache = new InMemoryCache();
const link = new createHttpLink({ uri: `${GRAPHQL_ENDPOINT}` });

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
repositories(first: 30, orderBy: { field: UPDATED_AT, direction: DESC }) {
	nodes {
		id
		name
		pullRequests(
			last: 20
			states: OPEN
			orderBy: { field: UPDATED_AT, direction: ASC }
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
			organizations (first: 5) {
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
			repositories(first: 100) {
				nodes {
					id
					nameWithOwner
				}
			}
		}
	}
`;
