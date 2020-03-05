function getSelectedInfoFromRepos(repos) {
	return repos.reduce((acc, element) => {
		return acc.concat(element.pullRequests.nodes);
	}, []);
}

function getReposFromOrgs(orgs) {
	return orgs.reduce(
		(acc, element) => acc.concat(element.repositories.nodes),
		[]
	);
}

export function groupPRs(queryData) {
	const userReposPRs = getSelectedInfoFromRepos(
		queryData.user.repositories.nodes
	);
	const orgsReposPRs = getSelectedInfoFromRepos(
		getReposFromOrgs(queryData.user.organizations.nodes)
	);

	return [...userReposPRs, ...orgsReposPRs].sort(
		(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
	);
}
export function filterByRepos(allPRs, repos) {
	return Array.isArray(repos) && repos.length > 0
		? allPRs.filter(element =>
				repos.some(repo => repo.value === element.repository.id)
		  )
		: allPRs;
}

export function groupAllRepos(queryData) {
	const userRepos = getSelectedInfoFromRepos(
		queryData.user.repositories.nodes
	);
	const orgRepos = getSelectedInfoFromRepos(
		queryData.user.organizations.repositories.nodes
	);
	return [...userRepos, ...orgRepos];
}
