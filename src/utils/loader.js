const loaderDiv = document.querySelector('.spinnerDiv');

const loadBody = () => {
  window.addEventListener('load', () => {
    loaderDiv.style.display = 'none';
  });
};

module.exports = loadBody;
