const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.disabled = true;

startBtn.addEventListener('click', startSwitchCollor);
stopBtn.addEventListener('click', stopSwitchCollor);

function startSwitchCollor() {
  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);

  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopSwitchCollor() {
  clearInterval(timerId);

  startBtn.disabled = false;
  stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
