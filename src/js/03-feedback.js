import throttle from 'lodash.throttle';
import ls from './local-storage';

const feedbackForm = document.querySelector('.feedback-form');

const initForm = function () {
  let userData = ls.load('feedback-form-state');

  if (userData) {
    const { email, message } = feedbackForm.elements;
    email.value = userData.email ? userData.email : '';
    message.value = userData.message ? userData.message : '';
  }
};
initForm();

const onFormInput = function (event) {
  let userData = ls.load('feedback-form-state');
  if (!userData) {
    userData = {};
  }
  const { name, value } = event.target;
  userData[name] = value;
  ls.save('feedback-form-state', userData);
};

const onFormSubmit = function (event) {
  event.preventDefault();
  const { email, message } = event.target.elements;
  if (email.value === '' || message.value === '') {
    return alert('Заповніть будь-ласка всі поля форми!');
  }
  const userData = {};
  userData.email = email.value;
  userData.message = message.value;
  console.log(userData);

  event.target.reset();
  ls.remove('feedback-form-state');
};

feedbackForm.addEventListener('input', throttle(onFormInput, 500));
feedbackForm.addEventListener('submit', onFormSubmit);
