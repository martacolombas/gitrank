import moment from 'moment';

export const formatDate = date => {
  //date --> 2020-02-26T20:19:38Z
  const newDate = moment(date).format('L LT'); // returns date as DD/MM/YYY H:MM A/PM
  return newDate;
};

export const dateDiff = updated => {
  return moment(updated).fromNow();
};

export const reviewsByAuthor = reviews => {
  const orderedRev = reviews.map(element => {
    return {
      author: element.author.login,
      author_id: element.author.id,
      createdAt: element.createdAt,
      state: element.state,
      avatarUrl: element.author.avatarUrl,
    };
  });
  const orderById = orderedRev.reduce((acc, obj) => {
    let key = obj.author_id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  return orderById;
};

export const reviewersDetails = reviews => {
  const iterableRev = reviewsByAuthor(reviews);
  // reviewsByAuthor returns an obj like {12345678abcde=: Array(1), 987654zswer: Array(1)} -- where Array is an array of objects that represent each of the reviews by authorId
  const reviewsToShow = [];
  for (let key in iterableRev) {
    reviewsToShow.push(iterableRev[key][iterableRev[key].length - 1]); // last element in the array is the most recent one
  }
  return reviewsToShow;
};

export const pinItem = id => {
  let currentStorage = JSON.parse(localStorage.getItem('pinnedItems', id));
  let newStorage = [];

  if (!currentStorage) {
    newStorage.push(id);
    localStorage.setItem('pinnedItems', JSON.stringify(newStorage));
  } else if (currentStorage.includes(id)) {
    newStorage = currentStorage.filter(element => element !== id);
    localStorage.setItem('pinnedItems', JSON.stringify(newStorage));
  } else {
    currentStorage.push(id);
    localStorage.setItem('pinnedItems', JSON.stringify(currentStorage));
  }
};
