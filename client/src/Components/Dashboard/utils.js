// groups prs from the user
function getPRs(repos) {
  return repos.reduce((acc, element) => {
    return acc.concat(element.pullRequests.nodes);
  }, []);
}
// gets repos from org
function getReposFromOrgs(orgs) {
  return orgs.reduce(
    (acc, element) => acc.concat(element.repositories.nodes),
    []
  );
}
// gets als prs together
export function groupPRs(queryData) {
  const userReposPRs = getPRs(queryData.user.repositories.nodes);
  const orgsReposPRs = getPRs(
    getReposFromOrgs(queryData.user.organizations.nodes)
  );

  return [...userReposPRs, ...orgsReposPRs];
}
//helper function to filter by repos
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
//groups all repos
export function groupAllRepos(queryData) {
  const userRepos = queryData.user.repositories.nodes;
  const orgRepos = getReposFromOrgs(queryData.user.organizations.nodes);
  return [...orgRepos, ...userRepos];
}
