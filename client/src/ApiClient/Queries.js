import { gql } from 'apollo-boost';
import {
  repositoriesFragment,
  selectedReposFragment,
  authorsFragment,
  userFragments,
} from './Fragments';

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
			${selectedReposFragment}
			organizations(first: 10) {
				nodes {
					${selectedReposFragment}
				}
			}
		}
	}
`;

export const GET_AUTHORS = gql`
query getAuthors($login: String!) {
user(login: $login) {
id
${authorsFragment}
organizations(first: 10) {
	nodes {
	${authorsFragment}
	  }
   }
  }
 }`;

export const GET_USERINFO = gql`
	query PRinfo($login: String!) {
		user(login: $login) {
      id
      login
      avatarUrl
			${userFragments}
			organizations (first: 10) {
				totalCount
				nodes {
					${userFragments}
				}
			}
		}
	}
`;
