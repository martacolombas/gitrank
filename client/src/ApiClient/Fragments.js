export const repositoriesFragment = `
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

export const selectedReposFragment = `
repositories(
	first: 50
	orderBy: { field: UPDATED_AT, direction: DESC }
) {
	nodes {
		id
		nameWithOwner
		owner {
			id
			login
		}
	}
}`;

export const authorsFragment = `repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }){
		nodes {
			pullRequests(
			last: 20
			states: OPEN
			orderBy: { field: UPDATED_AT, direction: DESC }
		) {
          nodes {
            author {
              ... on User {
                id
                login
              }
            }
          }
        }
          }
        } `;
