let btnToUp = document.querySelector('.button__up');
let scrolled;
let timer1;
window.onscroll = function () {
  scrolled = window.pageYOffset;
  btnToUp.classList.add('is-hidden');
  if (scrolled > 900) {
    btnToUp.classList.remove('is-hidden');
  }
};
