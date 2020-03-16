// isDraft is removed due to incompatibilities with github enterprise
export const repositoriesFragment = `
repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
	nodes {
		id
		name
		pullRequests(
			last: 30
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
				number
				author {
					... on User {
						id
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
            login
						avatarUrl
						id
					}
				}
				reviews(last: 15) {
					nodes {
						author {
							... on User {
								id
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

export const userFragments = `
repositories(first: 50, orderBy: { field: UPDATED_AT, direction: DESC }) {
	nodes {
		id
		name
	}
}`;
