import name from './scripts/test';

name();
const messageEl = document.createElement('div');
messageEl.textContent = "I've been changed";
document.body.appendChild(messageEl);

const newMessage = document.createElement('div');
newMessage.textContent = "I'm a new message";
document.body.appendChild(newMessage);
