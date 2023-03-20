// Додаємо бібліотеку flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// ------------------------------------------

// Додаємо бібліотеку Notiflix
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.6.min.js';
// ------------------------------------------

// Пов'язуємо змінні JS з DOM
const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  timerValueEl: document.querySelectorAll('.value'),
};
// ------------------------------------------

let timeOfCount = 0;
let timerId = null;


// Ініціалізуємо бібліотеку flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
    timeOfCount = selectedDates[0].getTime() - options.defaultDate.getTime();
    addLeadingZero(convertMs(timeOfCount));
  },
};

const fp = flatpickr('#datetime-picker', options);
// ------------------------------------------

// Додаємо базові стилі
refs.startBtn.disabled = true;
refs.timerEl.style.display = 'flex';
refs.timerEl.style.gap = '15px';
refs.timerEl.style.padding = '20px';
refs.timerValueEl.forEach(elem => {
  elem.style.display = 'block';
  elem.style.textAlign = 'center';
  elem.style.fontSize = '30px';
});
// ------------------------------------------

// Ставимо слухача на кнопку Start 
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  fp.input.disabled = true;
  timerId = setInterval(() => {
    timeOfCount -= 1000;
    if (timeOfCount <= 0) {
      clearInterval(timerId);
      fp.input.disabled = false;
      return;
    }

    addLeadingZero(convertMs(timeOfCount));
  }, 1000);
});
// ------------------------------------------

// Функція, що змінює значення лічильника
function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days.toString().padStart(2, '0');
  refs.hoursEl.textContent = hours.toString().padStart(2, '0');
  refs.minutesEl.textContent = minutes.toString().padStart(2, '0');
  refs.secondsEl.textContent = seconds.toString().padStart(2, '0');
}
// ------------------------------------------

// Функція, що переформатовує значення часу з Unix в часи, години, хвилини...
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// ------------------------------------------