import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// npm i flatpickr --save
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// npm i notiflix

const refs = {
  dateTime: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),

  enableStatrtBtn() {
    this.startBtn.disabled = false;
    this.startBtn.classList.add('isActive');
  },

  disableStatrtBtn() {
    this.startBtn.disabled = true;
    this.startBtn.classList.remove('isActive');
  },
};

let timerId = null;

refs.startBtn.disabled = true;

flatpickr(refs.dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Time is over', {
        clickToClose: true,
        timeout: 4000,
      });
      return;
    }
    refs.enableStatrtBtn();

    let countedTime = selectedDates[0].getTime() - Date.now();

    refs.startBtn.addEventListener('click', () => {
      refs.disableStatrtBtn();
      refs.dateTime.disabled = true;
      startCountdown(countedTime);
    });
  },
});

function startCountdown(ms) {
  clearInterval(timerId);
  timerId = setInterval(() => {
    ms = ms - 1000;

    if (ms < 1) {
      Notify.success('Time over', {
        clickToClose: true,
        timeout: 4000,
      });

      clearInterval(timerId);
      refs.dateTime.disabled = false;
      return;
    }
    makeTextContent(ms);
  }, 1000);
}

function makeTextContent(ms) {
  const { daysField, hoursField, minutesField, secondsField } = refs;
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysField.textContent = `${days}`;
  hoursField.textContent = `${hours}`;
  minutesField.textContent = `${minutes}`;
  secondsField.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
