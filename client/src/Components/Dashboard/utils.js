export function getPRs(repos) {
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
	const userReposPRs = getPRs(queryData.user.repositories.nodes);
	const orgsReposPRs = getPRs(
		getReposFromOrgs(queryData.user.organizations.nodes)
	);

	return [...userReposPRs, ...orgsReposPRs].sort(
		(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
	);
}
export function filterById(allPRs, ids) {
	return Array.isArray(ids) && ids.length > 0
		? allPRs.filter(element => ids.includes(element.id))
		: allPRs;
}

export function groupAllRepos(queryData) {
	const userRepos = queryData.user.repositories.nodes;
	const orgRepos = getReposFromOrgs(queryData.user.organizations.nodes);
	return [...orgRepos, ...userRepos];
}
