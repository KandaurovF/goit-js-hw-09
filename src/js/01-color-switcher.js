const body = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;

startBtnEl.addEventListener('click', changeTheme);

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  startBtnEl.removeAttribute('disabled');
});

function changeTheme() {
  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;

    startBtnEl.setAttribute('disabled', '');
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
