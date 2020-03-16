function getPRs(repos) {
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

  return [...userReposPRs, ...orgsReposPRs];
}
export function filterByRepos(allPRs, repos, authors) {
  const firstFiltering =
    Array.isArray(repos) && repos.length > 0
      ? allPRs.filter(element =>
          repos.some(repo => repo.value === element.repository.id)
        )
      : allPRs;
  return Array.isArray(authors) && authors.length > 0
    ? firstFiltering.filter(element =>
        authors.some(author => author.value === element.author.id)
      )
    : firstFiltering;
}

export function groupAllRepos(queryData) {
  const userRepos = queryData.user.repositories.nodes;
  const orgRepos = getReposFromOrgs(queryData.user.organizations.nodes);
  return [...orgRepos, ...userRepos];
}
