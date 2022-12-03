let btnToUp = document.querySelector('.button__up');
let scroll;
window.onscroll = function () {
  scroll = window.pageYOffset;
  btnToUp.classList.add('is-hidden');
  if (scroll > 900) {
    btnToUp.classList.remove('is-hidden');
  }
};
