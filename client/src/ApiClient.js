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

export const GET_PRS = gql`
	query PRinfo($login: String!) {
		user(login: $login) {
			id
			repositories(first: 30, orderBy: { field: NAME, direction: ASC }) {
				nodes {
					id
					name
					pullRequests(
						last: 100
						orderBy: { field: CREATED_AT, direction: ASC }
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
