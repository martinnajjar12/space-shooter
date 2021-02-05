import fetchAPI from './fetchAPI';

const sortResult = () => fetchAPI().then(data => data.sort((a, b) => b.score - a.score))
  .catch(err => `Sorry! Something wrong happened. Error: ${err}`);

export { sortResult as default };
