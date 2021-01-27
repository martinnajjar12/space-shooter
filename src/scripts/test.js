const name = () => {
  const newMessage = document.createElement('div');
  newMessage.textContent = "I'm a test";
  document.body.appendChild(newMessage);
};

module.exports = name;
