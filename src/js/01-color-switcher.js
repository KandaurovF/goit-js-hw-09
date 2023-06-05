const body = document.querySelector('body');
const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let timerId = null;
stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', changeTheme);

stopBtnEl.addEventListener('click', () => {
  clearInterval(timerId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
});

function changeTheme() {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;

  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
