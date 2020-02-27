
export const formatDate = (date) => {
  //date --> 2020-02-26T20:19:38Z
  const newDate = date.match(/([^T]+)/);
  return newDate[0];
}

export const dateDiff = (created, updated) => {
  const diff = created.getTime() - updated.getTime();
  if(diff){
    let date = new Date(diff);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  } else {
    return '';
  }
}

export const statusDetails = (status, reviews) => {
    const arrayedReviews = reviews.nodes //reviews {nodes: [], ...} -- we are just interested in the nodes arr
    if(status==='OPEN' && arrayedReviews.length) {
      return arrayedReviews[0].name ? `${arrayedReviews[0].state} by ${arrayedReviews[0].name}` : `${arrayedReviews[0].state} by YOU`
    } else {
      return status;
    }
  }
// TODO now the position in the array is 0, but NEEDS TO BE FIXED, to the most recent status