import refreshLeaderBoard from './util';

const sortScore = () => refreshLeaderBoard().then(data => data.sort((a, b) => b.score - a.score))
  .catch(err => `Sorry! Something wrong happened. Error: ${err}`);

export { sortScore as default };
