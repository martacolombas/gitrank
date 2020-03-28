export const isLoggedIn = () => {
  if (
    localStorage.getItem('isEnterprise') &&
    localStorage.getItem('enterpriseURL')
  ) {
    if (localStorage.getItem('token') && localStorage.getItem('username')) {
      return true;
    }
  } else if (
    localStorage.getItem('token') &&
    localStorage.getItem('username')
  ) {
    return true;
  } else {
    return false;
  }
};
