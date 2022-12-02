const account = document.querySelector('.account__link');
const signin = document.querySelector('.modal-signin__backdrop');
const signinClose = document.querySelector('.modal-signin__close-btn');

account.addEventListener('click', opensigninModal);
signinClose.addEventListener('click', closesigninModal);
function opensigninModal() {
  signin.classList.remove('is-hidden');
  return;
}

function closesigninModal() {
  signin.classList.add('is-hidden');
  return;
}
