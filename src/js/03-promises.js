import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  inputFirstDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', createPromises);

function createPromises(event) {
  event.preventDefault();

  const { inputFirstDelay, inputStep, inputAmount } = refs;
  let position = 1;
  let delay = Number(inputFirstDelay.value);

  for (let i = 0; i < inputAmount.value; i++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 6000,
        });
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          clickToClose: true,
          timeout: 6000,
        });
      });

    delay += Number(inputStep.value);
    position++;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   setTimeout(() => {
//     if (shouldResolve) {
//       resolve({ position, delay });
//     } else {
//       reject({ position, delay });
//     }
//   }, delay);
// }
