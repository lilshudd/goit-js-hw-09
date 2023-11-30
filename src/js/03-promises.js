import notiflix from 'notiflix';

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

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const delay = Number(form.elements['delay'].value);
  const step = Number(form.elements['step'].value);
  const amount = Number(form.elements['amount'].value);

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const currentDelay = delay + (i - 1) * step;

    const promise = createPromise(i, currentDelay);

    promise
      .then(({ position, delay }) => {
        notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    promises.push(promise);
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
