export function getPRFromRepos(repos) {
  return repos.reduce((acc, element) => {
    return acc.concat(element.pullRequests.nodes);
  }, []);
}

export function getReposFromOrgs(orgs) {
  return orgs.reduce(
    (acc, element) => acc.concat(element.repositories.nodes),
    []
  );
}

export function mergePRs(queryData) {
  const userReposPRs = getPRFromRepos(queryData.user.repositories.nodes);
  const orgsReposPRs = getPRFromRepos(
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
